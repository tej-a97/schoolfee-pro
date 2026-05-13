import Common "../types/common";
import FeeTypes "../types/fees";
import Map "mo:core/Map";
import Time "mo:core/Time";
import List "mo:core/List";

module {
  public type State = {
    feeStructures : Map.Map<Common.FeeStructureId, FeeTypes.FeeStructure>;
    bills : Map.Map<Common.BillId, FeeTypes.Bill>;
    payments : Map.Map<Common.PaymentId, FeeTypes.Payment>;
    receipts : Map.Map<Common.ReceiptId, FeeTypes.Receipt>;
    state : {
      var nextFeeStructureId : Nat;
      var nextBillId : Nat;
      var nextPaymentId : Nat;
      var nextReceiptId : Nat;
    };
  };

      func zeroPad4(n : Nat) : Text {
    let s = n.toText();
    if (s.size() >= 4) s
    else if (s.size() == 3) "0" # s
    else if (s.size() == 2) "00" # s
    else "000" # s;
  };

  public func getReceipt(s : State, id : Common.ReceiptId) : ?FeeTypes.Receipt {
    s.receipts.get(id);
  };

  public func duplicateReceipt(
    s : State,
    id : Common.ReceiptId,
  ) : Common.Result<FeeTypes.Receipt, Text> {
    switch (s.receipts.get(id)) {
      case null { #err("Receipt not found") };
      case (?orig) {
        let newId = s.state.nextReceiptId;
        s.state.nextReceiptId += 1;
        let now = Time.now();
        let receiptNum = "RCPT-" # (now / 1_000_000_000 / 60 / 60 / 24 / 365 + 1970).toText() # "-" # zeroPad4(newId + 1);
        let dup : FeeTypes.Receipt = {
          orig with
          id = newId;
          receiptNumber = receiptNum;
          issuedAt = now;
          isDuplicate = true;
        };
        s.receipts.add(newId, dup);
        #ok(dup);
      };
    };
  };

public func deleteFeeStructure(
    s : State,
    id : Common.FeeStructureId,
  ) : Common.Result<Bool, Text> {
    switch (s.feeStructures.get(id)) {
      case null { #err("Fee structure not found") };
      case (?existing) {
        s.feeStructures.add(id, { existing with isActive = false });
        #ok(true);
      };
    };
  };

public func createFeeStructure(
    s : State,
    input : FeeTypes.FeeStructureInput,
  ) : Common.Result<FeeTypes.FeeStructure, Text> {
    if (input.amount == 0) {
      return #err("Amount must be greater than 0");
    };
    let id = s.state.nextFeeStructureId;
    s.state.nextFeeStructureId += 1;
    let fs : FeeTypes.FeeStructure = {
      id;
      classId = input.classId;
      academicYear = input.academicYear;
      category = input.category;
      customCategoryName = input.customCategoryName;
      amount = input.amount;
      paymentPlan = input.paymentPlan;
      dueDayOfMonth = input.dueDayOfMonth;
      fineRatePercent = input.fineRatePercent;
      discountPercent = input.discountPercent;
      isActive = true;
      createdAt = Time.now();
    };
    s.feeStructures.add(id, fs);
    #ok(fs);
  };

  public func updateFeeStructure(
    s : State,
    id : Common.FeeStructureId,
    input : FeeTypes.FeeStructureInput,
  ) : Common.Result<FeeTypes.FeeStructure, Text> {
    switch (s.feeStructures.get(id)) {
      case null { #err("Fee structure not found") };
      case (?existing) {
        if (input.amount == 0) {
          return #err("Amount must be greater than 0");
        };
        let updated = {
          existing with
          classId = input.classId;
          academicYear = input.academicYear;
          category = input.category;
          customCategoryName = input.customCategoryName;
          amount = input.amount;
          paymentPlan = input.paymentPlan;
          dueDayOfMonth = input.dueDayOfMonth;
          fineRatePercent = input.fineRatePercent;
          discountPercent = input.discountPercent;
        };
        s.feeStructures.add(id, updated);
        #ok(updated);
      };
    };
  };

  public func listFeeStructures(
    s : State,
    classId : ?Common.ClassId,
    academicYear : ?Text,
  ) : [FeeTypes.FeeStructure] {
    s.feeStructures.values().filter(func(fs) {
      let matchClass = switch (classId) {
        case null { true };
        case (?cid) { fs.classId == cid };
      };
      let matchYear = switch (academicYear) {
        case null { true };
        case (?yr) { fs.academicYear == yr };
      };
      matchClass and matchYear and fs.isActive;
    }).toArray();
  };

  public func generateBills(
    s : State,
    classId : Common.ClassId,
    academicYear : Text,
    month : Text,
    studentIds : [Common.StudentId],
  ) : Common.Result<[FeeTypes.Bill], Text> {
    // Get active fee structures for this class+year
    let structures = s.feeStructures.values().filter(func(fs) {
      fs.classId == classId and fs.academicYear == academicYear and fs.isActive;
    }).toArray();
    if (structures.size() == 0) {
      return #err("No active fee structures found for this class and academic year");
    };
    let created = List.empty<FeeTypes.Bill>();
    for (studentId in studentIds.values()) {
      // Skip if bill already exists for student+month
      let existing = s.bills.values().find(func(b) {
        b.studentId == studentId and b.month == month and b.classId == classId;
      });
      switch (existing) {
        case (?_) {}; // skip
        case null {
          // Build fee components
          let components = structures.map(func(fs) {
            let disc = fs.amount * fs.discountPercent / 100;
            { category = fs.category; amount = fs.amount; discount = disc; fine = 0 };
          });
          let totalAmount = components.foldLeft(0, func(acc, c) { acc + c.amount });
          let discountAmount = components.foldLeft(0, func(acc, c) { acc + c.discount });
          let netAmount : Nat = if (discountAmount >= totalAmount) 0 else totalAmount - discountAmount;
          let billId = s.state.nextBillId;
          s.state.nextBillId += 1;
          let billNum = "BILL-" # month # "-" # zeroPad4(billId + 1);
          let bill : FeeTypes.Bill = {
            id = billId;
            billNumber = billNum;
            studentId;
            classId;
            academicYear;
            month;
            feeComponents = components;
            totalAmount;
            discountAmount;
            fineAmount = 0;
            netAmount;
            dueDate = Time.now() + 30 * 24 * 60 * 60 * 1_000_000_000;
            status = #Pending;
            createdAt = Time.now();
          };
          s.bills.add(billId, bill);
          created.add(bill);
        };
      };
    };
    #ok(created.toArray());
  };

  public func getBill(s : State, id : Common.BillId) : ?FeeTypes.Bill {
    s.bills.get(id);
  };

  public func listBills(
    s : State,
    filter : FeeTypes.BillFilter,
  ) : [FeeTypes.Bill] {
    s.bills.values().filter(func(b) {
      let matchClass = switch (filter.classId) {
        case null { true };
        case (?cid) { b.classId == cid };
      };
      let matchStudent = switch (filter.studentId) {
        case null { true };
        case (?sid) { b.studentId == sid };
      };
      let matchStatus = switch (filter.status) {
        case null { true };
        case (?st) {
          switch (st) {
            case (#Pending) { b.status == #Pending };
            case (#Partial) { b.status == #Partial };
            case (#Paid) { b.status == #Paid };
            case (#Overdue) { b.status == #Overdue };
            case (#Cancelled) { b.status == #Cancelled };
          };
        };
      };
      let matchMonth = switch (filter.month) {
        case null { true };
        case (?m) { b.month == m };
      };
      matchClass and matchStudent and matchStatus and matchMonth;
    }).toArray();
  };

  public func updateBillStatus(
    s : State,
    id : Common.BillId,
    status : Common.BillStatus,
  ) : Common.Result<FeeTypes.Bill, Text> {
    switch (s.bills.get(id)) {
      case null { #err("Bill not found") };
      case (?existing) {
        let updated = { existing with status };
        s.bills.add(id, updated);
        #ok(updated);
      };
    };
  };

  public func recordPayment(
    s : State,
    input : FeeTypes.PaymentInput,
  ) : Common.Result<FeeTypes.Receipt, Text> {
    // Validate bill exists and is payable
    switch (s.bills.get(input.billId)) {
      case null { return #err("Bill not found") };
      case (?bill) {
        let isPayable = bill.status == #Pending or bill.status == #Partial or bill.status == #Overdue;
        if (not isPayable) {
          return #err("Bill is not in a payable state");
        };
        // Calculate already paid
        let alreadyPaid = s.payments.values().foldLeft(0, func(acc : Nat, p : FeeTypes.Payment) : Nat {
          if (p.billId == input.billId) acc + p.amount else acc;
        });
        let paymentId = s.state.nextPaymentId;
        s.state.nextPaymentId += 1;
        let now = Time.now();
        let payment : FeeTypes.Payment = {
          id = paymentId;
          billId = input.billId;
          studentId = input.studentId;
          amount = input.amount;
          paymentDate = now;
          method = input.method;
          referenceNumber = input.referenceNumber;
          notes = input.notes;
          receiptId = null;
          createdAt = now;
        };
        // Determine new bill status
        let totalPaid = alreadyPaid + input.amount;
        let newStatus : Common.BillStatus = if (totalPaid >= bill.netAmount) #Paid else #Partial;
        let updatedBill = { bill with status = newStatus };
        s.bills.add(input.billId, updatedBill);
        // Create receipt
        let receiptId = s.state.nextReceiptId;
        s.state.nextReceiptId += 1;
        let receiptNum = "RCPT-" # (now / 1_000_000_000 / 60 / 60 / 24 / 365 + 1970).toText() # "-" # zeroPad4(receiptId + 1);
        let qrData = "{\"receiptNumber\":\"" # receiptNum # "\",\"studentId\":" # input.studentId.toText() # ",\"amount\":" # input.amount.toText() # ",\"date\":" # now.toText() # "}";
        let receipt : FeeTypes.Receipt = {
          id = receiptId;
          receiptNumber = receiptNum;
          paymentId;
          studentId = input.studentId;
          billId = input.billId;
          amount = input.amount;
          paymentDate = now;
          method = input.method;
          qrData;
          issuedAt = now;
          isDuplicate = false;
        };
        s.receipts.add(receiptId, receipt);
        // Update payment with receiptId
        s.payments.add(paymentId, { payment with receiptId = ?receiptId });
        #ok(receipt);
      };
    };
  };

  public func listPayments(
    s : State,
    filter : FeeTypes.PaymentFilter,
  ) : [FeeTypes.Payment] {
    s.payments.values().filter(func(p) {
      let matchStudent = switch (filter.studentId) {
        case null { true };
        case (?sid) { p.studentId == sid };
      };
      let matchFrom = switch (filter.dateFrom) {
        case null { true };
        case (?d) { p.paymentDate >= d };
      };
      let matchTo = switch (filter.dateTo) {
        case null { true };
        case (?d) { p.paymentDate <= d };
      };
      let matchMethod = switch (filter.method) {
        case null { true };
        case (?m) {
          switch (m) {
            case (#Cash) { p.method == #Cash };
            case (#BankTransfer) { p.method == #BankTransfer };
            case (#Online) { p.method == #Online };
            case (#Card) { p.method == #Card };
            case (#UPI) { p.method == #UPI };
          };
        };
      };
      matchStudent and matchFrom and matchTo and matchMethod;
    }).toArray();
  };

  public func listReceipts(
    s : State,
    filter : FeeTypes.ReceiptFilter,
  ) : [FeeTypes.Receipt] {
    s.receipts.values().filter(func(r) {
      let matchStudent = switch (filter.studentId) {
        case null { true };
        case (?sid) { r.studentId == sid };
      };
      let matchFrom = switch (filter.dateFrom) {
        case null { true };
        case (?d) { r.issuedAt >= d };
      };
      let matchTo = switch (filter.dateTo) {
        case null { true };
        case (?d) { r.issuedAt <= d };
      };
      matchStudent and matchFrom and matchTo;
    }).toArray();
  };
};

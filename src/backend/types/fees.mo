import Common "common";

module {
  public type FeeStructure = {
    id : Common.FeeStructureId;
    classId : Common.ClassId;
    academicYear : Text;
    category : Common.FeeCategory;
    customCategoryName : Text;
    amount : Nat;
    paymentPlan : Common.PaymentPlan;
    dueDayOfMonth : Nat;
    fineRatePercent : Nat;
    discountPercent : Nat;
    isActive : Bool;
    createdAt : Common.Timestamp;
  };

  public type FeeStructureInput = {
    classId : Common.ClassId;
    academicYear : Text;
    category : Common.FeeCategory;
    customCategoryName : Text;
    amount : Nat;
    paymentPlan : Common.PaymentPlan;
    dueDayOfMonth : Nat;
    fineRatePercent : Nat;
    discountPercent : Nat;
  };

  public type FeeComponent = {
    category : Common.FeeCategory;
    amount : Nat;
    discount : Nat;
    fine : Nat;
  };

  public type Bill = {
    id : Common.BillId;
    billNumber : Text;
    studentId : Common.StudentId;
    classId : Common.ClassId;
    academicYear : Text;
    month : Text;
    feeComponents : [FeeComponent];
    totalAmount : Nat;
    discountAmount : Nat;
    fineAmount : Nat;
    netAmount : Nat;
    dueDate : Common.Timestamp;
    status : Common.BillStatus;
    createdAt : Common.Timestamp;
  };

  public type BillFilter = {
    classId : ?Common.ClassId;
    studentId : ?Common.StudentId;
    status : ?Common.BillStatus;
    month : ?Text;
  };

  public type Payment = {
    id : Common.PaymentId;
    billId : Common.BillId;
    studentId : Common.StudentId;
    amount : Nat;
    paymentDate : Common.Timestamp;
    method : Common.PaymentMethod;
    referenceNumber : Text;
    notes : Text;
    receiptId : ?Common.ReceiptId;
    createdAt : Common.Timestamp;
  };

  public type PaymentInput = {
    billId : Common.BillId;
    studentId : Common.StudentId;
    amount : Nat;
    method : Common.PaymentMethod;
    referenceNumber : Text;
    notes : Text;
  };

  public type PaymentFilter = {
    studentId : ?Common.StudentId;
    dateFrom : ?Common.Timestamp;
    dateTo : ?Common.Timestamp;
    method : ?Common.PaymentMethod;
  };

  public type Receipt = {
    id : Common.ReceiptId;
    receiptNumber : Text;
    paymentId : Common.PaymentId;
    studentId : Common.StudentId;
    billId : Common.BillId;
    amount : Nat;
    paymentDate : Common.Timestamp;
    method : Common.PaymentMethod;
    qrData : Text;
    issuedAt : Common.Timestamp;
    isDuplicate : Bool;
  };

  public type ReceiptFilter = {
    studentId : ?Common.StudentId;
    dateFrom : ?Common.Timestamp;
    dateTo : ?Common.Timestamp;
  };
};

import Common "../types/common";
import FeeTypes "../types/fees";
import FeesLib "../lib/fees";
import StudentTypes "../types/students";
import UserTypes "../types/users";
import UsersLib "../lib/users";
import Map "mo:core/Map";

mixin (
  feeStructures : Map.Map<Common.FeeStructureId, FeeTypes.FeeStructure>,
  bills : Map.Map<Common.BillId, FeeTypes.Bill>,
  payments : Map.Map<Common.PaymentId, FeeTypes.Payment>,
  receipts : Map.Map<Common.ReceiptId, FeeTypes.Receipt>,
  feesState : {
    var nextFeeStructureId : Nat;
    var nextBillId : Nat;
    var nextPaymentId : Nat;
    var nextReceiptId : Nat;
  },
  students : Map.Map<Common.StudentId, StudentTypes.Student>,
  users : Map.Map<Common.UserId, UserTypes.User>,
  principalIndex : Map.Map<Principal, Common.UserId>,
  usersState : { var nextUserId : Nat },
) {
  let feesLibState : FeesLib.State = {
    feeStructures;
    bills;
    payments;
    receipts;
    state = feesState;
  };
  let feesUsersState : UsersLib.State = { users; principalIndex; state = usersState };

  func feesCallerRole(caller : Principal) : Common.Role {
    switch (UsersLib.getUserByPrincipal(feesUsersState, caller)) {
      case (?u) { u.role };
      case null { #Teacher };
    };
  };

  func feesCanManageFees(caller : Principal) : Bool {
    let role = feesCallerRole(caller);
    role == #SuperAdmin or role == #SchoolAdmin or role == #Accountant;
  };

  public shared ({ caller }) func createFeeStructure(
    input : FeeTypes.FeeStructureInput,
  ) : async Common.Result<FeeTypes.FeeStructure, Text> {
    if (not feesCanManageFees(caller)) {
      return #err("Not authorized to manage fee structures");
    };
    FeesLib.createFeeStructure(feesLibState, input);
  };

  public shared ({ caller }) func updateFeeStructure(
    id : Common.FeeStructureId,
    input : FeeTypes.FeeStructureInput,
  ) : async Common.Result<FeeTypes.FeeStructure, Text> {
    if (not feesCanManageFees(caller)) {
      return #err("Not authorized to manage fee structures");
    };
    FeesLib.updateFeeStructure(feesLibState, id, input);
  };

  public shared ({ caller }) func deleteFeeStructure(
    id : Common.FeeStructureId,
  ) : async Common.Result<Bool, Text> {
    if (not feesCanManageFees(caller)) {
      return #err("Not authorized to manage fee structures");
    };
    FeesLib.deleteFeeStructure(feesLibState, id);
  };

  public query func getFeeStructures(
    classId : ?Common.ClassId,
    academicYear : ?Text,
  ) : async [FeeTypes.FeeStructure] {
    FeesLib.listFeeStructures(feesLibState, classId, academicYear);
  };

  // Generates bills for all active students in the given class.
  public shared ({ caller }) func generateBills(
    classId : Common.ClassId,
    academicYear : Text,
    month : Text,
  ) : async Common.Result<[FeeTypes.Bill], Text> {
    if (not feesCanManageFees(caller)) {
      return #err("Not authorized to generate bills");
    };
    let studentIds = students.values()
      .filter(func(s) {
        s.classId == classId and s.academicYear == academicYear and s.status == #Active;
      })
      .map(func(s) { s.id })
      .toArray();
    FeesLib.generateBills(feesLibState, classId, academicYear, month, studentIds);
  };

  public query func getBill(id : Common.BillId) : async ?FeeTypes.Bill {
    FeesLib.getBill(feesLibState, id);
  };

  public query func getBills(
    filter : FeeTypes.BillFilter,
  ) : async [FeeTypes.Bill] {
    FeesLib.listBills(feesLibState, filter);
  };

  public shared ({ caller }) func recordPayment(
    input : FeeTypes.PaymentInput,
  ) : async Common.Result<FeeTypes.Receipt, Text> {
    if (not feesCanManageFees(caller)) {
      return #err("Not authorized to record payments");
    };
    FeesLib.recordPayment(feesLibState, input);
  };

  public shared ({ caller }) func updateBillStatus(
    billId : Common.BillId,
    status : Common.BillStatus,
  ) : async Common.Result<FeeTypes.Bill, Text> {
    if (not feesCanManageFees(caller)) {
      return #err("Not authorized to update bill status");
    };
    FeesLib.updateBillStatus(feesLibState, billId, status);
  };

  public query func getPayments(
    filter : FeeTypes.PaymentFilter,
  ) : async [FeeTypes.Payment] {
    FeesLib.listPayments(feesLibState, filter);
  };

  public query func getReceipts(
    filter : FeeTypes.ReceiptFilter,
  ) : async [FeeTypes.Receipt] {
    FeesLib.listReceipts(feesLibState, filter);
  };

  public query func getReceipt(id : Common.ReceiptId) : async ?FeeTypes.Receipt {
    FeesLib.getReceipt(feesLibState, id);
  };

  public shared ({ caller }) func duplicateReceipt(
    id : Common.ReceiptId,
  ) : async Common.Result<FeeTypes.Receipt, Text> {
    if (not feesCanManageFees(caller)) {
      return #err("Not authorized to duplicate receipts");
    };
    FeesLib.duplicateReceipt(feesLibState, id);
  };
};

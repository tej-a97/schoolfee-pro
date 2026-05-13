// Cross-cutting types shared across all domains
module {
  public type Timestamp = Int;
  public type UserId = Nat;
  public type StudentId = Nat;
  public type ClassId = Nat;
  public type FeeStructureId = Nat;
  public type BillId = Nat;
  public type PaymentId = Nat;
  public type ReceiptId = Nat;
  public type NotificationId = Nat;
  public type AuditLogId = Nat;

  public type Role = {
    #SuperAdmin;
    #SchoolAdmin;
    #Accountant;
    #Teacher;
  };

  public type UserStatus = { #Active; #Inactive };
  public type StudentStatus = { #Active; #Inactive };

  public type BillStatus = {
    #Pending;
    #Partial;
    #Paid;
    #Overdue;
    #Cancelled;
  };

  public type PaymentMethod = {
    #Cash;
    #BankTransfer;
    #Online;
    #Card;
    #UPI;
  };

  public type FeeCategory = {
    #Tuition;
    #Exam;
    #Transport;
    #Hostel;
    #Library;
    #Miscellaneous;
    #Admission;
    #Custom;
  };

  public type PaymentPlan = {
    #Monthly;
    #Quarterly;
    #Yearly;
  };

  public type NotificationType = {
    #FeeReminder;
    #PaymentConfirmation;
    #OverdueAlert;
    #BillGenerated;
  };

  public type Result<T, E> = { #ok : T; #err : E };
};

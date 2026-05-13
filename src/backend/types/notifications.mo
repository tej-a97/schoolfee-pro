import Common "common";

module {
  public type Notification = {
    id : Common.NotificationId;
    notifType : Common.NotificationType;
    recipientPrincipal : Principal;
    studentId : Common.StudentId;
    message : Text;
    isRead : Bool;
    createdAt : Common.Timestamp;
  };

  public type AuditLog = {
    id : Common.AuditLogId;
    userId : Common.UserId;
    action : Text;
    entityType : Text;
    entityId : Nat;
    oldValue : Text;
    newValue : Text;
    timestamp : Common.Timestamp;
  };

  public type AuditLogFilter = {
    userId : ?Common.UserId;
    entityType : ?Text;
    dateFrom : ?Common.Timestamp;
    dateTo : ?Common.Timestamp;
  };

  public type DashboardStats = {
    totalStudents : Nat;
    totalCollected : Nat;
    pendingFees : Nat;
    todayCollection : Nat;
    dueStudentsCount : Nat;
  };
};

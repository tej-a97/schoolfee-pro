import Common "../types/common";
import NotifTypes "../types/notifications";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public type State = {
    notifications : Map.Map<Common.NotificationId, NotifTypes.Notification>;
    auditLogs : Map.Map<Common.AuditLogId, NotifTypes.AuditLog>;
    state : {
      var nextNotificationId : Nat;
      var nextAuditLogId : Nat;
    };
  };

  public func addNotification(
    s : State,
    notifType : Common.NotificationType,
    recipientPrincipal : Principal,
    studentId : Common.StudentId,
    message : Text,
  ) : Common.Result<NotifTypes.Notification, Text> {
    let id = s.state.nextNotificationId;
    s.state.nextNotificationId += 1;
    let notif : NotifTypes.Notification = {
      id;
      notifType;
      recipientPrincipal;
      studentId;
      message;
      isRead = false;
      createdAt = Time.now();
    };
    s.notifications.add(id, notif);
    #ok(notif);
  };

  public func getNotifications(
    s : State,
    principal : Principal,
  ) : [NotifTypes.Notification] {
    s.notifications.values().filter(func(n) {
      Principal.equal(n.recipientPrincipal, principal) and not n.isRead;
    }).toArray();
  };

  public func markNotificationRead(
    s : State,
    id : Common.NotificationId,
  ) : Common.Result<Bool, Text> {
    switch (s.notifications.get(id)) {
      case null { #err("Notification not found") };
      case (?notif) {
        s.notifications.add(id, { notif with isRead = true });
        #ok(true);
      };
    };
  };

  public func addAuditLog(
    s : State,
    userId : Common.UserId,
    action : Text,
    entityType : Text,
    entityId : Nat,
    oldValue : Text,
    newValue : Text,
  ) : Common.Result<Bool, Text> {
    let id = s.state.nextAuditLogId;
    s.state.nextAuditLogId += 1;
    let log : NotifTypes.AuditLog = {
      id;
      userId;
      action;
      entityType;
      entityId;
      oldValue;
      newValue;
      timestamp = Time.now();
    };
    s.auditLogs.add(id, log);
    #ok(true);
  };

  public func listAuditLogs(
    s : State,
    filter : NotifTypes.AuditLogFilter,
  ) : [NotifTypes.AuditLog] {
    s.auditLogs.values().filter(func(l) {
      let matchUser = switch (filter.userId) {
        case null { true };
        case (?uid) { l.userId == uid };
      };
      let matchEntity = switch (filter.entityType) {
        case null { true };
        case (?et) { l.entityType == et };
      };
      let matchFrom = switch (filter.dateFrom) {
        case null { true };
        case (?d) { l.timestamp >= d };
      };
      let matchTo = switch (filter.dateTo) {
        case null { true };
        case (?d) { l.timestamp <= d };
      };
      matchUser and matchEntity and matchFrom and matchTo;
    }).toArray();
  };

  public func getDashboardStats(
    studentCount : Nat,
    payments : [{ amount : Nat; paymentDate : Common.Timestamp }],
    pendingBills : [{ netAmount : Nat }],
    overdueBills : [{ studentId : Common.StudentId }],
    now : Common.Timestamp,
  ) : NotifTypes.DashboardStats {
    let oneDayNs : Int = 24 * 60 * 60 * 1_000_000_000;
    let startOfToday = now - (now % oneDayNs);
    let totalCollected = payments.foldLeft(0, func(acc, p) { acc + p.amount });
    let pendingFees = pendingBills.foldLeft(0, func(acc, b) { acc + b.netAmount });
    let todayCollection = payments.filter(func(p) { p.paymentDate >= startOfToday })
      .foldLeft(0, func(acc, p) { acc + p.amount });
    let dueSet = Set.empty<Common.StudentId>();
    for (b in overdueBills.values()) {
      dueSet.add(b.studentId);
    };
    {
      totalStudents = studentCount;
      totalCollected;
      pendingFees;
      todayCollection;
      dueStudentsCount = dueSet.size();
    };
  };
};

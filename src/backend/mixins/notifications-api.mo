import Common "../types/common";
import NotifTypes "../types/notifications";
import NotifLib "../lib/notifications";
import UserTypes "../types/users";
import UsersLib "../lib/users";
import Map "mo:core/Map";

mixin (
  notifications : Map.Map<Common.NotificationId, NotifTypes.Notification>,
  auditLogs : Map.Map<Common.AuditLogId, NotifTypes.AuditLog>,
  notifState : {
    var nextNotificationId : Nat;
    var nextAuditLogId : Nat;
  },
  users : Map.Map<Common.UserId, UserTypes.User>,
  principalIndex : Map.Map<Principal, Common.UserId>,
  usersState : { var nextUserId : Nat },
) {
  let notifLibState : NotifLib.State = {
    notifications;
    auditLogs;
    state = notifState;
  };
  let notifUsersState : UsersLib.State = { users; principalIndex; state = usersState };

  // Returns unread notifications for the caller.
  public query ({ caller }) func getNotifications() : async [NotifTypes.Notification] {
    NotifLib.getNotifications(notifLibState, caller);
  };

  public shared ({ caller }) func markNotificationRead(
    id : Common.NotificationId,
  ) : async Common.Result<Bool, Text> {
    NotifLib.markNotificationRead(notifLibState, id);
  };

  // Records an audit log entry attributed to the caller's user id.
  public shared ({ caller }) func addAuditLog(
    action : Text,
    entityType : Text,
    entityId : Nat,
    oldValue : Text,
    newValue : Text,
  ) : async Common.Result<Bool, Text> {
    let userId : Common.UserId = switch (principalIndex.get(caller)) {
      case (?id) { id };
      case null { 0 };
    };
    NotifLib.addAuditLog(notifLibState, userId, action, entityType, entityId, oldValue, newValue);
  };

  public query func getAuditLogs(
    filter : NotifTypes.AuditLogFilter,
  ) : async [NotifTypes.AuditLog] {
    NotifLib.listAuditLogs(notifLibState, filter);
  };

  // Internal helper used by other mixins to emit notifications.
  public shared ({ caller }) func addNotification(
    notifType : Common.NotificationType,
    studentId : Common.StudentId,
    message : Text,
  ) : async Common.Result<NotifTypes.Notification, Text> {
    NotifLib.addNotification(notifLibState, notifType, caller, studentId, message);
  };
};

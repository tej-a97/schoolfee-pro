import Common "../types/common";
import UserTypes "../types/users";
import UsersLib "../lib/users";
import Map "mo:core/Map";

mixin (
  users : Map.Map<Common.UserId, UserTypes.User>,
  principalIndex : Map.Map<Principal, Common.UserId>,
  usersState : { var nextUserId : Nat },
) {
  let usersLibState : UsersLib.State = {
    users;
    principalIndex;
    state = usersState;
  };

  // Auto-assigns SuperAdmin role if no users exist yet; otherwise uses provided role.
  public shared ({ caller }) func registerUser(
    name : Text,
    email : Text,
    role : Common.Role,
  ) : async Common.Result<UserTypes.User, Text> {
    let effectiveRole : Common.Role = if (users.size() == 0) #SuperAdmin else role;
    UsersLib.registerUser(usersLibState, caller, name, email, effectiveRole);
  };

  public query ({ caller }) func getUserByPrincipal() : async ?UserTypes.User {
    UsersLib.getUserByPrincipal(usersLibState, caller);
  };

  public shared ({ caller }) func updateLastLogin() : async () {
    switch (principalIndex.get(caller)) {
      case (?id) { UsersLib.updateLastLogin(usersLibState, id) };
      case null {};
    };
  };

  public query ({ caller }) func listUsers() : async Common.Result<[UserTypes.User], Text> {
    switch (UsersLib.getUserByPrincipal(usersLibState, caller)) {
      case null { #err("Not authorized") };
      case (?user) {
        if (user.role != #SuperAdmin) {
          #err("Only SuperAdmin can list users");
        } else {
          #ok(UsersLib.listUsers(usersLibState));
        };
      };
    };
  };
};

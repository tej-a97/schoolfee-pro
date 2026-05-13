import Common "../types/common";
import UserTypes "../types/users";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type State = {
    users : Map.Map<Common.UserId, UserTypes.User>;
    principalIndex : Map.Map<Principal, Common.UserId>;
    state : { var nextUserId : Nat };
  };

  public func registerUser(
    s : State,
    principal : Principal,
    name : Text,
    email : Text,
    role : Common.Role,
  ) : Common.Result<UserTypes.User, Text> {
    // Check if principal already registered
    switch (s.principalIndex.get(principal)) {
      case (?_) { return #err("User already registered") };
      case null {};
    };
    let id = s.state.nextUserId;
    s.state.nextUserId += 1;
    let now = Time.now();
    let user : UserTypes.User = {
      id;
      principal;
      name;
      email;
      role;
      status = #Active;
      createdAt = now;
      lastLogin = now;
    };
    s.users.add(id, user);
    s.principalIndex.add(principal, id);
    #ok(user);
  };

  public func getUser(s : State, id : Common.UserId) : ?UserTypes.User {
    s.users.get(id);
  };

  public func getUserByPrincipal(s : State, principal : Principal) : ?UserTypes.User {
    switch (s.principalIndex.get(principal)) {
      case (?id) { s.users.get(id) };
      case null { null };
    };
  };

  public func updateLastLogin(s : State, id : Common.UserId) : () {
    switch (s.users.get(id)) {
      case (?user) {
        s.users.add(id, { user with lastLogin = Time.now() });
      };
      case null {};
    };
  };

  public func listUsers(s : State) : [UserTypes.User] {
    s.users.values().toArray();
  };
};

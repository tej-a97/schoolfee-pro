import Common "common";

module {
  public type User = {
    id : Common.UserId;
    principal : Principal;
    name : Text;
    email : Text;
    role : Common.Role;
    status : Common.UserStatus;
    createdAt : Common.Timestamp;
    lastLogin : Common.Timestamp;
  };

  public type UserInput = {
    principal : Principal;
    name : Text;
    email : Text;
    role : Common.Role;
  };
};

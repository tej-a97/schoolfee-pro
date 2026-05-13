import Common "../types/common";
import ClassTypes "../types/classes";
import ClassesLib "../lib/classes";
import StudentTypes "../types/students";
import UserTypes "../types/users";
import UsersLib "../lib/users";
import Map "mo:core/Map";

mixin (
  classes : Map.Map<Common.ClassId, ClassTypes.Class>,
  classesState : { var nextClassId : Nat },
  students : Map.Map<Common.StudentId, StudentTypes.Student>,
  users : Map.Map<Common.UserId, UserTypes.User>,
  principalIndex : Map.Map<Principal, Common.UserId>,
  usersState : { var nextUserId : Nat },
) {
  let classesLibState : ClassesLib.State = { classes; state = classesState };
  let classesUsersState : UsersLib.State = { users; principalIndex; state = usersState };

  func classesCallerRole(caller : Principal) : Common.Role {
    switch (UsersLib.getUserByPrincipal(classesUsersState, caller)) {
      case (?u) { u.role };
      case null { #Teacher };
    };
  };

  public shared ({ caller }) func addClass(
    input : ClassTypes.ClassInput,
  ) : async Common.Result<ClassTypes.Class, Text> {
    if (classesCallerRole(caller) == #Teacher) {
      return #err("Teachers are not authorized to manage classes");
    };
    ClassesLib.addClass(classesLibState, input);
  };

  public shared ({ caller }) func updateClass(
    id : Common.ClassId,
    input : ClassTypes.ClassInput,
  ) : async Common.Result<ClassTypes.Class, Text> {
    if (classesCallerRole(caller) == #Teacher) {
      return #err("Teachers are not authorized to manage classes");
    };
    ClassesLib.updateClass(classesLibState, id, input);
  };

  public shared ({ caller }) func deleteClass(
    id : Common.ClassId,
  ) : async Common.Result<Bool, Text> {
    if (classesCallerRole(caller) == #Teacher) {
      return #err("Teachers are not authorized to manage classes");
    };
    // Count active students in this class
    let count = students.values().filter(func(s) {
      s.classId == id and s.status == #Active;
    }).size();
    ClassesLib.deleteClass(classesLibState, id, count);
  };

  public query func getClasses(academicYear : ?Text) : async [ClassTypes.Class] {
    ClassesLib.listClasses(classesLibState, academicYear);
  };

  public query func getClass(id : Common.ClassId) : async ?ClassTypes.Class {
    ClassesLib.getClass(classesLibState, id);
  };
};

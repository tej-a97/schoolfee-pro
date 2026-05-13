import Common "../types/common";
import StudentTypes "../types/students";
import StudentsLib "../lib/students";
import ClassesLib "../lib/classes";
import ClassTypes "../types/classes";
import UserTypes "../types/users";
import UsersLib "../lib/users";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

mixin (
  students : Map.Map<Common.StudentId, StudentTypes.Student>,
  studentsState : { var nextStudentId : Nat },
  classes : Map.Map<Common.ClassId, ClassTypes.Class>,
  classesState : { var nextClassId : Nat },
  users : Map.Map<Common.UserId, UserTypes.User>,
  principalIndex : Map.Map<Principal, Common.UserId>,
  usersState : { var nextUserId : Nat },
) {
  let studentsLibState : StudentsLib.State = { students; state = studentsState };
  let studentsClassesLibState : ClassesLib.State = { classes; state = classesState };
  let studentsUsersState : UsersLib.State = { users; principalIndex; state = usersState };

  func studentsCallerRole(caller : Principal) : Common.Role {
    switch (UsersLib.getUserByPrincipal(studentsUsersState, caller)) {
      case (?u) { u.role };
      case null { #Teacher }; // default to most restricted
    };
  };

  public shared ({ caller }) func addStudent(
    input : StudentTypes.StudentInput,
  ) : async Common.Result<StudentTypes.Student, Text> {
    if (studentsCallerRole(caller) == #Teacher) {
      return #err("Teachers are not authorized to add students");
    };
    let result = StudentsLib.addStudent(studentsLibState, input);
    switch (result) {
      case (#ok(student)) {
        ClassesLib.incrementStudentCount(studentsClassesLibState, student.classId);
        #ok(student);
      };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func updateStudent(
    id : Common.StudentId,
    input : StudentTypes.StudentInput,
  ) : async Common.Result<StudentTypes.Student, Text> {
    if (studentsCallerRole(caller) == #Teacher) {
      return #err("Teachers are not authorized to update students");
    };
    StudentsLib.updateStudent(studentsLibState, id, input);
  };

  public shared ({ caller }) func deleteStudent(
    id : Common.StudentId,
  ) : async Common.Result<Bool, Text> {
    if (studentsCallerRole(caller) == #Teacher) {
      return #err("Teachers are not authorized to delete students");
    };
    switch (StudentsLib.getStudent(studentsLibState, id)) {
      case null { #err("Student not found") };
      case (?student) {
        let result = StudentsLib.deleteStudent(studentsLibState, id);
        switch (result) {
          case (#ok(_)) {
            ClassesLib.decrementStudentCount(studentsClassesLibState, student.classId);
            #ok(true);
          };
          case (#err(e)) { #err(e) };
        };
      };
    };
  };

  public query func getStudent(id : Common.StudentId) : async ?StudentTypes.Student {
    StudentsLib.getStudent(studentsLibState, id);
  };

  public query func getStudents(
    filter : StudentTypes.StudentFilter,
  ) : async [StudentTypes.Student] {
    StudentsLib.listStudents(studentsLibState, filter);
  };
};

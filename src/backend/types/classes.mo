import Common "common";

module {
  public type Class = {
    id : Common.ClassId;
    name : Text;
    section : Text;
    academicYear : Text;
    classTeacherId : ?Common.UserId;
    capacity : Nat;
    studentCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type ClassInput = {
    name : Text;
    section : Text;
    academicYear : Text;
    classTeacherId : ?Common.UserId;
    capacity : Nat;
  };
};

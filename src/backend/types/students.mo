import Common "common";

module {
  public type Student = {
    id : Common.StudentId;
    admissionNumber : Text;
    rollNumber : Text;
    name : Text;
    dob : Text;
    gender : Text;
    photoUrl : Text;
    classId : Common.ClassId;
    sectionId : Nat;
    parentName : Text;
    parentEmail : Text;
    parentPhone : Text;
    address : Text;
    academicYear : Text;
    status : Common.StudentStatus;
    createdAt : Common.Timestamp;
  };

  public type StudentInput = {
    admissionNumber : Text;
    rollNumber : Text;
    name : Text;
    dob : Text;
    gender : Text;
    photoUrl : Text;
    classId : Common.ClassId;
    sectionId : Nat;
    parentName : Text;
    parentEmail : Text;
    parentPhone : Text;
    address : Text;
    academicYear : Text;
  };

  public type StudentFilter = {
    classId : ?Common.ClassId;
    academicYear : ?Text;
    status : ?Common.StudentStatus;
    searchTerm : ?Text;
  };
};

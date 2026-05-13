import Common "../types/common";
import StudentTypes "../types/students";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  public type State = {
    students : Map.Map<Common.StudentId, StudentTypes.Student>;
    state : { var nextStudentId : Nat };
  };

    func zeroPad(n : Nat) : Text {
    let s = n.toText();
    if (s.size() >= 4) s
    else if (s.size() == 3) "0" # s
    else if (s.size() == 2) "00" # s
    else "000" # s;
  };

public func addStudent(
    s : State,
    input : StudentTypes.StudentInput,
  ) : Common.Result<StudentTypes.Student, Text> {
    // Validate/generate admissionNumber
    let admNum = if (input.admissionNumber == "") {
      let year = (Time.now() / 1_000_000_000 / 60 / 60 / 24 / 365) + 1970;
      "ADM-" # year.toText() # "-" # zeroPad(s.state.nextStudentId + 1);
    } else {
      input.admissionNumber;
    };
    // Check admissionNumber uniqueness
    let duplicate = s.students.values().find(func(st) {
      st.admissionNumber == admNum;
    });
    switch (duplicate) {
      case (?_) { return #err("Admission number already exists") };
      case null {};
    };
    let id = s.state.nextStudentId;
    s.state.nextStudentId += 1;
    let student : StudentTypes.Student = {
      id;
      admissionNumber = admNum;
      rollNumber = input.rollNumber;
      name = input.name;
      dob = input.dob;
      gender = input.gender;
      photoUrl = input.photoUrl;
      classId = input.classId;
      sectionId = input.sectionId;
      parentName = input.parentName;
      parentEmail = input.parentEmail;
      parentPhone = input.parentPhone;
      address = input.address;
      academicYear = input.academicYear;
      status = #Active;
      createdAt = Time.now();
    };
    s.students.add(id, student);
    #ok(student);
  };

  public func updateStudent(
    s : State,
    id : Common.StudentId,
    input : StudentTypes.StudentInput,
  ) : Common.Result<StudentTypes.Student, Text> {
    switch (s.students.get(id)) {
      case null { #err("Student not found") };
      case (?existing) {
        // Check admissionNumber uniqueness (excluding this student)
        if (input.admissionNumber != "" and input.admissionNumber != existing.admissionNumber) {
          let dup = s.students.values().find(func(st) {
            st.admissionNumber == input.admissionNumber and st.id != id;
          });
          switch (dup) {
            case (?_) { return #err("Admission number already exists") };
            case null {};
          };
        };
        let admNum = if (input.admissionNumber == "") existing.admissionNumber else input.admissionNumber;
        let updated = {
          existing with
          admissionNumber = admNum;
          rollNumber = input.rollNumber;
          name = input.name;
          dob = input.dob;
          gender = input.gender;
          photoUrl = input.photoUrl;
          classId = input.classId;
          sectionId = input.sectionId;
          parentName = input.parentName;
          parentEmail = input.parentEmail;
          parentPhone = input.parentPhone;
          address = input.address;
          academicYear = input.academicYear;
        };
        s.students.add(id, updated);
        #ok(updated);
      };
    };
  };

  public func deleteStudent(
    s : State,
    id : Common.StudentId,
  ) : Common.Result<Bool, Text> {
    switch (s.students.get(id)) {
      case null { #err("Student not found") };
      case (?existing) {
        s.students.add(id, { existing with status = #Inactive });
        #ok(true);
      };
    };
  };

  public func getStudent(s : State, id : Common.StudentId) : ?StudentTypes.Student {
    s.students.get(id);
  };

  public func listStudents(
    s : State,
    filter : StudentTypes.StudentFilter,
  ) : [StudentTypes.Student] {
    s.students.values().filter(func(st) {
      let matchClass = switch (filter.classId) {
        case null { true };
        case (?cid) { st.classId == cid };
      };
      let matchYear = switch (filter.academicYear) {
        case null { true };
        case (?yr) { st.academicYear == yr };
      };
      let matchStatus = switch (filter.status) {
        case null { true };
        case (?s) {
          switch (s) {
            case (#Active) { st.status == #Active };
            case (#Inactive) { st.status == #Inactive };
          };
        };
      };
      let matchSearch = switch (filter.searchTerm) {
        case null { true };
        case (?term) {
          let t = term.toLower();
          st.name.toLower().contains(#text t) or
          st.admissionNumber.toLower().contains(#text t) or
          st.rollNumber.toLower().contains(#text t);
        };
      };
      matchClass and matchYear and matchStatus and matchSearch;
    }).toArray();
  };
};

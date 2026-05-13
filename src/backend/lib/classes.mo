import Common "../types/common";
import ClassTypes "../types/classes";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  public type State = {
    classes : Map.Map<Common.ClassId, ClassTypes.Class>;
    state : { var nextClassId : Nat };
  };

    public func deleteClass(
    s : State,
    id : Common.ClassId,
    studentCount : Nat,
  ) : Common.Result<Bool, Text> {
    if (studentCount > 0) {
      return #err("Cannot delete class with existing students");
    };
    switch (s.classes.get(id)) {
      case null { #err("Class not found") };
      case (?_) {
        s.classes.remove(id);
        #ok(true);
      };
    };
  };

public func addClass(
    s : State,
    input : ClassTypes.ClassInput,
  ) : Common.Result<ClassTypes.Class, Text> {
    // Validate uniqueness: name+section+academicYear
    let dup = s.classes.values().find(func(c) {
      c.name == input.name and c.section == input.section and c.academicYear == input.academicYear;
    });
    switch (dup) {
      case (?_) { return #err("Class with same name, section, and academic year already exists") };
      case null {};
    };
    let id = s.state.nextClassId;
    s.state.nextClassId += 1;
    let cls : ClassTypes.Class = {
      id;
      name = input.name;
      section = input.section;
      academicYear = input.academicYear;
      classTeacherId = input.classTeacherId;
      capacity = input.capacity;
      studentCount = 0;
      createdAt = Time.now();
    };
    s.classes.add(id, cls);
    #ok(cls);
  };

  public func updateClass(
    s : State,
    id : Common.ClassId,
    input : ClassTypes.ClassInput,
  ) : Common.Result<ClassTypes.Class, Text> {
    switch (s.classes.get(id)) {
      case null { #err("Class not found") };
      case (?existing) {
        let dup = s.classes.values().find(func(c) {
          c.name == input.name and c.section == input.section and
          c.academicYear == input.academicYear and c.id != id;
        });
        switch (dup) {
          case (?_) { return #err("Class with same name, section, and academic year already exists") };
          case null {};
        };
        let updated = {
          existing with
          name = input.name;
          section = input.section;
          academicYear = input.academicYear;
          classTeacherId = input.classTeacherId;
          capacity = input.capacity;
        };
        s.classes.add(id, updated);
        #ok(updated);
      };
    };
  };

  public func getClass(s : State, id : Common.ClassId) : ?ClassTypes.Class {
    s.classes.get(id);
  };

  public func listClasses(s : State, academicYear : ?Text) : [ClassTypes.Class] {
    switch (academicYear) {
      case null { s.classes.values().toArray() };
      case (?yr) {
        s.classes.values().filter(func(c) { c.academicYear == yr }).toArray();
      };
    };
  };

  public func incrementStudentCount(s : State, id : Common.ClassId) : () {
    switch (s.classes.get(id)) {
      case (?cls) {
        s.classes.add(id, { cls with studentCount = cls.studentCount + 1 });
      };
      case null {};
    };
  };

  public func decrementStudentCount(s : State, id : Common.ClassId) : () {
    switch (s.classes.get(id)) {
      case (?cls) {
        let newCount : Nat = if (cls.studentCount == 0) 0 else cls.studentCount - 1;
        s.classes.add(id, { cls with studentCount = newCount });
      };
      case null {};
    };
  };
};

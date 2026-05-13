import Common "types/common";
import UserTypes "types/users";
import StudentTypes "types/students";
import ClassTypes "types/classes";
import FeeTypes "types/fees";
import NotifTypes "types/notifications";
import UsersApiMixin "mixins/users-api";
import StudentsApiMixin "mixins/students-api";
import ClassesApiMixin "mixins/classes-api";
import FeesApiMixin "mixins/fees-api";
import NotificationsApiMixin "mixins/notifications-api";
import DashboardApiMixin "mixins/dashboard-api";
import Map "mo:core/Map";
import Time "mo:core/Time";

actor {
  // --- Users state ---
  let users = Map.empty<Common.UserId, UserTypes.User>();
  let principalIndex = Map.empty<Principal, Common.UserId>();
  let usersState = { var nextUserId : Nat = 0 };

  // --- Students state ---
  let students = Map.empty<Common.StudentId, StudentTypes.Student>();
  let studentsState = { var nextStudentId : Nat = 0 };

  // --- Classes state ---
  let classes = Map.empty<Common.ClassId, ClassTypes.Class>();
  let classesState = { var nextClassId : Nat = 0 };

  // --- Fees state ---
  let feeStructures = Map.empty<Common.FeeStructureId, FeeTypes.FeeStructure>();
  let bills = Map.empty<Common.BillId, FeeTypes.Bill>();
  let payments = Map.empty<Common.PaymentId, FeeTypes.Payment>();
  let receipts = Map.empty<Common.ReceiptId, FeeTypes.Receipt>();
  let feesState = {
    var nextFeeStructureId : Nat = 0;
    var nextBillId : Nat = 0;
    var nextPaymentId : Nat = 0;
    var nextReceiptId : Nat = 0;
  };

  // --- Notifications & Audit state ---
  let notifications = Map.empty<Common.NotificationId, NotifTypes.Notification>();
  let auditLogs = Map.empty<Common.AuditLogId, NotifTypes.AuditLog>();
  let notifState = {
    var nextNotificationId : Nat = 0;
    var nextAuditLogId : Nat = 0;
  };

  // --- Sample data (seeded once on first install) ---
  let now = Time.now();

  // Classes
  let cls0 : ClassTypes.Class = { id = 0; name = "Grade 1"; section = "A"; academicYear = "2024-25"; classTeacherId = null; capacity = 30; studentCount = 2; createdAt = now };
  let cls1 : ClassTypes.Class = { id = 1; name = "Grade 5"; section = "B"; academicYear = "2024-25"; classTeacherId = null; capacity = 30; studentCount = 2; createdAt = now };
  let cls2 : ClassTypes.Class = { id = 2; name = "Grade 10"; section = "C"; academicYear = "2024-25"; classTeacherId = null; capacity = 35; studentCount = 2; createdAt = now };
  classes.add(0, cls0);
  classes.add(1, cls1);
  classes.add(2, cls2);
  classesState.nextClassId := 3;

  // Students
  let st0 : StudentTypes.Student = { id = 0; admissionNumber = "ADM-2024-001"; rollNumber = "101"; name = "Aarav Sharma"; dob = "2018-04-12"; gender = "Male"; photoUrl = ""; classId = 0; sectionId = 0; parentName = "Rahul Sharma"; parentEmail = "rahul.sharma@example.com"; parentPhone = "9876543210"; address = "12 MG Road, Delhi"; academicYear = "2024-25"; status = #Active; createdAt = now };
  let st1 : StudentTypes.Student = { id = 1; admissionNumber = "ADM-2024-002"; rollNumber = "102"; name = "Priya Patel"; dob = "2018-07-22"; gender = "Female"; photoUrl = ""; classId = 0; sectionId = 0; parentName = "Suresh Patel"; parentEmail = "suresh.patel@example.com"; parentPhone = "9876543211"; address = "45 Park Street, Mumbai"; academicYear = "2024-25"; status = #Active; createdAt = now };
  let st2 : StudentTypes.Student = { id = 2; admissionNumber = "ADM-2024-003"; rollNumber = "201"; name = "Riya Mehta"; dob = "2014-03-05"; gender = "Female"; photoUrl = ""; classId = 1; sectionId = 0; parentName = "Amit Mehta"; parentEmail = "amit.mehta@example.com"; parentPhone = "9876543212"; address = "78 Ring Road, Ahmedabad"; academicYear = "2024-25"; status = #Active; createdAt = now };
  let st3 : StudentTypes.Student = { id = 3; admissionNumber = "ADM-2024-004"; rollNumber = "202"; name = "Arjun Singh"; dob = "2014-11-18"; gender = "Male"; photoUrl = ""; classId = 1; sectionId = 0; parentName = "Harpreet Singh"; parentEmail = "harpreet.singh@example.com"; parentPhone = "9876543213"; address = "33 Sector 17, Chandigarh"; academicYear = "2024-25"; status = #Active; createdAt = now };
  let st4 : StudentTypes.Student = { id = 4; admissionNumber = "ADM-2024-005"; rollNumber = "301"; name = "Neha Verma"; dob = "2009-01-30"; gender = "Female"; photoUrl = ""; classId = 2; sectionId = 0; parentName = "Deepak Verma"; parentEmail = "deepak.verma@example.com"; parentPhone = "9876543214"; address = "91 Civil Lines, Lucknow"; academicYear = "2024-25"; status = #Active; createdAt = now };
  let st5 : StudentTypes.Student = { id = 5; admissionNumber = "ADM-2024-006"; rollNumber = "302"; name = "Karan Joshi"; dob = "2009-06-14"; gender = "Male"; photoUrl = ""; classId = 2; sectionId = 0; parentName = "Vinod Joshi"; parentEmail = "vinod.joshi@example.com"; parentPhone = "9876543215"; address = "56 Ashok Nagar, Bhopal"; academicYear = "2024-25"; status = #Active; createdAt = now };
  students.add(0, st0); students.add(1, st1); students.add(2, st2);
  students.add(3, st3); students.add(4, st4); students.add(5, st5);
  studentsState.nextStudentId := 6;

  // Fee structures: tuition + exam for each class
  let fs0 : FeeTypes.FeeStructure = { id = 0; classId = 0; academicYear = "2024-25"; category = #Tuition; customCategoryName = ""; amount = 3000; paymentPlan = #Monthly; dueDayOfMonth = 10; fineRatePercent = 2; discountPercent = 0; isActive = true; createdAt = now };
  let fs1 : FeeTypes.FeeStructure = { id = 1; classId = 0; academicYear = "2024-25"; category = #Exam; customCategoryName = ""; amount = 500; paymentPlan = #Yearly; dueDayOfMonth = 15; fineRatePercent = 0; discountPercent = 0; isActive = true; createdAt = now };
  let fs2 : FeeTypes.FeeStructure = { id = 2; classId = 1; academicYear = "2024-25"; category = #Tuition; customCategoryName = ""; amount = 4000; paymentPlan = #Monthly; dueDayOfMonth = 10; fineRatePercent = 2; discountPercent = 0; isActive = true; createdAt = now };
  let fs3 : FeeTypes.FeeStructure = { id = 3; classId = 1; academicYear = "2024-25"; category = #Exam; customCategoryName = ""; amount = 600; paymentPlan = #Yearly; dueDayOfMonth = 15; fineRatePercent = 0; discountPercent = 0; isActive = true; createdAt = now };
  let fs4 : FeeTypes.FeeStructure = { id = 4; classId = 2; academicYear = "2024-25"; category = #Tuition; customCategoryName = ""; amount = 5000; paymentPlan = #Monthly; dueDayOfMonth = 10; fineRatePercent = 2; discountPercent = 5; isActive = true; createdAt = now };
  let fs5 : FeeTypes.FeeStructure = { id = 5; classId = 2; academicYear = "2024-25"; category = #Exam; customCategoryName = ""; amount = 800; paymentPlan = #Yearly; dueDayOfMonth = 15; fineRatePercent = 0; discountPercent = 0; isActive = true; createdAt = now };
  feeStructures.add(0, fs0); feeStructures.add(1, fs1); feeStructures.add(2, fs2);
  feeStructures.add(3, fs3); feeStructures.add(4, fs4); feeStructures.add(5, fs5);
  feesState.nextFeeStructureId := 6;

  // Bills: 1 Paid (student 0), 1 Partial (student 2), 1 Pending (student 4)
  let comp0 : FeeTypes.FeeComponent = { category = #Tuition; amount = 3000; discount = 0; fine = 0 };
  let comp1 : FeeTypes.FeeComponent = { category = #Tuition; amount = 4000; discount = 0; fine = 0 };
  let comp2 : FeeTypes.FeeComponent = { category = #Tuition; amount = 5000; discount = 250; fine = 0 };
  let bill0 : FeeTypes.Bill = { id = 0; billNumber = "BILL-2024-04-0001"; studentId = 0; classId = 0; academicYear = "2024-25"; month = "2024-04"; feeComponents = [comp0]; totalAmount = 3000; discountAmount = 0; fineAmount = 0; netAmount = 3000; dueDate = now + 30 * 24 * 60 * 60 * 1_000_000_000; status = #Paid; createdAt = now };
  let bill1 : FeeTypes.Bill = { id = 1; billNumber = "BILL-2024-04-0002"; studentId = 2; classId = 1; academicYear = "2024-25"; month = "2024-04"; feeComponents = [comp1]; totalAmount = 4000; discountAmount = 0; fineAmount = 0; netAmount = 4000; dueDate = now + 30 * 24 * 60 * 60 * 1_000_000_000; status = #Partial; createdAt = now };
  let bill2 : FeeTypes.Bill = { id = 2; billNumber = "BILL-2024-04-0003"; studentId = 4; classId = 2; academicYear = "2024-25"; month = "2024-04"; feeComponents = [comp2]; totalAmount = 5000; discountAmount = 250; fineAmount = 0; netAmount = 4750; dueDate = now + 30 * 24 * 60 * 60 * 1_000_000_000; status = #Pending; createdAt = now };
  bills.add(0, bill0); bills.add(1, bill1); bills.add(2, bill2);
  feesState.nextBillId := 3;

  // Payments: full payment for bill0, partial for bill1
  let pay0 : FeeTypes.Payment = { id = 0; billId = 0; studentId = 0; amount = 3000; paymentDate = now; method = #UPI; referenceNumber = "UPI-REF-001"; notes = "Monthly fee April"; receiptId = ?0; createdAt = now };
  let pay1 : FeeTypes.Payment = { id = 1; billId = 1; studentId = 2; amount = 2000; paymentDate = now; method = #Cash; referenceNumber = ""; notes = "Partial payment April"; receiptId = ?1; createdAt = now };
  payments.add(0, pay0); payments.add(1, pay1);
  feesState.nextPaymentId := 2;

  // Receipts
  let qr0 = "{\"receiptNumber\":\"RCPT-2024-0001\",\"studentId\":0,\"amount\":3000}";
  let qr1 = "{\"receiptNumber\":\"RCPT-2024-0002\",\"studentId\":2,\"amount\":2000}";
  let rcpt0 : FeeTypes.Receipt = { id = 0; receiptNumber = "RCPT-2024-0001"; paymentId = 0; studentId = 0; billId = 0; amount = 3000; paymentDate = now; method = #UPI; qrData = qr0; issuedAt = now; isDuplicate = false };
  let rcpt1 : FeeTypes.Receipt = { id = 1; receiptNumber = "RCPT-2024-0002"; paymentId = 1; studentId = 2; billId = 1; amount = 2000; paymentDate = now; method = #Cash; qrData = qr1; issuedAt = now; isDuplicate = false };
  receipts.add(0, rcpt0); receipts.add(1, rcpt1);
  feesState.nextReceiptId := 2;

  // --- Mixin inclusions ---
  include UsersApiMixin(users, principalIndex, usersState);
  include StudentsApiMixin(students, studentsState, classes, classesState, users, principalIndex, usersState);
  include ClassesApiMixin(classes, classesState, students, users, principalIndex, usersState);
  include FeesApiMixin(feeStructures, bills, payments, receipts, feesState, students, users, principalIndex, usersState);
  include NotificationsApiMixin(notifications, auditLogs, notifState, users, principalIndex, usersState);
  include DashboardApiMixin(students, payments, bills);
};


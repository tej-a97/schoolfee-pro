import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Class {
    id: ClassId;
    classTeacherId?: UserId;
    name: string;
    createdAt: Timestamp;
    section: string;
    academicYear: string;
    capacity: bigint;
    studentCount: bigint;
}
export interface StudentFilter {
    status?: StudentStatus;
    classId?: ClassId;
    searchTerm?: string;
    academicYear?: string;
}
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: Class;
} | {
    __kind__: "err";
    err: string;
};
export interface AuditLog {
    id: AuditLogId;
    action: string;
    oldValue: string;
    userId: UserId;
    newValue: string;
    entityId: bigint;
    timestamp: Timestamp;
    entityType: string;
}
export interface FeeComponent {
    fine: bigint;
    discount: bigint;
    category: FeeCategory;
    amount: bigint;
}
export interface StudentInput {
    dob: string;
    parentEmail: string;
    name: string;
    parentPhone: string;
    photoUrl: string;
    classId: ClassId;
    admissionNumber: string;
    academicYear: string;
    sectionId: bigint;
    rollNumber: string;
    address: string;
    gender: string;
    parentName: string;
}
export type Result_5 = {
    __kind__: "ok";
    ok: Receipt;
} | {
    __kind__: "err";
    err: string;
};
export type BillId = bigint;
export type Result_1 = {
    __kind__: "ok";
    ok: FeeStructure;
} | {
    __kind__: "err";
    err: string;
};
export type ReceiptId = bigint;
export type Result_4 = {
    __kind__: "ok";
    ok: User;
} | {
    __kind__: "err";
    err: string;
};
export interface Receipt {
    id: ReceiptId;
    method: PaymentMethod;
    studentId: StudentId;
    isDuplicate: boolean;
    paymentId: PaymentId;
    paymentDate: Timestamp;
    issuedAt: Timestamp;
    amount: bigint;
    billId: BillId;
    receiptNumber: string;
    qrData: string;
}
export interface FeeStructure {
    id: FeeStructureId;
    createdAt: Timestamp;
    discountPercent: bigint;
    classId: ClassId;
    dueDayOfMonth: bigint;
    isActive: boolean;
    academicYear: string;
    category: FeeCategory;
    fineRatePercent: bigint;
    paymentPlan: PaymentPlan;
    amount: bigint;
    customCategoryName: string;
}
export type AuditLogId = bigint;
export interface ReceiptFilter {
    studentId?: StudentId;
    dateTo?: Timestamp;
    dateFrom?: Timestamp;
}
export interface PaymentInput {
    method: PaymentMethod;
    studentId: StudentId;
    referenceNumber: string;
    notes: string;
    amount: bigint;
    billId: BillId;
}
export type Result_7 = {
    __kind__: "ok";
    ok: Array<User>;
} | {
    __kind__: "err";
    err: string;
};
export type ClassId = bigint;
export interface Student {
    id: StudentId;
    dob: string;
    parentEmail: string;
    status: StudentStatus;
    name: string;
    createdAt: Timestamp;
    parentPhone: string;
    photoUrl: string;
    classId: ClassId;
    admissionNumber: string;
    academicYear: string;
    sectionId: bigint;
    rollNumber: string;
    address: string;
    gender: string;
    parentName: string;
}
export interface ClassInput {
    classTeacherId?: UserId;
    name: string;
    section: string;
    academicYear: string;
    capacity: bigint;
}
export type Result_6 = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
};
export interface User {
    id: UserId;
    status: UserStatus;
    principal: Principal;
    name: string;
    createdAt: Timestamp;
    role: Role;
    email: string;
    lastLogin: Timestamp;
}
export interface AuditLogFilter {
    dateTo?: Timestamp;
    userId?: UserId;
    entityType?: string;
    dateFrom?: Timestamp;
}
export type FeeStructureId = bigint;
export interface Payment {
    id: PaymentId;
    method: PaymentMethod;
    studentId: StudentId;
    referenceNumber: string;
    createdAt: Timestamp;
    notes: string;
    paymentDate: Timestamp;
    receiptId?: ReceiptId;
    amount: bigint;
    billId: BillId;
}
export type Result_9 = {
    __kind__: "ok";
    ok: Notification;
} | {
    __kind__: "err";
    err: string;
};
export type StudentId = bigint;
export interface DashboardStats {
    todayCollection: bigint;
    totalCollected: bigint;
    totalStudents: bigint;
    dueStudentsCount: bigint;
    pendingFees: bigint;
}
export type UserId = bigint;
export type Result = {
    __kind__: "ok";
    ok: Student;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: Bill;
} | {
    __kind__: "err";
    err: string;
};
export type PaymentId = bigint;
export type NotificationId = bigint;
export type Result_8 = {
    __kind__: "ok";
    ok: Array<Bill>;
} | {
    __kind__: "err";
    err: string;
};
export interface PaymentFilter {
    method?: PaymentMethod;
    studentId?: StudentId;
    dateTo?: Timestamp;
    dateFrom?: Timestamp;
}
export interface Notification {
    id: NotificationId;
    studentId: StudentId;
    notifType: NotificationType;
    createdAt: Timestamp;
    isRead: boolean;
    message: string;
    recipientPrincipal: Principal;
}
export interface BillFilter {
    status?: BillStatus;
    month?: string;
    studentId?: StudentId;
    classId?: ClassId;
}
export interface FeeStructureInput {
    discountPercent: bigint;
    classId: ClassId;
    dueDayOfMonth: bigint;
    academicYear: string;
    category: FeeCategory;
    fineRatePercent: bigint;
    paymentPlan: PaymentPlan;
    amount: bigint;
    customCategoryName: string;
}
export interface Bill {
    id: BillId;
    status: BillStatus;
    month: string;
    netAmount: bigint;
    studentId: StudentId;
    fineAmount: bigint;
    discountAmount: bigint;
    createdAt: Timestamp;
    dueDate: Timestamp;
    classId: ClassId;
    academicYear: string;
    totalAmount: bigint;
    billNumber: string;
    feeComponents: Array<FeeComponent>;
}
export enum BillStatus {
    Paid = "Paid",
    Overdue = "Overdue",
    Partial_ = "Partial",
    Cancelled = "Cancelled",
    Pending = "Pending"
}
export enum FeeCategory {
    Library = "Library",
    Admission = "Admission",
    Exam = "Exam",
    Tuition = "Tuition",
    Custom = "Custom",
    Miscellaneous = "Miscellaneous",
    Transport = "Transport",
    Hostel = "Hostel"
}
export enum NotificationType {
    FeeReminder = "FeeReminder",
    BillGenerated = "BillGenerated",
    PaymentConfirmation = "PaymentConfirmation",
    OverdueAlert = "OverdueAlert"
}
export enum PaymentMethod {
    UPI = "UPI",
    Card = "Card",
    Cash = "Cash",
    Online = "Online",
    BankTransfer = "BankTransfer"
}
export enum PaymentPlan {
    Quarterly = "Quarterly",
    Monthly = "Monthly",
    Yearly = "Yearly"
}
export enum Role {
    Teacher = "Teacher",
    SuperAdmin = "SuperAdmin",
    SchoolAdmin = "SchoolAdmin",
    Accountant = "Accountant"
}
export enum UserStatus {
    Inactive = "Inactive",
    Active = "Active"
}
export interface backendInterface {
    addAuditLog(action: string, entityType: string, entityId: bigint, oldValue: string, newValue: string): Promise<Result_6>;
    addClass(input: ClassInput): Promise<Result_2>;
    addNotification(notifType: NotificationType, studentId: StudentId, message: string): Promise<Result_9>;
    addStudent(input: StudentInput): Promise<Result>;
    createFeeStructure(input: FeeStructureInput): Promise<Result_1>;
    deleteClass(id: ClassId): Promise<Result_6>;
    deleteFeeStructure(id: FeeStructureId): Promise<Result_6>;
    deleteStudent(id: StudentId): Promise<Result_6>;
    duplicateReceipt(id: ReceiptId): Promise<Result_5>;
    generateBills(classId: ClassId, academicYear: string, month: string): Promise<Result_8>;
    getAuditLogs(filter: AuditLogFilter): Promise<Array<AuditLog>>;
    getBill(id: BillId): Promise<Bill | null>;
    getBills(filter: BillFilter): Promise<Array<Bill>>;
    getClass(id: ClassId): Promise<Class | null>;
    getClasses(academicYear: string | null): Promise<Array<Class>>;
    getFeeStructures(classId: ClassId | null, academicYear: string | null): Promise<Array<FeeStructure>>;
    getNotifications(): Promise<Array<Notification>>;
    getPayments(filter: PaymentFilter): Promise<Array<Payment>>;
    getReceipt(id: ReceiptId): Promise<Receipt | null>;
    getReceipts(filter: ReceiptFilter): Promise<Array<Receipt>>;
    getStats(): Promise<DashboardStats>;
    getStudent(id: StudentId): Promise<Student | null>;
    getStudents(filter: StudentFilter): Promise<Array<Student>>;
    getUserByPrincipal(): Promise<User | null>;
    listUsers(): Promise<Result_7>;
    markNotificationRead(id: NotificationId): Promise<Result_6>;
    recordPayment(input: PaymentInput): Promise<Result_5>;
    registerUser(name: string, email: string, role: Role): Promise<Result_4>;
    updateBillStatus(billId: BillId, status: BillStatus): Promise<Result_3>;
    updateClass(id: ClassId, input: ClassInput): Promise<Result_2>;
    updateFeeStructure(id: FeeStructureId, input: FeeStructureInput): Promise<Result_1>;
    updateLastLogin(): Promise<void>;
    updateStudent(id: StudentId, input: StudentInput): Promise<Result>;
}

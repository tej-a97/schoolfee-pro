import type { Principal } from "@icp-sdk/core/principal";

export type {
  Role,
  UserStatus,
  BillStatus,
  PaymentMethod,
  FeeCategory,
  PaymentPlan,
} from "@/backend";
export type {
  User,
  Student,
  Class,
  FeeStructure,
  Bill,
  BillFilter,
  Payment,
  Receipt,
  Notification,
  DashboardStats,
  AuditLog,
  StudentFilter,
  PaymentFilter,
  ReceiptFilter,
  FeeComponent,
  ClassId,
  StudentId,
  BillId,
  NotificationId,
  UserId,
  FeeStructureId,
  Timestamp,
} from "@/backend";

export type StudentStatus = "Active" | "Inactive" | "Transferred" | "Graduated";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles?: string[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface StatsCardData {
  label: string;
  value: string | number;
  icon: string;
  trend?: { value: number; direction: "up" | "down" };
  color?: "primary" | "success" | "warning" | "destructive" | "info";
}

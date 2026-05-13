import type { StudentInput } from "@/backend";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddStudent,
  useBills,
  useClasses,
  useDeleteStudent,
  useStudent,
  useStudents,
  useUpdateStudent,
} from "@/hooks/useBackend";
import type { Student, StudentId, TableColumn } from "@/types";
import {
  Calendar,
  Eye,
  GraduationCap,
  Hash,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 20;
const ACADEMIC_YEAR = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

type ModalMode = "add" | "edit" | "view" | "delete" | null;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// --- Student Avatar ---
function StudentAvatar({
  name,
  photoUrl,
  size = "sm",
}: { name: string; photoUrl?: string; size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "h-16 w-16 text-xl" : "h-8 w-8 text-xs";
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className={`${dim} rounded-full object-cover border border-border/50`}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center font-semibold text-primary`}
    >
      {getInitials(name)}
    </div>
  );
}

// --- Student Profile Detail ---
function StudentProfile({ studentId }: { studentId: StudentId }) {
  const { data: student, isLoading } = useStudent(studentId);
  const { data: bills } = useBills({ studentId });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => (
          <Skeleton key={k} className="h-8 w-full" />
        ))}
      </div>
    );
  }
  if (!student)
    return <p className="text-muted-foreground text-sm">Student not found.</p>;

  const recentBills = (bills ?? []).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <StudentAvatar
          name={student.name}
          photoUrl={student.photoUrl || undefined}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold font-display text-foreground">
            {student.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {student.admissionNumber}
          </p>
          <div className="mt-1.5">
            <StatusBadge status={student.status} />
          </div>
        </div>
      </div>

      <Separator />

      {/* Personal Info */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <InfoRow
          icon={<Hash className="h-3.5 w-3.5" />}
          label="Roll No"
          value={student.rollNumber || "—"}
        />
        <InfoRow
          icon={<Calendar className="h-3.5 w-3.5" />}
          label="Date of Birth"
          value={student.dob || "—"}
        />
        <InfoRow
          icon={<User className="h-3.5 w-3.5" />}
          label="Gender"
          value={student.gender || "—"}
        />
        <InfoRow
          icon={<GraduationCap className="h-3.5 w-3.5" />}
          label="Academic Year"
          value={student.academicYear}
        />
      </div>

      <Separator />

      {/* Parent Info */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Parent / Guardian
        </p>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <InfoRow
            icon={<Users className="h-3.5 w-3.5" />}
            label="Name"
            value={student.parentName}
          />
          <InfoRow
            icon={<Phone className="h-3.5 w-3.5" />}
            label="Phone"
            value={student.parentPhone}
          />
          <InfoRow
            icon={<Mail className="h-3.5 w-3.5" />}
            label="Email"
            value={student.parentEmail}
          />
          <InfoRow
            icon={<MapPin className="h-3.5 w-3.5" />}
            label="Address"
            value={student.address || "—"}
          />
        </div>
      </div>

      {recentBills.length > 0 && (
        <>
          <Separator />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Recent Fee Bills
            </p>
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/50">
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                      Bill #
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                      Month
                    </th>
                    <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="px-3 py-2 text-center font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {recentBills.map((bill) => (
                    <tr key={bill.billNumber} className="hover:bg-muted/10">
                      <td className="px-3 py-2 text-foreground font-mono">
                        {bill.billNumber}
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {bill.month}
                      </td>
                      <td className="px-3 py-2 text-right font-medium text-foreground">
                        ₹{Number(bill.netAmount).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <StatusBadge status={bill.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <span className="text-muted-foreground w-24 shrink-0">{label}:</span>
      <span className="text-foreground font-medium break-words min-w-0">
        {value}
      </span>
    </div>
  );
}

// --- Student Form ---
interface StudentFormProps {
  initial?: Partial<StudentInput & { status: string }>;
  onSubmit: (data: StudentInput) => Promise<void>;
  isSubmitting: boolean;
  classes: Array<{ id: bigint; name: string; section: string }>;
}

function StudentForm({
  initial,
  onSubmit,
  isSubmitting,
  classes,
}: StudentFormProps) {
  const [form, setForm] = useState<Partial<StudentInput & { status: string }>>(
    () => ({
      name: "",
      admissionNumber: "",
      rollNumber: "",
      dob: "",
      gender: "Male",
      classId: 0n,
      sectionId: 0n,
      academicYear: ACADEMIC_YEAR,
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      address: "",
      photoUrl: "",
      status: "Active",
      ...initial,
    }),
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: unknown) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name?.trim()) errs.name = "Full name is required";
    if (!form.parentName?.trim()) errs.parentName = "Parent name is required";
    if (!form.parentEmail?.trim())
      errs.parentEmail = "Parent email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.parentEmail))
      errs.parentEmail = "Invalid email address";
    if (!form.parentPhone?.trim())
      errs.parentPhone = "Parent phone is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      name: form.name ?? "",
      admissionNumber: form.admissionNumber ?? "",
      rollNumber: form.rollNumber ?? "",
      dob: form.dob ?? "",
      gender: form.gender ?? "Male",
      classId: form.classId ?? 0n,
      sectionId: form.sectionId ?? 0n,
      academicYear: form.academicYear ?? ACADEMIC_YEAR,
      parentName: form.parentName ?? "",
      parentEmail: form.parentEmail ?? "",
      parentPhone: form.parentPhone ?? "",
      address: form.address ?? "",
      photoUrl: form.photoUrl ?? "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)] pr-1"
    >
      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-1">
          Student Information
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 space-y-1">
            <Label htmlFor="s-name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="s-name"
              data-ocid="student.form.name"
              value={form.name ?? ""}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Arjun Sharma"
            />
            {errors.name && (
              <p
                data-ocid="student.form.name_error"
                className="text-xs text-destructive"
              >
                {errors.name}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-adm">Admission Number</Label>
            <Input
              id="s-adm"
              data-ocid="student.form.admission_number"
              value={form.admissionNumber ?? ""}
              onChange={(e) => set("admissionNumber", e.target.value)}
              placeholder="Auto-generated if empty"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-roll">Roll Number</Label>
            <Input
              id="s-roll"
              data-ocid="student.form.roll_number"
              value={form.rollNumber ?? ""}
              onChange={(e) => set("rollNumber", e.target.value)}
              placeholder="e.g. 42"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-dob">Date of Birth</Label>
            <Input
              id="s-dob"
              type="date"
              data-ocid="student.form.dob"
              value={form.dob ?? ""}
              onChange={(e) => set("dob", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-gender">Gender</Label>
            <Select
              value={form.gender ?? "Male"}
              onValueChange={(v) => set("gender", v)}
            >
              <SelectTrigger id="s-gender" data-ocid="student.form.gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-class">Class</Label>
            <Select
              value={form.classId?.toString() ?? "0"}
              onValueChange={(v) => set("classId", BigInt(v))}
            >
              <SelectTrigger id="s-class" data-ocid="student.form.class">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Select a class</SelectItem>
                {classes.map((c) => (
                  <SelectItem key={c.id.toString()} value={c.id.toString()}>
                    {c.name} — {c.section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-ay">Academic Year</Label>
            <Input
              id="s-ay"
              data-ocid="student.form.academic_year"
              value={form.academicYear ?? ACADEMIC_YEAR}
              onChange={(e) => set("academicYear", e.target.value)}
              placeholder={ACADEMIC_YEAR}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-status">Status</Label>
            <Select
              value={form.status ?? "Active"}
              onValueChange={(v) => set("status", v)}
            >
              <SelectTrigger id="s-status" data-ocid="student.form.status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </fieldset>

      <Separator />

      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-1">
          Parent / Guardian Details
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 space-y-1">
            <Label htmlFor="s-pname">
              Parent Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="s-pname"
              data-ocid="student.form.parent_name"
              value={form.parentName ?? ""}
              onChange={(e) => set("parentName", e.target.value)}
              placeholder="e.g. Rajesh Sharma"
            />
            {errors.parentName && (
              <p
                data-ocid="student.form.parent_name_error"
                className="text-xs text-destructive"
              >
                {errors.parentName}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-pemail">
              Parent Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="s-pemail"
              type="email"
              data-ocid="student.form.parent_email"
              value={form.parentEmail ?? ""}
              onChange={(e) => set("parentEmail", e.target.value)}
              placeholder="parent@email.com"
            />
            {errors.parentEmail && (
              <p
                data-ocid="student.form.parent_email_error"
                className="text-xs text-destructive"
              >
                {errors.parentEmail}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-pphone">
              Parent Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="s-pphone"
              data-ocid="student.form.parent_phone"
              value={form.parentPhone ?? ""}
              onChange={(e) => set("parentPhone", e.target.value)}
              placeholder="+91 98765 43210"
            />
            {errors.parentPhone && (
              <p
                data-ocid="student.form.parent_phone_error"
                className="text-xs text-destructive"
              >
                {errors.parentPhone}
              </p>
            )}
          </div>
          <div className="col-span-2 space-y-1">
            <Label htmlFor="s-addr">Address</Label>
            <Textarea
              id="s-addr"
              data-ocid="student.form.address"
              value={form.address ?? ""}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Full residential address"
              rows={2}
              className="resize-none"
            />
          </div>
        </div>
      </fieldset>

      <SheetFooter className="pt-2">
        <Button
          type="submit"
          data-ocid="student.form.submit_button"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting
            ? "Saving..."
            : initial?.name
              ? "Update Student"
              : "Add Student"}
        </Button>
      </SheetFooter>
    </form>
  );
}

// --- Main Page ---
export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [academicYearFilter, setAcademicYearFilter] =
    useState<string>(ACADEMIC_YEAR);
  const [searchTimer, setSearchTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const [mode, setMode] = useState<ModalMode>(null);
  const [selectedId, setSelectedId] = useState<StudentId | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { data: classes } = useClasses();
  const addMutation = useAddStudent();
  const updateMutation = useUpdateStudent();
  const deleteMutation = useDeleteStudent();

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      if (searchTimer) clearTimeout(searchTimer);
      const t = setTimeout(() => setDebouncedSearch(value), 300);
      setSearchTimer(t);
    },
    [searchTimer],
  );

  const filter = useMemo(
    () => ({
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
      ...(classFilter !== "all" ? { classId: BigInt(classFilter) } : {}),
      ...(statusFilter !== "all"
        ? { status: statusFilter as "Active" | "Inactive" }
        : {}),
      ...(academicYearFilter ? { academicYear: academicYearFilter } : {}),
    }),
    [debouncedSearch, classFilter, statusFilter, academicYearFilter],
  );

  const { data: students, isLoading } = useStudents(filter);

  const paginatedStudents = useMemo(() => {
    const all = students ?? [];
    const start = (page - 1) * PAGE_SIZE;
    return all.slice(start, start + PAGE_SIZE);
  }, [students, page]);

  const openView = (student: Student) => {
    setSelectedId(student.id);
    setSelectedStudent(student);
    setMode("view");
  };

  const openEdit = (student: Student) => {
    setSelectedId(student.id);
    setSelectedStudent(student);
    setMode("edit");
  };

  const openDelete = (student: Student) => {
    setSelectedId(student.id);
    setSelectedStudent(student);
    setMode("delete");
  };

  const closeModal = () => {
    setMode(null);
    setSelectedId(null);
    setSelectedStudent(null);
  };

  const handleAdd = async (input: StudentInput) => {
    await addMutation.mutateAsync(input);
    toast.success("Student added successfully!");
    closeModal();
  };

  const handleUpdate = async (input: StudentInput) => {
    if (!selectedId) return;
    await updateMutation.mutateAsync({ id: selectedId, input });
    toast.success("Student updated successfully!");
    closeModal();
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    await deleteMutation.mutateAsync(selectedId);
    toast.success("Student deleted successfully!");
    closeModal();
  };

  const getClassName = (classId: bigint) => {
    const cls = (classes ?? []).find((c) => c.id === classId);
    return cls ? `${cls.name} — ${cls.section}` : "—";
  };

  const columns: TableColumn<Student & Record<string, unknown>>[] = [
    {
      key: "name",
      label: "Name / Photo",
      render: (_v, row) => (
        <button
          type="button"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity text-left"
          onClick={() => openView(row as unknown as Student)}
          data-ocid="student.name.link"
        >
          <StudentAvatar
            name={row.name as string}
            photoUrl={(row.photoUrl as string) || undefined}
          />
          <span className="font-medium text-foreground text-sm truncate max-w-[120px]">
            {row.name as string}
          </span>
        </button>
      ),
    },
    { key: "admissionNumber", label: "Admission No", sortable: true },
    {
      key: "classId",
      label: "Class / Section",
      render: (_v, row) => (
        <span className="text-sm">{getClassName(row.classId as bigint)}</span>
      ),
    },
    { key: "rollNumber", label: "Roll No", sortable: true },
    { key: "parentName", label: "Parent Name", sortable: true },
    { key: "parentPhone", label: "Parent Phone" },
    {
      key: "status",
      label: "Status",
      render: (_v, row) => <StatusBadge status={row.status as string} />,
    },
    {
      key: "id",
      label: "Actions",
      align: "center",
      render: (_v, row) => (
        <div className="flex items-center justify-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              openView(row as unknown as Student);
            }}
            data-ocid="student.view_button"
            aria-label="View student"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-amber-500/10 hover:text-amber-500"
            onClick={(e) => {
              e.stopPropagation();
              openEdit(row as unknown as Student);
            }}
            data-ocid="student.edit_button"
            aria-label="Edit student"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              openDelete(row as unknown as Student);
            }}
            data-ocid="student.delete_button"
            aria-label="Delete student"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  const totalCount = students?.length ?? 0;
  const isEmptyWithNoFilters =
    !isLoading &&
    (students ?? []).length === 0 &&
    !debouncedSearch &&
    classFilter === "all" &&
    statusFilter === "all";

  return (
    <div className="space-y-6" data-ocid="students.page">
      <PageHeader
        title="Students"
        subtitle={
          totalCount > 0
            ? `${totalCount} student${totalCount !== 1 ? "s" : ""} enrolled`
            : undefined
        }
        breadcrumbs={[{ label: "Students" }]}
        actions={
          <Button
            type="button"
            onClick={() => setMode("add")}
            data-ocid="students.add_button"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        }
      />

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-subtle">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            data-ocid="students.search_input"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search name, admission no., roll no..."
            className="pl-9 bg-background border-border/60 focus:border-primary/50"
          />
        </div>
        <Select
          value={classFilter}
          onValueChange={(v) => {
            setClassFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger
            data-ocid="students.class_filter"
            className="w-[160px] bg-background border-border/60"
          >
            <SelectValue placeholder="All Classes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {(classes ?? []).map((c) => (
              <SelectItem key={c.id.toString()} value={c.id.toString()}>
                {c.name} — {c.section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger
            data-ocid="students.status_filter"
            className="w-[140px] bg-background border-border/60"
          >
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={academicYearFilter}
          onValueChange={(v) => {
            setAcademicYearFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger
            data-ocid="students.year_filter"
            className="w-[150px] bg-background border-border/60"
          >
            <SelectValue placeholder="Academic Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ACADEMIC_YEAR}>{ACADEMIC_YEAR}</SelectItem>
            <SelectItem
              value={`${new Date().getFullYear() - 1}-${new Date().getFullYear()}`}
            >
              {`${new Date().getFullYear() - 1}-${new Date().getFullYear()}`}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table / Empty / Loading */}
      {isLoading ? (
        <div
          className="rounded-xl border border-border/50 bg-card overflow-hidden"
          data-ocid="students.loading_state"
        >
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }, (_, i) => `sk-row-${i}`).map((k) => (
              <div key={k} className="flex gap-3 items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      ) : isEmptyWithNoFilters ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 rounded-xl border border-dashed border-border/50 bg-card"
          data-ocid="students.empty_state"
        >
          <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold font-display text-foreground">
              No students yet
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first student to get started
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setMode("add")}
            data-ocid="students.empty_add_button"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add First Student
          </Button>
        </div>
      ) : (
        <DataTable
          data-ocid="students.table"
          columns={columns as TableColumn<Record<string, unknown>>[]}
          data={paginatedStudents as unknown as Record<string, unknown>[]}
          loading={isLoading}
          totalCount={totalCount}
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          rowKey={(row) => String(row.id)}
          onRowClick={(row) => openView(row as unknown as Student)}
          emptyMessage="No students match your filters"
        />
      )}

      {/* View Student Dialog */}
      <Dialog
        open={mode === "view"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
          data-ocid="student.view.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Student Profile</DialogTitle>
            <DialogDescription>
              Full student details and fee history
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            {selectedId && <StudentProfile studentId={selectedId} />}
          </div>
          <DialogFooter className="mt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                closeModal();
                if (selectedStudent) openEdit(selectedStudent);
              }}
              data-ocid="student.view.edit_button"
            >
              <Pencil className="h-3.5 w-3.5 mr-1.5" /> Edit Student
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={closeModal}
              data-ocid="student.view.close_button"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Student Sheet */}
      <Sheet
        open={mode === "add"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg"
          data-ocid="student.add.sheet"
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="font-display">Add New Student</SheetTitle>
            <SheetDescription>
              Fill in student details to enroll them in the system.
            </SheetDescription>
          </SheetHeader>
          <StudentForm
            classes={classes ?? []}
            onSubmit={handleAdd}
            isSubmitting={addMutation.isPending}
          />
        </SheetContent>
      </Sheet>

      {/* Edit Student Sheet */}
      <Sheet
        open={mode === "edit"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg"
          data-ocid="student.edit.sheet"
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="font-display">Edit Student</SheetTitle>
            <SheetDescription>
              Update student information below.
            </SheetDescription>
          </SheetHeader>
          {selectedStudent && (
            <StudentForm
              initial={{
                name: selectedStudent.name,
                admissionNumber: selectedStudent.admissionNumber,
                rollNumber: selectedStudent.rollNumber,
                dob: selectedStudent.dob,
                gender: selectedStudent.gender,
                classId: selectedStudent.classId,
                sectionId: selectedStudent.sectionId,
                academicYear: selectedStudent.academicYear,
                parentName: selectedStudent.parentName,
                parentEmail: selectedStudent.parentEmail,
                parentPhone: selectedStudent.parentPhone,
                address: selectedStudent.address,
                photoUrl: selectedStudent.photoUrl,
                status: selectedStudent.status,
              }}
              classes={classes ?? []}
              onSubmit={handleUpdate}
              isSubmitting={updateMutation.isPending}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={mode === "delete"}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent data-ocid="student.delete.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-destructive">
              Delete Student
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedStudent?.name}
              </span>
              ? This action cannot be undone and will remove all associated
              records.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">
                {selectedStudent?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedStudent?.admissionNumber}
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              data-ocid="student.delete.cancel_button"
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              data-ocid="student.delete.confirm_button"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

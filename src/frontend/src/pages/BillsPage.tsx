import { BillStatus, FeeCategory } from "@/backend";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  useBills,
  useClasses,
  useGenerateBills,
  useStudents,
  useUpdateBillStatus,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import type {
  Bill,
  BillId,
  BillStatus as BillStatusType,
  Class,
} from "@/types";
import {
  AlertTriangle,
  CheckCircle,
  Eye,
  FileText,
  Loader2,
  Printer,
  RefreshCw,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Utilities ────────────────────────────────────────────────────────────────

function formatCurrency(amount: bigint): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

function formatDate(ts: bigint): string {
  if (!ts || ts === 0n) return "—";
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isOverdue(dueDate: bigint): boolean {
  return dueDate > 0n && Number(dueDate / 1_000_000n) < Date.now();
}

function isDueSoon(dueDate: bigint): boolean {
  const ms = Number(dueDate / 1_000_000n);
  const now = Date.now();
  return dueDate > 0n && ms >= now && ms - now <= 3 * 86_400_000;
}

function getFeeCategoryLabel(cat: FeeCategory | string): string {
  const map: Record<string, string> = {
    [FeeCategory.Tuition]: "Tuition",
    [FeeCategory.Exam]: "Exam",
    [FeeCategory.Admission]: "Admission",
    [FeeCategory.Transport]: "Transport",
    [FeeCategory.Hostel]: "Hostel",
    [FeeCategory.Library]: "Library",
    [FeeCategory.Miscellaneous]: "Miscellaneous",
    [FeeCategory.Custom]: "Custom",
  };
  return map[cat as string] ?? String(cat);
}

// ─── Generate Bills Dialog ────────────────────────────────────────────────────

interface GenerateBillsResult {
  generated: number;
  skipped: number;
}

function GenerateBillsDialog({
  open,
  onClose,
  classes,
}: {
  open: boolean;
  onClose: () => void;
  classes: Class[];
}) {
  const generateBills = useGenerateBills();
  const [classId, setClassId] = useState("");
  const [academicYear, setAcademicYear] = useState(
    `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
  );
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [result, setResult] = useState<GenerateBillsResult | null>(null);

  function handleClose() {
    setClassId("");
    setAcademicYear(
      `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    );
    setMonth(new Date().toISOString().slice(0, 7));
    setResult(null);
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!classId || !academicYear || !month) return;
    try {
      const bills = await generateBills.mutateAsync({
        classId: BigInt(classId),
        academicYear,
        month,
      });
      setResult({
        generated: bills.length,
        skipped: 0,
      });
      toast.success(`${bills.length} bills generated successfully`);
    } catch (err) {
      toast.error(String(err));
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="sm:max-w-md glass border-border/50"
        data-ocid="generate_bills.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">Generate Fee Bills</DialogTitle>
          <DialogDescription>
            Create monthly fee bills for all students in a class.
          </DialogDescription>
        </DialogHeader>

        {result ? (
          <div className="py-6 flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg text-foreground">
                {result.generated} bills generated successfully
              </p>
              {result.skipped > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {result.skipped} students skipped (already have bills)
                </p>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="gen-class">Class *</Label>
              <Select value={classId} onValueChange={setClassId} required>
                <SelectTrigger
                  id="gen-class"
                  className="bg-card border-border/60"
                  data-ocid="generate_bills.select"
                >
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem
                      key={cls.id.toString()}
                      value={cls.id.toString()}
                    >
                      {cls.name} — {cls.section} ({cls.academicYear})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gen-year">Academic Year *</Label>
              <Input
                id="gen-year"
                data-ocid="generate_bills.academic_year.input"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="e.g. 2024-2025"
                className="bg-card border-border/60"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gen-month">Month *</Label>
              <Input
                id="gen-month"
                data-ocid="generate_bills.month.input"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="bg-card border-border/60"
                required
              />
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                data-ocid="generate_bills.cancel_button"
                className="border-border/60"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={generateBills.isPending || !classId}
                data-ocid="generate_bills.submit_button"
              >
                {generateBills.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Bills
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}

        {result && (
          <DialogFooter>
            <Button
              type="button"
              onClick={handleClose}
              data-ocid="generate_bills.close_button"
            >
              Done
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Bill Detail Dialog ───────────────────────────────────────────────────────

function BillDetailDialog({
  bill,
  studentName,
  className,
  onClose,
  onMarkPaid,
}: {
  bill: Bill | null;
  studentName: string;
  className: string;
  onClose: () => void;
  onMarkPaid: (bill: Bill) => void;
}) {
  const printRef = useRef<HTMLDivElement>(null);

  function handlePrint() {
    window.print();
  }

  if (!bill) return null;

  const isPaid = bill.status === BillStatus.Paid;

  return (
    <Dialog open={!!bill} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-2xl glass border-border/50"
        data-ocid="bill_detail.dialog"
      >
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <div>
              <DialogTitle className="font-display text-lg">
                Bill #{bill.billNumber}
              </DialogTitle>
              <DialogDescription>
                {studentName} &mdash; {className}
              </DialogDescription>
            </div>
            <StatusBadge status={bill.status} />
          </div>
        </DialogHeader>

        {/* Print area */}
        <div ref={printRef} className="print-area">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
            <div>
              <span className="text-muted-foreground">Bill Number</span>
              <p className="font-mono font-semibold text-foreground">
                {bill.billNumber}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Month</span>
              <p className="font-semibold text-foreground">{bill.month}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Academic Year</span>
              <p className="font-semibold text-foreground">
                {bill.academicYear}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Due Date</span>
              <p className="font-semibold text-foreground">
                {formatDate(bill.dueDate)}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Issue Date</span>
              <p className="font-semibold text-foreground">
                {formatDate(bill.createdAt)}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Fee Breakdown */}
          <h4 className="font-semibold text-sm text-foreground mb-3">
            Fee Breakdown
          </h4>
          <div className="rounded-lg border border-border/40 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30 border-b border-border/40">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Base Amount
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Fine
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Net
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {bill.feeComponents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-4 text-center text-muted-foreground text-xs"
                    >
                      No fee components
                    </td>
                  </tr>
                ) : (
                  bill.feeComponents.map((comp, i) => (
                    <tr
                      key={`${String(comp.category)}-${i}`}
                      className="hover:bg-muted/10"
                    >
                      <td className="px-3 py-2 text-foreground">
                        {getFeeCategoryLabel(comp.category)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono">
                        {formatCurrency(comp.amount)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-emerald-400">
                        {comp.discount > 0n
                          ? `-${formatCurrency(comp.discount)}`
                          : "—"}
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-red-400">
                        {comp.fine > 0n ? `+${formatCurrency(comp.fine)}` : "—"}
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-semibold">
                        {formatCurrency(
                          comp.amount - comp.discount + comp.fine,
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr className="bg-muted/30 border-t border-border/50">
                  <td
                    colSpan={4}
                    className="px-3 py-3 text-right font-bold text-foreground text-sm"
                  >
                    Total Due
                  </td>
                  <td className="px-3 py-3 text-right font-bold font-mono text-primary text-base">
                    {formatCurrency(bill.netAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="bill_detail.close_button"
            className="border-border/60"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
            data-ocid="bill_detail.print_button"
            className="border-border/60"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Bill
          </Button>
          {!isPaid && (
            <Button
              type="button"
              onClick={() => onMarkPaid(bill)}
              data-ocid="bill_detail.mark_paid_button"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Paid
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  variant,
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  variant?: "destructive" | "default";
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent
        className="sm:max-w-sm glass border-border/50"
        data-ocid="confirm.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            data-ocid="confirm.cancel_button"
            className="border-border/60"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={variant ?? "default"}
            onClick={onConfirm}
            disabled={loading}
            data-ocid="confirm.confirm_button"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Printable Bill ───────────────────────────────────────────────────────────

function PrintableBill({
  bill,
  studentName,
  className,
}: {
  bill: Bill | null;
  studentName: string;
  className: string;
}) {
  if (!bill) return null;
  return (
    <div className="print-only hidden">
      <div className="p-8 max-w-2xl mx-auto font-body text-[#111]">
        {/* School Header */}
        <div className="text-center border-b-2 border-[#333] pb-4 mb-6">
          <h1 className="text-2xl font-bold">SchoolPay ERP</h1>
          <p className="text-sm">Fee Management System</p>
          <p className="text-xs mt-1">123 School Road, Education City</p>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-bold">FEE BILL</h2>
            <p className="text-sm">Bill #: {bill.billNumber}</p>
            <p className="text-sm">Month: {bill.month}</p>
            <p className="text-sm">Academic Year: {bill.academicYear}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">Student: {studentName}</p>
            <p className="text-sm">Class: {className}</p>
            <p className="text-sm">Due Date: {formatDate(bill.dueDate)}</p>
            <p className="text-sm">Issue Date: {formatDate(bill.createdAt)}</p>
          </div>
        </div>

        {/* Fee Table */}
        <table className="w-full border border-[#333] text-sm mb-6">
          <thead>
            <tr className="bg-[#f0f0f0]">
              <th className="border border-[#333] px-3 py-2 text-left">
                Category
              </th>
              <th className="border border-[#333] px-3 py-2 text-right">
                Amount
              </th>
              <th className="border border-[#333] px-3 py-2 text-right">
                Discount
              </th>
              <th className="border border-[#333] px-3 py-2 text-right">
                Fine
              </th>
              <th className="border border-[#333] px-3 py-2 text-right">Net</th>
            </tr>
          </thead>
          <tbody>
            {bill.feeComponents.map((comp, i) => (
              <tr key={`print-${String(comp.category)}-${i}`}>
                <td className="border border-[#ccc] px-3 py-2">
                  {getFeeCategoryLabel(comp.category)}
                </td>
                <td className="border border-[#ccc] px-3 py-2 text-right">
                  {formatCurrency(comp.amount)}
                </td>
                <td className="border border-[#ccc] px-3 py-2 text-right">
                  {comp.discount > 0n
                    ? `-${formatCurrency(comp.discount)}`
                    : "—"}
                </td>
                <td className="border border-[#ccc] px-3 py-2 text-right">
                  {comp.fine > 0n ? `+${formatCurrency(comp.fine)}` : "—"}
                </td>
                <td className="border border-[#ccc] px-3 py-2 text-right font-semibold">
                  {formatCurrency(comp.amount - comp.discount + comp.fine)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#f0f0f0] font-bold">
              <td
                colSpan={4}
                className="border border-[#333] px-3 py-2 text-right"
              >
                Total Due
              </td>
              <td className="border border-[#333] px-3 py-2 text-right">
                {formatCurrency(bill.netAmount)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* QR Placeholder */}
        <div className="flex justify-between items-end">
          <div className="text-sm">
            <p className="font-semibold mb-1">Payment Instructions</p>
            <p>Pay at school office or via UPI/Bank Transfer.</p>
            <p>Reference: {bill.billNumber}</p>
          </div>
          <div className="w-20 h-20 border-2 border-[#333] flex items-center justify-center text-xs text-center">
            QR Code
          </div>
        </div>

        <p className="text-xs text-center mt-6 border-t pt-3 text-[#666]">
          This is a computer-generated bill. No signature required.
        </p>
      </div>
    </div>
  );
}

// ─── Main BillsPage ───────────────────────────────────────────────────────────

export default function BillsPage() {
  // Filter state
  const [filterClassId, setFilterClassId] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 15;

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Dialog state
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [detailBill, setDetailBill] = useState<Bill | null>(null);
  const [confirmMarkPaidBill, setConfirmMarkPaidBill] = useState<Bill | null>(
    null,
  );
  const [confirmDeleteIds, setConfirmDeleteIds] = useState<BillId[] | null>(
    null,
  );
  const [bulkStatusTarget, setBulkStatusTarget] =
    useState<BillStatusType | null>(null);

  // Data
  const billFilter = useMemo(
    () => ({
      ...(filterClassId ? { classId: BigInt(filterClassId) } : {}),
      ...(filterMonth ? { month: filterMonth } : {}),
      ...(filterStatus && filterStatus !== "all"
        ? { status: filterStatus as BillStatusType }
        : {}),
    }),
    [filterClassId, filterMonth, filterStatus],
  );

  const { data: bills = [], isLoading: billsLoading } = useBills(billFilter);
  const { data: classes = [], isLoading: classesLoading } = useClasses();
  const { data: students = [] } = useStudents({});
  const updateBillStatus = useUpdateBillStatus();

  // Build lookup maps
  const studentMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const s of students) m.set(s.id.toString(), s.name);
    return m;
  }, [students]);

  const classMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of classes) m.set(c.id.toString(), `${c.name} - ${c.section}`);
    return m;
  }, [classes]);

  // Filter by student search
  const filteredBills = useMemo(() => {
    if (!studentSearch.trim()) return bills;
    const q = studentSearch.toLowerCase();
    return bills.filter((b) => {
      const name = studentMap.get(b.studentId.toString()) ?? "";
      return (
        name.toLowerCase().includes(q) || b.billNumber.toLowerCase().includes(q)
      );
    });
  }, [bills, studentSearch, studentMap]);

  // Paginate
  const paginatedBills = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredBills.slice(start, start + PAGE_SIZE);
  }, [filteredBills, page]);

  // Selection helpers
  const allOnPageSelected =
    paginatedBills.length > 0 &&
    paginatedBills.every((b) => selectedIds.has(b.id.toString()));

  function toggleAll() {
    if (allOnPageSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const b of paginatedBills) next.delete(b.id.toString());
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const b of paginatedBills) next.add(b.id.toString());
        return next;
      });
    }
  }

  function toggleRow(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Row tinting
  function rowClass(bill: Bill): string {
    if (
      bill.status === BillStatus.Overdue ||
      (bill.status === BillStatus.Pending && isOverdue(bill.dueDate))
    ) {
      return "bg-red-500/5 hover:bg-red-500/10";
    }
    if (bill.status === BillStatus.Pending && isDueSoon(bill.dueDate)) {
      return "bg-amber-500/5 hover:bg-amber-500/10";
    }
    return "hover:bg-muted/20";
  }

  // Handlers
  async function handleMarkPaidConfirm() {
    if (!confirmMarkPaidBill) return;
    try {
      await updateBillStatus.mutateAsync({
        billId: confirmMarkPaidBill.id,
        status: BillStatus.Paid,
      });
      toast.success(`Bill #${confirmMarkPaidBill.billNumber} marked as Paid`);
      setConfirmMarkPaidBill(null);
      setDetailBill(null);
    } catch (err) {
      toast.error(String(err));
    }
  }

  async function handleBulkStatusUpdate() {
    if (!bulkStatusTarget || selectedIds.size === 0) return;
    try {
      await Promise.all(
        Array.from(selectedIds).map((id) =>
          updateBillStatus.mutateAsync({
            billId: BigInt(id),
            status: bulkStatusTarget,
          }),
        ),
      );
      toast.success(`${selectedIds.size} bills updated to ${bulkStatusTarget}`);
      setSelectedIds(new Set());
      setBulkStatusTarget(null);
    } catch (err) {
      toast.error(String(err));
    }
  }

  const totalPages = Math.ceil(filteredBills.length / PAGE_SIZE);

  return (
    <div className="space-y-6" data-ocid="bills.page">
      <PageHeader
        title="Fee Bills"
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "Fee Bills" },
        ]}
        actions={
          <Button
            type="button"
            onClick={() => setShowGenerateDialog(true)}
            data-ocid="bills.generate_bills.open_modal_button"
          >
            <Zap className="mr-2 h-4 w-4" />
            Generate Bills
          </Button>
        }
      />

      {/* Filter Bar */}
      <div className="glass rounded-xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              Class
            </Label>
            {classesLoading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <Select
                value={filterClassId || "all"}
                onValueChange={(v) => {
                  setFilterClassId(v === "all" ? "" : v);
                  setPage(1);
                }}
              >
                <SelectTrigger
                  className="bg-card border-border/60"
                  data-ocid="bills.filter.class.select"
                >
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem
                      key={cls.id.toString()}
                      value={cls.id.toString()}
                    >
                      {cls.name} — {cls.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              Month
            </Label>
            <Input
              type="month"
              value={filterMonth}
              onChange={(e) => {
                setFilterMonth(e.target.value);
                setPage(1);
              }}
              className="bg-card border-border/60"
              data-ocid="bills.filter.month.input"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              Status
            </Label>
            <Select
              value={filterStatus || "all"}
              onValueChange={(v) => {
                setFilterStatus(v === "all" ? "" : v);
                setPage(1);
              }}
            >
              <SelectTrigger
                className="bg-card border-border/60"
                data-ocid="bills.filter.status.select"
              >
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value={BillStatus.Pending}>Pending</SelectItem>
                <SelectItem value={BillStatus.Partial_}>Partial</SelectItem>
                <SelectItem value={BillStatus.Paid}>Paid</SelectItem>
                <SelectItem value={BillStatus.Overdue}>Overdue</SelectItem>
                <SelectItem value={BillStatus.Cancelled}>Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              Search Student
            </Label>
            <Input
              placeholder="Name or bill number…"
              value={studentSearch}
              onChange={(e) => {
                setStudentSearch(e.target.value);
                setPage(1);
              }}
              className="bg-card border-border/60"
              data-ocid="bills.search.input"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filteredBills.length}
            </span>{" "}
            {filteredBills.length === 1 ? "bill" : "bills"} found
          </p>
          {(filterClassId || filterMonth || filterStatus || studentSearch) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => {
                setFilterClassId("");
                setFilterMonth("");
                setFilterStatus("");
                setStudentSearch("");
                setPage(1);
              }}
              data-ocid="bills.filter.clear_button"
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/30"
          data-ocid="bills.bulk_actions.panel"
        >
          <span className="text-sm font-semibold text-primary">
            {selectedIds.size} selected
          </span>
          <Separator orientation="vertical" className="h-5" />
          <Select
            onValueChange={(v) => setBulkStatusTarget(v as BillStatusType)}
          >
            <SelectTrigger
              className="w-40 h-8 text-sm bg-card border-border/60"
              data-ocid="bills.bulk_actions.status.select"
            >
              <SelectValue placeholder="Change status…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={BillStatus.Paid}>Mark Paid</SelectItem>
              <SelectItem value={BillStatus.Pending}>Mark Pending</SelectItem>
              <SelectItem value={BillStatus.Cancelled}>
                Mark Cancelled
              </SelectItem>
            </SelectContent>
          </Select>
          {bulkStatusTarget && (
            <Button
              type="button"
              size="sm"
              className="h-8"
              onClick={handleBulkStatusUpdate}
              disabled={updateBillStatus.isPending}
              data-ocid="bills.bulk_actions.apply_button"
            >
              {updateBillStatus.isPending ? (
                <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
              ) : (
                <CheckCircle className="mr-1.5 h-3 w-3" />
              )}
              Apply
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 ml-auto text-muted-foreground hover:text-foreground"
            onClick={() => {
              setSelectedIds(new Set());
              setBulkStatusTarget(null);
            }}
            data-ocid="bills.bulk_actions.clear_button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Bills Table */}
      <div
        className="rounded-xl border border-border/50 overflow-hidden bg-card"
        data-ocid="bills.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="px-4 py-3 w-10">
                  <Checkbox
                    checked={allOnPageSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                    data-ocid="bills.select_all.checkbox"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Bill #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Student
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Month
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Net Due
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {billsLoading ? (
                Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((key) => (
                  <tr key={key}>
                    {Array.from({ length: 10 }, (_, j) => `cell-${j}`).map(
                      (cellKey) => (
                        <td key={cellKey} className="px-4 py-3">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ),
                    )}
                  </tr>
                ))
              ) : paginatedBills.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-16 text-center"
                    data-ocid="bills.table.empty_state"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-foreground">
                        No bills found
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting filters or generate new bills
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedBills.map((bill, idx) => {
                  const sid = bill.id.toString();
                  const studentName =
                    studentMap.get(bill.studentId.toString()) ?? "Unknown";
                  const classLabel =
                    classMap.get(bill.classId.toString()) ??
                    `Class ${bill.classId}`;
                  return (
                    <tr
                      key={sid}
                      data-ocid={`bills.table.item.${idx + 1}`}
                      className={cn("transition-colors", rowClass(bill))}
                    >
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedIds.has(sid)}
                          onCheckedChange={() => toggleRow(sid)}
                          aria-label={`Select bill ${bill.billNumber}`}
                          data-ocid={`bills.table.checkbox.${idx + 1}`}
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">
                        {bill.billNumber}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {studentName}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {classLabel}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {bill.month}
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        {formatCurrency(bill.totalAmount)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">
                        {formatCurrency(bill.netAmount)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(bill.dueDate)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={bill.status} size="sm" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-primary"
                            onClick={() => setDetailBill(bill)}
                            aria-label="View bill details"
                            data-ocid={`bills.table.view_button.${idx + 1}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {bill.status !== BillStatus.Paid &&
                            bill.status !== BillStatus.Cancelled && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-muted-foreground hover:text-emerald-400"
                                onClick={() => setConfirmMarkPaidBill(bill)}
                                aria-label="Mark as paid"
                                data-ocid={`bills.table.mark_paid_button.${idx + 1}`}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => setConfirmDeleteIds([bill.id])}
                            aria-label="Delete bill"
                            data-ocid={`bills.table.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, filteredBills.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {filteredBills.length}
              </span>
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="border-border/60"
                data-ocid="bills.table.pagination_prev"
              >
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                {page} / {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="border-border/60"
                data-ocid="bills.table.pagination_next"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-red-500/20 border border-red-500/30" />
          <span>Overdue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-amber-500/20 border border-amber-500/30" />
          <span>Due within 3 days</span>
        </div>
        <AlertTriangle className="h-3 w-3 ml-2" />
        <span>Color-coded rows indicate urgency</span>
      </div>

      {/* Printable Bill (hidden on screen) */}
      <PrintableBill
        bill={detailBill}
        studentName={
          detailBill
            ? (studentMap.get(detailBill.studentId.toString()) ?? "Unknown")
            : ""
        }
        className={
          detailBill ? (classMap.get(detailBill.classId.toString()) ?? "") : ""
        }
      />

      {/* Dialogs */}
      <GenerateBillsDialog
        open={showGenerateDialog}
        onClose={() => setShowGenerateDialog(false)}
        classes={classes}
      />

      <BillDetailDialog
        bill={detailBill}
        studentName={
          detailBill
            ? (studentMap.get(detailBill.studentId.toString()) ?? "Unknown")
            : ""
        }
        className={
          detailBill ? (classMap.get(detailBill.classId.toString()) ?? "") : ""
        }
        onClose={() => setDetailBill(null)}
        onMarkPaid={(b) => {
          setConfirmMarkPaidBill(b);
        }}
      />

      <ConfirmDialog
        open={!!confirmMarkPaidBill}
        title="Mark Bill as Paid"
        description={`Are you sure you want to mark bill #${confirmMarkPaidBill?.billNumber} as Paid? This action cannot be undone easily.`}
        confirmLabel="Mark Paid"
        onConfirm={handleMarkPaidConfirm}
        onCancel={() => setConfirmMarkPaidBill(null)}
        loading={updateBillStatus.isPending}
      />

      <ConfirmDialog
        open={!!confirmDeleteIds}
        title="Delete Bill"
        description="This bill will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {
          toast.info("Delete functionality coming soon.");
          setConfirmDeleteIds(null);
        }}
        onCancel={() => setConfirmDeleteIds(null)}
      />
    </div>
  );
}

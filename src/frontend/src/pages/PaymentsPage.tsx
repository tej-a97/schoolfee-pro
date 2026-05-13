import type { BillStatus, PaymentMethod } from "@/backend";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useBills,
  useClasses,
  usePayments,
  useReceipts,
  useRecordPayment,
  useStudents,
} from "@/hooks/useBackend";
import type { Bill, Payment, Receipt, TableColumn } from "@/types";
import {
  CheckCircle,
  CreditCard,
  Eye,
  Plus,
  Receipt as ReceiptIcon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

const METHOD_COLORS: Record<string, string> = {
  Cash: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  BankTransfer: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  Online: "bg-violet-500/15 text-violet-500 border-violet-500/30",
  Card: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  UPI: "bg-pink-500/15 text-pink-500 border-pink-500/30",
};

function MethodBadge({ method }: { method: string }) {
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium border ${METHOD_COLORS[method] ?? "bg-muted text-muted-foreground"}`}
    >
      {method}
    </Badge>
  );
}

function formatCurrency(amount: bigint) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type RecordPaymentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillBill?: Bill | null;
  onSuccess?: (receipt: Receipt) => void;
};

function RecordPaymentDialog({
  open,
  onOpenChange,
  prefillBill,
  onSuccess,
}: RecordPaymentDialogProps) {
  const { data: bills = [] } = useBills({ status: undefined });
  const { data: students = [] } = useStudents();
  const recordPayment = useRecordPayment();

  const pendingBills = useMemo(
    () =>
      bills.filter(
        (b) =>
          b.status === "Pending" ||
          b.status === "Partial" ||
          b.status === "Overdue",
      ),
    [bills],
  );

  const [selectedBillId, setSelectedBillId] = useState<string>(
    prefillBill ? String(prefillBill.id) : "",
  );
  const [amount, setAmount] = useState(
    prefillBill ? String(prefillBill.netAmount) : "",
  );
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [method, setMethod] = useState<string>("Cash");
  const [ref, setRef] = useState("");
  const [notes, setNotes] = useState("");
  const [successReceipt, setSuccessReceipt] = useState<Receipt | null>(null);

  const selectedBill = useMemo(
    () =>
      bills.find((b) => String(b.id) === selectedBillId) ?? prefillBill ?? null,
    [bills, selectedBillId, prefillBill],
  );

  const student = useMemo(
    () => students.find((s) => selectedBill && s.id === selectedBill.studentId),
    [students, selectedBill],
  );

  const remainingAmount = useMemo(() => {
    if (!selectedBill) return 0n;
    return selectedBill.netAmount;
  }, [selectedBill]);

  const amountNum = BigInt(amount || "0");
  const amountError =
    amount !== "" && amountNum > remainingAmount
      ? `Amount exceeds remaining balance of ${formatCurrency(remainingAmount)}`
      : amountNum <= 0n && amount !== ""
        ? "Amount must be greater than 0"
        : null;

  const refRequired = method !== "Cash" && !ref.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBill || !student) return;
    if (amountError || refRequired) return;

    try {
      const result = await recordPayment.mutateAsync({
        billId: selectedBill.id,
        studentId: student.id,
        amount: amountNum,
        method: method as PaymentMethod,
        referenceNumber: ref,
        notes,
      });
      setSuccessReceipt(result);
      onSuccess?.(result);
      toast.success(`Payment recorded! Receipt ${result.receiptNumber}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to record payment",
      );
    }
  };

  const handleReset = () => {
    setSuccessReceipt(null);
    setSelectedBillId("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setMethod("Cash");
    setRef("");
    setNotes("");
  };

  if (successReceipt) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-md"
          data-ocid="record-payment.success_state"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-500">
              <CheckCircle className="h-5 w-5" />
              Payment Recorded
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Receipt Number</span>
                <span className="font-semibold text-foreground">
                  {successReceipt.receiptNumber}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-semibold text-emerald-500">
                  {formatCurrency(successReceipt.amount)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">
                  {formatDate(successReceipt.paymentDate)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleReset}
                data-ocid="record-payment.record_another_button"
              >
                Record Another
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                data-ocid="record-payment.close_button"
              >
                <ReceiptIcon className="h-4 w-4 mr-1.5" />
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" data-ocid="record-payment.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Record Payment
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bill Select */}
          <div className="space-y-1.5">
            <Label htmlFor="bill-select">Select Bill *</Label>
            <Select
              value={selectedBillId}
              onValueChange={(v) => {
                setSelectedBillId(v);
                const bill = bills.find((b) => String(b.id) === v);
                if (bill) setAmount(String(bill.netAmount));
              }}
              disabled={!!prefillBill}
            >
              <SelectTrigger
                id="bill-select"
                data-ocid="record-payment.select"
                className="w-full"
              >
                <SelectValue placeholder="Search and select a bill..." />
              </SelectTrigger>
              <SelectContent>
                {pendingBills.map((bill) => {
                  const s = students.find((st) => st.id === bill.studentId);
                  return (
                    <SelectItem key={String(bill.id)} value={String(bill.id)}>
                      <span className="font-medium">
                        {s?.name ?? "Unknown"}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        #{bill.billNumber}
                      </span>
                      <span className="ml-2 text-xs">
                        {formatCurrency(bill.netAmount)}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {selectedBill && (
              <p className="text-xs text-muted-foreground">
                Remaining balance:{" "}
                <span className="font-semibold text-foreground">
                  {formatCurrency(remainingAmount)}
                </span>
              </p>
            )}
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="payment-amount">Payment Amount *</Label>
            <Input
              id="payment-amount"
              type="number"
              min="1"
              max={String(remainingAmount)}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              data-ocid="record-payment.input"
              className={amountError ? "border-destructive" : ""}
            />
            {amountError && (
              <p
                className="text-xs text-destructive"
                data-ocid="record-payment.field_error"
              >
                {amountError}
              </p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <Label htmlFor="payment-date">Payment Date *</Label>
            <Input
              id="payment-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              data-ocid="record-payment.date_input"
            />
          </div>

          {/* Method */}
          <div className="space-y-1.5">
            <Label htmlFor="payment-method">Payment Method *</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger
                id="payment-method"
                data-ocid="record-payment.method_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Cash", "BankTransfer", "Online", "Card", "UPI"].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reference */}
          <div className="space-y-1.5">
            <Label htmlFor="ref-number">
              Reference Number{" "}
              {method !== "Cash" && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id="ref-number"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              placeholder={
                method === "Cash" ? "Optional" : "Transaction / UTR number"
              }
              data-ocid="record-payment.ref_input"
            />
            {refRequired && (
              <p
                className="text-xs text-destructive"
                data-ocid="record-payment.ref_field_error"
              >
                Reference number is required for {method} payments
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
              rows={2}
              data-ocid="record-payment.textarea"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              data-ocid="record-payment.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={
                !selectedBill ||
                !amount ||
                !!amountError ||
                refRequired ||
                recordPayment.isPending
              }
              data-ocid="record-payment.submit_button"
            >
              {recordPayment.isPending ? "Recording..." : "Record Payment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [prefillBill, setPrefillBill] = useState<Bill | null>(null);

  const { data: allPayments = [], isLoading: paymentsLoading } = usePayments();
  const { data: pendingBills = [], isLoading: billsLoading } = useBills();
  const { data: students = [] } = useStudents();
  const { data: classes = [] } = useClasses();
  const { data: receipts = [] } = useReceipts();

  const studentMap = useMemo(
    () => new Map(students.map((s) => [String(s.id), s])),
    [students],
  );

  const classMap = useMemo(
    () => new Map(classes.map((c) => [String(c.id), c])),
    [classes],
  );

  const receiptMap = useMemo(
    () => new Map(receipts.map((r) => [String(r.paymentId), r])),
    [receipts],
  );

  // Filtered payments
  const filteredPayments = useMemo(() => {
    let data = allPayments;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((p) => {
        const s = studentMap.get(String(p.studentId));
        const r = receiptMap.get(String(p.id));
        return (
          s?.name.toLowerCase().includes(q) ||
          r?.receiptNumber.toLowerCase().includes(q) ||
          p.referenceNumber.toLowerCase().includes(q)
        );
      });
    }
    if (methodFilter !== "all") {
      data = data.filter((p) => p.method === methodFilter);
    }
    if (dateFrom) {
      const from = new Date(dateFrom).getTime() * 1_000_000;
      data = data.filter((p) => Number(p.paymentDate) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo).getTime() * 1_000_000;
      data = data.filter((p) => Number(p.paymentDate) <= to);
    }
    return data;
  }, [
    allPayments,
    search,
    methodFilter,
    dateFrom,
    dateTo,
    studentMap,
    receiptMap,
  ]);

  // Filtered pending bills
  const filteredPendingBills = useMemo(() => {
    let data = pendingBills.filter(
      (b) =>
        b.status === "Pending" ||
        b.status === "Partial" ||
        b.status === "Overdue",
    );
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((b) => {
        const s = studentMap.get(String(b.studentId));
        return (
          s?.name.toLowerCase().includes(q) ||
          b.billNumber.toLowerCase().includes(q)
        );
      });
    }
    if (classFilter !== "all") {
      data = data.filter((b) => String(b.classId) === classFilter);
    }
    return data;
  }, [pendingBills, search, classFilter, studentMap]);

  const openRecordForBill = useCallback((bill: Bill) => {
    setPrefillBill(bill);
    setDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback((open: boolean) => {
    setDialogOpen(open);
    if (!open) setPrefillBill(null);
  }, []);

  // Payments columns
  const paymentColumns: TableColumn<Record<string, unknown>>[] = useMemo(
    () => [
      {
        key: "receiptNumber",
        label: "Receipt #",
        sortable: true,
        render: (_v, row) => {
          const p = row as unknown as Payment;
          const r = receiptMap.get(String(p.id));
          return (
            <span className="font-mono text-xs font-semibold text-primary">
              {r?.receiptNumber ?? "—"}
            </span>
          );
        },
      },
      {
        key: "studentName",
        label: "Student",
        sortable: true,
        render: (_v, row) => {
          const p = row as unknown as Payment;
          const s = studentMap.get(String(p.studentId));
          return <span className="font-medium">{s?.name ?? "Unknown"}</span>;
        },
      },
      {
        key: "billId",
        label: "Bill #",
        render: (_v, row) => {
          const p = row as unknown as Payment;
          return (
            <span className="font-mono text-xs text-muted-foreground">
              #{String(p.billId)}
            </span>
          );
        },
      },
      {
        key: "amount",
        label: "Amount",
        sortable: true,
        align: "right",
        render: (_v, row) => {
          const p = row as unknown as Payment;
          return (
            <span className="font-semibold text-emerald-500">
              {formatCurrency(p.amount)}
            </span>
          );
        },
      },
      {
        key: "paymentDate",
        label: "Date",
        sortable: true,
        render: (_v, row) => {
          const p = row as unknown as Payment;
          return <span className="text-sm">{formatDate(p.paymentDate)}</span>;
        },
      },
      {
        key: "method",
        label: "Method",
        render: (_v, row) => {
          const p = row as unknown as Payment;
          return <MethodBadge method={p.method} />;
        },
      },
      {
        key: "referenceNumber",
        label: "Reference",
        render: (_v, row) => {
          const p = row as unknown as Payment;
          return p.referenceNumber ? (
            <span className="font-mono text-xs">{p.referenceNumber}</span>
          ) : (
            <span className="text-muted-foreground text-xs">—</span>
          );
        },
      },
      {
        key: "actions",
        label: "Actions",
        align: "center",
        render: (_v, row) => {
          const p = row as unknown as Payment;
          const r = receiptMap.get(String(p.id));
          return r ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-primary hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/receipts?id=${r.id}`;
              }}
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              Receipt
            </Button>
          ) : null;
        },
      },
    ],
    [studentMap, receiptMap],
  );

  // Pending bills columns
  const billColumns: TableColumn<Record<string, unknown>>[] = useMemo(
    () => [
      {
        key: "billNumber",
        label: "Bill #",
        sortable: true,
        render: (_v, row) => {
          const b = row as unknown as Bill;
          return (
            <span className="font-mono text-xs font-semibold text-primary">
              {b.billNumber}
            </span>
          );
        },
      },
      {
        key: "studentName",
        label: "Student",
        sortable: true,
        render: (_v, row) => {
          const b = row as unknown as Bill;
          const s = studentMap.get(String(b.studentId));
          return <span className="font-medium">{s?.name ?? "Unknown"}</span>;
        },
      },
      {
        key: "classId",
        label: "Class",
        render: (_v, row) => {
          const b = row as unknown as Bill;
          const c = classMap.get(String(b.classId));
          return c ? (
            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md font-medium">
              {c.name} {c.section}
            </span>
          ) : (
            <span className="text-muted-foreground">—</span>
          );
        },
      },
      {
        key: "netAmount",
        label: "Net Amount",
        sortable: true,
        align: "right",
        render: (_v, row) => {
          const b = row as unknown as Bill;
          return (
            <span className="font-semibold">{formatCurrency(b.netAmount)}</span>
          );
        },
      },
      {
        key: "dueDate",
        label: "Due Date",
        sortable: true,
        render: (_v, row) => {
          const b = row as unknown as Bill;
          const isOverdue = b.status === "Overdue";
          return (
            <span className={isOverdue ? "text-red-500 font-semibold" : ""}>
              {formatDate(b.dueDate)}
            </span>
          );
        },
      },
      {
        key: "status",
        label: "Status",
        render: (_v, row) => {
          const b = row as unknown as Bill;
          return <StatusBadge status={b.status as BillStatus} />;
        },
      },
      {
        key: "actions",
        label: "Actions",
        align: "center",
        render: (_v, row) => {
          const b = row as unknown as Bill;
          return (
            <Button
              type="button"
              size="sm"
              className="h-7 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                openRecordForBill(b);
              }}
              data-ocid="pending-bills.record_button"
            >
              <Plus className="h-3 w-3 mr-1" />
              Record
            </Button>
          );
        },
      },
    ],
    [studentMap, classMap, openRecordForBill],
  );

  return (
    <div className="space-y-6" data-ocid="payments.page">
      <PageHeader
        title="Payments"
        subtitle="Track and record fee payments"
        breadcrumbs={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Payments" },
        ]}
        actions={
          <Button
            type="button"
            onClick={() => setDialogOpen(true)}
            data-ocid="payments.open_modal_button"
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Record Payment
          </Button>
        }
      />

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-border/50 bg-card">
        <div className="relative flex-1 min-w-[200px]">
          <Input
            placeholder="Search student / receipt / reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="payments.search_input"
            className="bg-background"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Label className="text-xs text-muted-foreground whitespace-nowrap">
            From
          </Label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-36 text-sm bg-background"
            data-ocid="payments.date_from_input"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Label className="text-xs text-muted-foreground">To</Label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-36 text-sm bg-background"
            data-ocid="payments.date_to_input"
          />
        </div>
        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger
            className="w-36 bg-background"
            data-ocid="payments.method_filter"
          >
            <SelectValue placeholder="All Methods" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            {["Cash", "BankTransfer", "Online", "Card", "UPI"].map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {activeTab === "pending" && (
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger
              className="w-36 bg-background"
              data-ocid="payments.class_filter"
            >
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((c) => (
                <SelectItem key={String(c.id)} value={String(c.id)}>
                  {c.name} {c.section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList
          className="grid w-full max-w-xs grid-cols-2"
          data-ocid="payments.tab"
        >
          <TabsTrigger value="all" data-ocid="payments.all_tab">
            All Payments
          </TabsTrigger>
          <TabsTrigger value="pending" data-ocid="payments.pending_tab">
            Pending Bills
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <DataTable
            columns={paymentColumns}
            data={filteredPayments as unknown as Record<string, unknown>[]}
            loading={paymentsLoading}
            emptyMessage="No payments found. Try adjusting your filters."
            rowKey={(row) => String((row as unknown as Payment).id)}
            data-ocid="payments.table"
          />
        </TabsContent>

        <TabsContent value="pending">
          <DataTable
            columns={billColumns}
            data={filteredPendingBills as unknown as Record<string, unknown>[]}
            loading={billsLoading}
            emptyMessage="No pending bills. All dues are cleared!"
            rowKey={(row) => String((row as unknown as Bill).id)}
            data-ocid="pending-bills.table"
          />
        </TabsContent>
      </Tabs>

      <RecordPaymentDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        prefillBill={prefillBill}
      />
    </div>
  );
}

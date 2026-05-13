import { createActor } from "@/backend";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useClasses, useReceipts, useStudents } from "@/hooks/useBackend";
import type { Receipt, TableColumn } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Copy,
  Download,
  Eye,
  Mail,
  Printer,
  QrCode,
  ReceiptText,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
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

// QR Code renderer using canvas
function QrCodeDisplay({ data }: { data: string }) {
  const size = 100;
  const cells = 21;
  const cellSize = size / cells;

  const hash = useMemo(() => {
    let h = 0;
    for (let i = 0; i < data.length; i++) {
      h = (Math.imul(31, h) + data.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }, [data]);

  const flatCells = useMemo(() => {
    const result: { key: string; x: number; y: number }[] = [];
    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        const isFinderTL = r < 7 && c < 7;
        const isFinderTR = r < 7 && c >= cells - 7;
        const isFinderBL = r >= cells - 7 && c < 7;
        let filled: boolean;
        if (isFinderTL || isFinderTR || isFinderBL) {
          const lr = isFinderTL ? r : isFinderTR ? r : r - (cells - 7);
          const lc = isFinderTL ? c : isFinderTR ? c - (cells - 7) : c;
          filled =
            lr === 0 ||
            lr === 6 ||
            lc === 0 ||
            lc === 6 ||
            (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4);
        } else {
          filled = ((hash >> ((r * cells + c) % 30)) & 1) === 1;
        }
        if (filled) {
          result.push({
            key: `${hash}-${r}-${c}`,
            x: c * cellSize,
            y: r * cellSize,
          });
        }
      }
    }
    return result;
  }, [hash, cellSize]);

  return (
    <div
      className="bg-white p-2 rounded-lg inline-block"
      style={{ width: size + 16, height: size + 16 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="QR Code"
      >
        {flatCells.map((cell) => (
          <rect
            key={cell.key}
            x={cell.x}
            y={cell.y}
            width={cellSize}
            height={cellSize}
            fill="#000"
          />
        ))}
      </svg>
    </div>
  );
}

type ReceiptDetailDialogProps = {
  receipt: Receipt | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDuplicate: (receipt: Receipt) => void;
  onEmail: (receipt: Receipt) => void;
  studentName?: string;
  studentClass?: string;
  studentAdmission?: string;
  parentEmail?: string;
};

function ReceiptDetailDialog({
  receipt,
  open,
  onOpenChange,
  onDuplicate,
  onEmail,
  studentName,
  studentClass,
  studentAdmission,
  parentEmail,
}: ReceiptDetailDialogProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(
      `<html><head><title>Receipt</title><style>body{font-family:sans-serif;padding:24px;color:#000}table{width:100%;border-collapse:collapse}td,th{padding:8px 12px;border:1px solid #ddd;font-size:14px}.watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:80px;opacity:.08;pointer-events:none;font-weight:bold}</style></head><body>${content}</body></html>`,
    );
    w.document.close();
    w.print();
  };

  if (!receipt) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl" data-ocid="receipt-detail.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ReceiptText className="h-5 w-5 text-primary" />
            Receipt Details
          </DialogTitle>
        </DialogHeader>
        <div ref={printRef} className="relative">
          {receipt.isDuplicate && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              style={{ transform: "rotate(-25deg)" }}
            >
              <span className="text-destructive/10 text-7xl font-extrabold tracking-widest select-none">
                DUPLICATE
              </span>
            </div>
          )}
          <div className="space-y-4 relative z-0">
            {/* School header */}
            <div className="text-center py-3 border-b border-border">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <h3 className="font-bold font-display text-foreground text-lg leading-tight">
                    SchoolFee Pro
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Private School Fee Management
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  receipt.isDuplicate
                    ? "border-amber-500/40 text-amber-500"
                    : "border-emerald-500/30 text-emerald-500"
                }
              >
                {receipt.isDuplicate ? "DUPLICATE RECEIPT" : "OFFICIAL RECEIPT"}
              </Badge>
            </div>

            {/* Receipt meta */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Receipt Number</p>
                <p className="font-mono font-semibold text-primary text-sm">
                  {receipt.receiptNumber}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-medium text-sm">
                  {formatDate(receipt.paymentDate)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Student Name</p>
                <p className="font-semibold text-sm">{studentName ?? "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Class</p>
                <p className="font-medium text-sm">{studentClass ?? "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Admission No.</p>
                <p className="font-mono text-sm">{studentAdmission ?? "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Bill Number</p>
                <p className="font-mono text-sm">#{String(receipt.billId)}</p>
              </div>
            </div>

            <Separator />

            {/* Payment details */}
            <div className="rounded-lg bg-muted/30 border border-border/50 p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Payment Amount
                </span>
                <span className="text-lg font-bold text-emerald-500">
                  {formatCurrency(receipt.amount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Payment Method
                </span>
                <MethodBadge method={receipt.method} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Issued At</span>
                <span className="text-sm">{formatDate(receipt.issuedAt)}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex items-center justify-center gap-6 py-2">
              <QrCodeDisplay data={receipt.qrData} />
              <div className="text-xs text-muted-foreground">
                <QrCode className="h-4 w-4 mb-1 text-primary" />
                Scan to verify
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="flex flex-wrap gap-2 pt-1"
          data-ocid="receipt-detail.actions"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            data-ocid="receipt-detail.print_button"
          >
            <Printer className="h-3.5 w-3.5 mr-1.5" />
            Print
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            data-ocid="receipt-detail.download_button"
            onClick={() => toast.info("PDF download would open here")}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            PDF
          </Button>
          {parentEmail && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEmail(receipt)}
              data-ocid="receipt-detail.email_button"
            >
              <Mail className="h-3.5 w-3.5 mr-1.5" />
              Email
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
            onClick={() => onDuplicate(receipt)}
            data-ocid="receipt-detail.duplicate_button"
          >
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            Duplicate
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => onOpenChange(false)}
            data-ocid="receipt-detail.close_button"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function useDuplicateReceipt() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.duplicateReceipt(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["receipts"] }),
  });
}

export default function ReceiptsPage() {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [detailReceipt, setDetailReceipt] = useState<Receipt | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [duplicateTarget, setDuplicateTarget] = useState<Receipt | null>(null);
  const [emailTarget, setEmailTarget] = useState<Receipt | null>(null);

  const { data: receipts = [], isLoading } = useReceipts();
  const { data: students = [] } = useStudents();
  const { data: classes = [] } = useClasses();
  const duplicateReceipt = useDuplicateReceipt();

  const studentMap = useMemo(
    () => new Map(students.map((s) => [String(s.id), s])),
    [students],
  );

  const classMap = useMemo(
    () => new Map(classes.map((c) => [String(c.id), c])),
    [classes],
  );

  const filteredReceipts = useMemo(() => {
    let data = receipts;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((r) => {
        const s = studentMap.get(String(r.studentId));
        return (
          r.receiptNumber.toLowerCase().includes(q) ||
          s?.name.toLowerCase().includes(q)
        );
      });
    }
    if (classFilter !== "all") {
      const studentsInClass = students.filter(
        (s) => String(s.classId) === classFilter,
      );
      const ids = new Set(studentsInClass.map((s) => String(s.id)));
      data = data.filter((r) => ids.has(String(r.studentId)));
    }
    if (dateFrom) {
      const from = new Date(dateFrom).getTime() * 1_000_000;
      data = data.filter((r) => Number(r.paymentDate) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo).getTime() * 1_000_000;
      data = data.filter((r) => Number(r.paymentDate) <= to);
    }
    return data;
  }, [receipts, search, classFilter, dateFrom, dateTo, studentMap, students]);

  const openDetail = useCallback((receipt: Receipt) => {
    setDetailReceipt(receipt);
    setDetailOpen(true);
  }, []);

  const handleConfirmDuplicate = async () => {
    if (!duplicateTarget) return;
    try {
      const dup = await duplicateReceipt.mutateAsync(duplicateTarget.id);
      setDuplicateTarget(null);
      toast.success(`Duplicate receipt created: ${dup.receiptNumber}`);
      setDetailReceipt(dup);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to duplicate");
    }
  };

  const handleEmailReceipt = () => {
    if (!emailTarget) return;
    const s = studentMap.get(String(emailTarget.studentId));
    toast.success(`Receipt emailed to ${s?.parentEmail ?? "parent"}!`);
    setEmailTarget(null);
  };

  const getStudentInfo = (receipt: Receipt | null) => {
    if (!receipt) return {};
    const s = studentMap.get(String(receipt.studentId));
    const c = classMap.get(String(s?.classId ?? ""));
    return {
      studentName: s?.name,
      studentClass: c ? `${c.name} ${c.section}` : undefined,
      studentAdmission: s?.admissionNumber,
      parentEmail: s?.parentEmail,
    };
  };

  const columns: TableColumn<Record<string, unknown>>[] = useMemo(
    () => [
      {
        key: "receiptNumber",
        label: "Receipt #",
        sortable: true,
        render: (_v, row) => {
          const r = row as unknown as Receipt;
          return (
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-semibold text-primary">
                {r.receiptNumber}
              </span>
              {r.isDuplicate && (
                <Badge
                  variant="outline"
                  className="text-xs py-0 px-1.5 border-amber-500/30 text-amber-500"
                >
                  Dup
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        key: "studentName",
        label: "Student",
        sortable: true,
        render: (_v, row) => {
          const r = row as unknown as Receipt;
          const s = studentMap.get(String(r.studentId));
          return <span className="font-medium">{s?.name ?? "Unknown"}</span>;
        },
      },
      {
        key: "billId",
        label: "Bill #",
        render: (_v, row) => {
          const r = row as unknown as Receipt;
          return (
            <span className="font-mono text-xs text-muted-foreground">
              #{String(r.billId)}
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
          const r = row as unknown as Receipt;
          return (
            <span className="font-semibold text-emerald-500">
              {formatCurrency(r.amount)}
            </span>
          );
        },
      },
      {
        key: "paymentDate",
        label: "Date",
        sortable: true,
        render: (_v, row) => {
          const r = row as unknown as Receipt;
          return <span className="text-sm">{formatDate(r.paymentDate)}</span>;
        },
      },
      {
        key: "method",
        label: "Method",
        render: (_v, row) => {
          const r = row as unknown as Receipt;
          return <MethodBadge method={r.method} />;
        },
      },
      {
        key: "actions",
        label: "Actions",
        align: "center",
        render: (_v, row) => {
          const r = row as unknown as Receipt;
          const s = studentMap.get(String(r.studentId));
          return (
            <div className="flex items-center justify-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-primary"
                title="View"
                onClick={(e) => {
                  e.stopPropagation();
                  openDetail(r);
                }}
                data-ocid="receipts.view_button"
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground"
                title="Print"
                onClick={(e) => {
                  e.stopPropagation();
                  openDetail(r);
                }}
                data-ocid="receipts.print_button"
              >
                <Printer className="h-3.5 w-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground"
                title="Download PDF"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info("PDF download");
                }}
                data-ocid="receipts.download_button"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
              {s?.parentEmail && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-muted-foreground"
                  title="Email"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEmailTarget(r);
                  }}
                  data-ocid="receipts.email_button"
                >
                  <Mail className="h-3.5 w-3.5" />
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-amber-500"
                title="Duplicate"
                onClick={(e) => {
                  e.stopPropagation();
                  setDuplicateTarget(r);
                }}
                data-ocid="receipts.duplicate_button"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          );
        },
      },
    ],
    [studentMap, openDetail],
  );

  const detailInfo = getStudentInfo(detailReceipt);

  return (
    <div className="space-y-6" data-ocid="receipts.page">
      <PageHeader
        title="Receipts"
        subtitle="View and manage payment receipts"
        breadcrumbs={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Receipts" },
        ]}
      />

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-border/50 bg-card">
        <div className="relative flex-1 min-w-[200px]">
          <Input
            placeholder="Search receipt number / student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="receipts.search_input"
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
            data-ocid="receipts.date_from_input"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Label className="text-xs text-muted-foreground">To</Label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-36 text-sm bg-background"
            data-ocid="receipts.date_to_input"
          />
        </div>
        <div className="flex-shrink-0">
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            data-ocid="receipts.class_filter"
          >
            <option value="all">All Classes</option>
            {classes.map((c) => (
              <option key={String(c.id)} value={String(c.id)}>
                {c.name} {c.section}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => `skel-${i}`).map((k) => (
              <Skeleton key={k} className="h-16 rounded-xl" />
            ))
          : [
              {
                label: "Total Receipts",
                value: receipts.length,
                color: "text-primary",
              },
              {
                label: "Shown",
                value: filteredReceipts.length,
                color: "text-foreground",
              },
              {
                label: "Duplicates",
                value: filteredReceipts.filter((r) => r.isDuplicate).length,
                color: "text-amber-500",
              },
              {
                label: "Total Collected",
                value: formatCurrency(
                  filteredReceipts.reduce((sum, r) => sum + r.amount, 0n),
                ),
                color: "text-emerald-500",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/50 bg-card p-3 space-y-1"
              >
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className={`text-lg font-bold font-display ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredReceipts as unknown as Record<string, unknown>[]}
        loading={isLoading}
        emptyMessage="No receipts found. Record a payment to generate receipts."
        rowKey={(row) => String((row as unknown as Receipt).id)}
        onRowClick={(row) => openDetail(row as unknown as Receipt)}
        data-ocid="receipts.table"
      />

      {/* Receipt detail dialog */}
      <ReceiptDetailDialog
        receipt={detailReceipt}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onDuplicate={(r) => {
          setDuplicateTarget(r);
          setDetailOpen(false);
        }}
        onEmail={(r) => {
          setEmailTarget(r);
          setDetailOpen(false);
        }}
        {...detailInfo}
      />

      {/* Duplicate confirmation */}
      <AlertDialog
        open={!!duplicateTarget}
        onOpenChange={(open) => !open && setDuplicateTarget(null)}
      >
        <AlertDialogContent data-ocid="receipts.duplicate_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Issue Duplicate Receipt?</AlertDialogTitle>
            <AlertDialogDescription>
              This will create a duplicate copy of receipt{" "}
              <strong>{duplicateTarget?.receiptNumber}</strong> marked with a
              DUPLICATE watermark. The original receipt remains unchanged.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="receipts.duplicate_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDuplicate}
              disabled={duplicateReceipt.isPending}
              data-ocid="receipts.duplicate_confirm_button"
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {duplicateReceipt.isPending ? "Issuing..." : "Issue Duplicate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Email confirmation */}
      <AlertDialog
        open={!!emailTarget}
        onOpenChange={(open) => !open && setEmailTarget(null)}
      >
        <AlertDialogContent data-ocid="receipts.email_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Email Receipt to Parent?</AlertDialogTitle>
            <AlertDialogDescription>
              {emailTarget &&
                (() => {
                  const s = studentMap.get(String(emailTarget.studentId));
                  return s?.parentEmail
                    ? `Receipt ${emailTarget.receiptNumber} will be sent to ${s.parentEmail}.`
                    : "Email receipt to parent.";
                })()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="receipts.email_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEmailReceipt}
              data-ocid="receipts.email_confirm_button"
            >
              Send Email
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

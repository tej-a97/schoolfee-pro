import { r as reactExports, b as usePayments, a as useBills, k as useStudents, f as useClasses, W as useReceipts, j as jsxRuntimeExports, l as Button, I as Input, B as Badge, Y as useRecordPayment, _ as Receipt, C as CreditCard, s as ue } from "./index-BCwf3qRa.js";
import { D as DataTable } from "./DataTable-DMDGT477.js";
import { P as PageHeader } from "./PageHeader-BUSvgm_1.js";
import { S as StatusBadge } from "./StatusBadge-D_jS0nnP.js";
import { L as Label, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./label-C4vysoj5.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BKCEkiqv.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-cLHqXXX5.js";
import { T as Textarea } from "./textarea-C36GBQna.js";
import { E as Eye } from "./eye-7bDwyszU.js";
import { P as Plus } from "./plus-_bN1kOQl.js";
import { C as CircleCheckBig } from "./circle-check-big-wg0BM293.js";
import "./skeleton-BRKo-KLp.js";
import "./chevron-up-KabD4S3q.js";
import "./index-DJcHM0sm.js";
import "./index-DQgn1XGa.js";
const METHOD_COLORS = {
  Cash: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  BankTransfer: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  Online: "bg-violet-500/15 text-violet-500 border-violet-500/30",
  Card: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  UPI: "bg-pink-500/15 text-pink-500 border-pink-500/30"
};
function MethodBadge({ method }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `text-xs font-medium border ${METHOD_COLORS[method] ?? "bg-muted text-muted-foreground"}`,
      children: method
    }
  );
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(amount));
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function RecordPaymentDialog({
  open,
  onOpenChange,
  prefillBill,
  onSuccess
}) {
  const { data: bills = [] } = useBills({ status: void 0 });
  const { data: students = [] } = useStudents();
  const recordPayment = useRecordPayment();
  const pendingBills = reactExports.useMemo(
    () => bills.filter(
      (b) => b.status === "Pending" || b.status === "Partial" || b.status === "Overdue"
    ),
    [bills]
  );
  const [selectedBillId, setSelectedBillId] = reactExports.useState(
    prefillBill ? String(prefillBill.id) : ""
  );
  const [amount, setAmount] = reactExports.useState(
    prefillBill ? String(prefillBill.netAmount) : ""
  );
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [method, setMethod] = reactExports.useState("Cash");
  const [ref, setRef] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [successReceipt, setSuccessReceipt] = reactExports.useState(null);
  const selectedBill = reactExports.useMemo(
    () => bills.find((b) => String(b.id) === selectedBillId) ?? prefillBill ?? null,
    [bills, selectedBillId, prefillBill]
  );
  const student = reactExports.useMemo(
    () => students.find((s) => selectedBill && s.id === selectedBill.studentId),
    [students, selectedBill]
  );
  const remainingAmount = reactExports.useMemo(() => {
    if (!selectedBill) return 0n;
    return selectedBill.netAmount;
  }, [selectedBill]);
  const amountNum = BigInt(amount || "0");
  const amountError = amount !== "" && amountNum > remainingAmount ? `Amount exceeds remaining balance of ${formatCurrency(remainingAmount)}` : amountNum <= 0n && amount !== "" ? "Amount must be greater than 0" : null;
  const refRequired = method !== "Cash" && !ref.trim();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBill || !student) return;
    if (amountError || refRequired) return;
    try {
      const result = await recordPayment.mutateAsync({
        billId: selectedBill.id,
        studentId: student.id,
        amount: amountNum,
        method,
        referenceNumber: ref,
        notes
      });
      setSuccessReceipt(result);
      onSuccess == null ? void 0 : onSuccess(result);
      ue.success(`Payment recorded! Receipt ${result.receiptNumber}`);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to record payment"
      );
    }
  };
  const handleReset = () => {
    setSuccessReceipt(null);
    setSelectedBillId("");
    setAmount("");
    setDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    setMethod("Cash");
    setRef("");
    setNotes("");
  };
  if (successReceipt) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-md",
        "data-ocid": "record-payment.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-emerald-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5" }),
            "Payment Recorded"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Receipt Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: successReceipt.receiptNumber })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Amount Paid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-emerald-500", children: formatCurrency(successReceipt.amount) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatDate(successReceipt.paymentDate) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "flex-1",
                  onClick: handleReset,
                  "data-ocid": "record-payment.record_another_button",
                  children: "Record Another"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  className: "flex-1",
                  onClick: () => onOpenChange(false),
                  "data-ocid": "record-payment.close_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4 mr-1.5" }),
                    "Done"
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "record-payment.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5 text-primary" }),
      "Record Payment"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bill-select", children: "Select Bill *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: selectedBillId,
            onValueChange: (v) => {
              setSelectedBillId(v);
              const bill = bills.find((b) => String(b.id) === v);
              if (bill) setAmount(String(bill.netAmount));
            },
            disabled: !!prefillBill,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "bill-select",
                  "data-ocid": "record-payment.select",
                  className: "w-full",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Search and select a bill..." })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: pendingBills.map((bill) => {
                const s = students.find((st) => st.id === bill.studentId);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(bill.id), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: (s == null ? void 0 : s.name) ?? "Unknown" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-2", children: [
                    "#",
                    bill.billNumber
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs", children: formatCurrency(bill.netAmount) })
                ] }, String(bill.id));
              }) })
            ]
          }
        ),
        selectedBill && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Remaining balance:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatCurrency(remainingAmount) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "payment-amount", children: "Payment Amount *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "payment-amount",
            type: "number",
            min: "1",
            max: String(remainingAmount),
            value: amount,
            onChange: (e) => setAmount(e.target.value),
            placeholder: "Enter amount",
            "data-ocid": "record-payment.input",
            className: amountError ? "border-destructive" : ""
          }
        ),
        amountError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "record-payment.field_error",
            children: amountError
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "payment-date", children: "Payment Date *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "payment-date",
            type: "date",
            value: date,
            onChange: (e) => setDate(e.target.value),
            "data-ocid": "record-payment.date_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "payment-method", children: "Payment Method *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: method, onValueChange: setMethod, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              id: "payment-method",
              "data-ocid": "record-payment.method_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Cash", "BankTransfer", "Online", "Card", "UPI"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ref-number", children: [
          "Reference Number",
          " ",
          method !== "Cash" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "ref-number",
            value: ref,
            onChange: (e) => setRef(e.target.value),
            placeholder: method === "Cash" ? "Optional" : "Transaction / UTR number",
            "data-ocid": "record-payment.ref_input"
          }
        ),
        refRequired && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "record-payment.ref_field_error",
            children: [
              "Reference number is required for ",
              method,
              " payments"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "notes",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "Optional notes...",
            rows: 2,
            "data-ocid": "record-payment.textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "flex-1",
            onClick: () => onOpenChange(false),
            "data-ocid": "record-payment.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "flex-1",
            disabled: !selectedBill || !amount || !!amountError || refRequired || recordPayment.isPending,
            "data-ocid": "record-payment.submit_button",
            children: recordPayment.isPending ? "Recording..." : "Record Payment"
          }
        )
      ] })
    ] })
  ] }) });
}
function PaymentsPage() {
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [methodFilter, setMethodFilter] = reactExports.useState("all");
  const [classFilter, setClassFilter] = reactExports.useState("all");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [prefillBill, setPrefillBill] = reactExports.useState(null);
  const { data: allPayments = [], isLoading: paymentsLoading } = usePayments();
  const { data: pendingBills = [], isLoading: billsLoading } = useBills();
  const { data: students = [] } = useStudents();
  const { data: classes = [] } = useClasses();
  const { data: receipts = [] } = useReceipts();
  const studentMap = reactExports.useMemo(
    () => new Map(students.map((s) => [String(s.id), s])),
    [students]
  );
  const classMap = reactExports.useMemo(
    () => new Map(classes.map((c) => [String(c.id), c])),
    [classes]
  );
  const receiptMap = reactExports.useMemo(
    () => new Map(receipts.map((r) => [String(r.paymentId), r])),
    [receipts]
  );
  const filteredPayments = reactExports.useMemo(() => {
    let data = allPayments;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((p) => {
        const s = studentMap.get(String(p.studentId));
        const r = receiptMap.get(String(p.id));
        return (s == null ? void 0 : s.name.toLowerCase().includes(q)) || (r == null ? void 0 : r.receiptNumber.toLowerCase().includes(q)) || p.referenceNumber.toLowerCase().includes(q);
      });
    }
    if (methodFilter !== "all") {
      data = data.filter((p) => p.method === methodFilter);
    }
    if (dateFrom) {
      const from = new Date(dateFrom).getTime() * 1e6;
      data = data.filter((p) => Number(p.paymentDate) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo).getTime() * 1e6;
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
    receiptMap
  ]);
  const filteredPendingBills = reactExports.useMemo(() => {
    let data = pendingBills.filter(
      (b) => b.status === "Pending" || b.status === "Partial" || b.status === "Overdue"
    );
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((b) => {
        const s = studentMap.get(String(b.studentId));
        return (s == null ? void 0 : s.name.toLowerCase().includes(q)) || b.billNumber.toLowerCase().includes(q);
      });
    }
    if (classFilter !== "all") {
      data = data.filter((b) => String(b.classId) === classFilter);
    }
    return data;
  }, [pendingBills, search, classFilter, studentMap]);
  const openRecordForBill = reactExports.useCallback((bill) => {
    setPrefillBill(bill);
    setDialogOpen(true);
  }, []);
  const handleDialogClose = reactExports.useCallback((open) => {
    setDialogOpen(open);
    if (!open) setPrefillBill(null);
  }, []);
  const paymentColumns = reactExports.useMemo(
    () => [
      {
        key: "receiptNumber",
        label: "Receipt #",
        sortable: true,
        render: (_v, row) => {
          const p = row;
          const r = receiptMap.get(String(p.id));
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-primary", children: (r == null ? void 0 : r.receiptNumber) ?? "—" });
        }
      },
      {
        key: "studentName",
        label: "Student",
        sortable: true,
        render: (_v, row) => {
          const p = row;
          const s = studentMap.get(String(p.studentId));
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: (s == null ? void 0 : s.name) ?? "Unknown" });
        }
      },
      {
        key: "billId",
        label: "Bill #",
        render: (_v, row) => {
          const p = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
            "#",
            String(p.billId)
          ] });
        }
      },
      {
        key: "amount",
        label: "Amount",
        sortable: true,
        align: "right",
        render: (_v, row) => {
          const p = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-emerald-500", children: formatCurrency(p.amount) });
        }
      },
      {
        key: "paymentDate",
        label: "Date",
        sortable: true,
        render: (_v, row) => {
          const p = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: formatDate(p.paymentDate) });
        }
      },
      {
        key: "method",
        label: "Method",
        render: (_v, row) => {
          const p = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(MethodBadge, { method: p.method });
        }
      },
      {
        key: "referenceNumber",
        label: "Reference",
        render: (_v, row) => {
          const p = row;
          return p.referenceNumber ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: p.referenceNumber }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" });
        }
      },
      {
        key: "actions",
        label: "Actions",
        align: "center",
        render: (_v, row) => {
          const p = row;
          const r = receiptMap.get(String(p.id));
          return r ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-7 px-2 text-primary hover:text-primary",
              onClick: (e) => {
                e.stopPropagation();
                window.location.href = `/receipts?id=${r.id}`;
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 mr-1" }),
                "Receipt"
              ]
            }
          ) : null;
        }
      }
    ],
    [studentMap, receiptMap]
  );
  const billColumns = reactExports.useMemo(
    () => [
      {
        key: "billNumber",
        label: "Bill #",
        sortable: true,
        render: (_v, row) => {
          const b = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-primary", children: b.billNumber });
        }
      },
      {
        key: "studentName",
        label: "Student",
        sortable: true,
        render: (_v, row) => {
          const b = row;
          const s = studentMap.get(String(b.studentId));
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: (s == null ? void 0 : s.name) ?? "Unknown" });
        }
      },
      {
        key: "classId",
        label: "Class",
        render: (_v, row) => {
          const b = row;
          const c = classMap.get(String(b.classId));
          return c ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md font-medium", children: [
            c.name,
            " ",
            c.section
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" });
        }
      },
      {
        key: "netAmount",
        label: "Net Amount",
        sortable: true,
        align: "right",
        render: (_v, row) => {
          const b = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatCurrency(b.netAmount) });
        }
      },
      {
        key: "dueDate",
        label: "Due Date",
        sortable: true,
        render: (_v, row) => {
          const b = row;
          const isOverdue = b.status === "Overdue";
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isOverdue ? "text-red-500 font-semibold" : "", children: formatDate(b.dueDate) });
        }
      },
      {
        key: "status",
        label: "Status",
        render: (_v, row) => {
          const b = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: b.status });
        }
      },
      {
        key: "actions",
        label: "Actions",
        align: "center",
        render: (_v, row) => {
          const b = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              className: "h-7 text-xs",
              onClick: (e) => {
                e.stopPropagation();
                openRecordForBill(b);
              },
              "data-ocid": "pending-bills.record_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 mr-1" }),
                "Record"
              ]
            }
          );
        }
      }
    ],
    [studentMap, classMap, openRecordForBill]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "payments.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Payments",
        subtitle: "Track and record fee payments",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Payments" }
        ],
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => setDialogOpen(true),
            "data-ocid": "payments.open_modal_button",
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Record Payment"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 p-4 rounded-xl border border-border/50 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 min-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search student / receipt / reference...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "payments.search_input",
          className: "bg-background"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground whitespace-nowrap", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateFrom,
            onChange: (e) => setDateFrom(e.target.value),
            className: "w-36 text-sm bg-background",
            "data-ocid": "payments.date_from_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateTo,
            onChange: (e) => setDateTo(e.target.value),
            className: "w-36 text-sm bg-background",
            "data-ocid": "payments.date_to_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: methodFilter, onValueChange: setMethodFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-36 bg-background",
            "data-ocid": "payments.method_filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Methods" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Methods" }),
          ["Cash", "BankTransfer", "Online", "Card", "UPI"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m))
        ] })
      ] }),
      activeTab === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: classFilter, onValueChange: setClassFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-36 bg-background",
            "data-ocid": "payments.class_filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Classes" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Classes" }),
          classes.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(c.id), children: [
            c.name,
            " ",
            c.section
          ] }, String(c.id)))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: setActiveTab,
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsList,
            {
              className: "grid w-full max-w-xs grid-cols-2",
              "data-ocid": "payments.tab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", "data-ocid": "payments.all_tab", children: "All Payments" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "pending", "data-ocid": "payments.pending_tab", children: "Pending Bills" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DataTable,
            {
              columns: paymentColumns,
              data: filteredPayments,
              loading: paymentsLoading,
              emptyMessage: "No payments found. Try adjusting your filters.",
              rowKey: (row) => String(row.id),
              "data-ocid": "payments.table"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DataTable,
            {
              columns: billColumns,
              data: filteredPendingBills,
              loading: billsLoading,
              emptyMessage: "No pending bills. All dues are cleared!",
              rowKey: (row) => String(row.id),
              "data-ocid": "pending-bills.table"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RecordPaymentDialog,
      {
        open: dialogOpen,
        onOpenChange: handleDialogClose,
        prefillBill
      }
    )
  ] });
}
export {
  PaymentsPage as default
};

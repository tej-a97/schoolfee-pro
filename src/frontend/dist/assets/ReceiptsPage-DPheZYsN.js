import { c as createLucideIcon, j as jsxRuntimeExports, $ as Root, r as reactExports, M as useComposedRefs, a0 as WarningProvider, a1 as Content, N as composeEventHandlers, a2 as Title, a3 as Description, a4 as Close, a5 as createDialogScope, a6 as Portal, a7 as Overlay, a8 as createSlottable, Q as createContextScope, a9 as Trigger, R as cn, aa as buttonVariants, W as useReceipts, k as useStudents, f as useClasses, B as Badge, l as Button, s as ue, I as Input, ab as useActor, ac as useQueryClient, ad as useMutation, ae as createActor } from "./index-BCwf3qRa.js";
import { D as DataTable } from "./DataTable-DMDGT477.js";
import { P as PageHeader } from "./PageHeader-BUSvgm_1.js";
import { L as Label, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./label-C4vysoj5.js";
import { S as Separator } from "./separator-DvwiF-tq.js";
import { S as Skeleton } from "./skeleton-BRKo-KLp.js";
import { E as Eye } from "./eye-7bDwyszU.js";
import { P as Printer } from "./printer-zjzz7390.js";
import { D as Download } from "./download-ClpBff4K.js";
import { M as Mail } from "./mail-9F5fMpuP.js";
import "./chevron-up-KabD4S3q.js";
import "./index-DJcHM0sm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
];
const QrCode = createLucideIcon("qr-code", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  ["path", { d: "M13 16H8", key: "wsln4y" }]
];
const ReceiptText = createLucideIcon("receipt-text", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
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
function QrCodeDisplay({ data }) {
  const size = 100;
  const cells = 21;
  const cellSize = size / cells;
  const hash = reactExports.useMemo(() => {
    let h = 0;
    for (let i = 0; i < data.length; i++) {
      h = Math.imul(31, h) + data.charCodeAt(i) | 0;
    }
    return Math.abs(h);
  }, [data]);
  const flatCells = reactExports.useMemo(() => {
    const result = [];
    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        const isFinderTL = r < 7 && c < 7;
        const isFinderTR = r < 7 && c >= cells - 7;
        const isFinderBL = r >= cells - 7 && c < 7;
        let filled;
        if (isFinderTL || isFinderTR || isFinderBL) {
          const lr = isFinderTL ? r : isFinderTR ? r : r - (cells - 7);
          const lc = isFinderTL ? c : isFinderTR ? c - (cells - 7) : c;
          filled = lr === 0 || lr === 6 || lc === 0 || lc === 6 || lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
        } else {
          filled = (hash >> (r * cells + c) % 30 & 1) === 1;
        }
        if (filled) {
          result.push({
            key: `${hash}-${r}-${c}`,
            x: c * cellSize,
            y: r * cellSize
          });
        }
      }
    }
    return result;
  }, [hash, cellSize]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-white p-2 rounded-lg inline-block",
      style: { width: size + 16, height: size + 16 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          width: size,
          height: size,
          viewBox: `0 0 ${size} ${size}`,
          role: "img",
          "aria-label": "QR Code",
          children: flatCells.map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: cell.x,
              y: cell.y,
              width: cellSize,
              height: cellSize,
              fill: "#000"
            },
            cell.key
          ))
        }
      )
    }
  );
}
function ReceiptDetailDialog({
  receipt,
  open,
  onOpenChange,
  onDuplicate,
  onEmail,
  studentName,
  studentClass,
  studentAdmission,
  parentEmail
}) {
  const printRef = reactExports.useRef(null);
  const handlePrint = () => {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(
      `<html><head><title>Receipt</title><style>body{font-family:sans-serif;padding:24px;color:#000}table{width:100%;border-collapse:collapse}td,th{padding:8px 12px;border:1px solid #ddd;font-size:14px}.watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:80px;opacity:.08;pointer-events:none;font-weight:bold}</style></head><body>${content}</body></html>`
    );
    w.document.close();
    w.print();
  };
  if (!receipt) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xl", "data-ocid": "receipt-detail.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReceiptText, { className: "h-5 w-5 text-primary" }),
      "Receipt Details"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: printRef, className: "relative", children: [
      receipt.isDuplicate && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 flex items-center justify-center pointer-events-none z-10",
          style: { transform: "rotate(-25deg)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive/10 text-7xl font-extrabold tracking-widest select-none", children: "DUPLICATE" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 relative z-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: "S" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold font-display text-foreground text-lg leading-tight", children: "SchoolFee Pro" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Private School Fee Management" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: receipt.isDuplicate ? "border-amber-500/40 text-amber-500" : "border-emerald-500/30 text-emerald-500",
              children: receipt.isDuplicate ? "DUPLICATE RECEIPT" : "OFFICIAL RECEIPT"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Receipt Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-primary text-sm", children: receipt.receiptNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: formatDate(receipt.paymentDate) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Student Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: studentName ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Class" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: studentClass ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Admission No." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm", children: studentAdmission ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Bill Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm", children: [
              "#",
              String(receipt.billId)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border/50 p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Payment Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-emerald-500", children: formatCurrency(receipt.amount) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Payment Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MethodBadge, { method: receipt.method })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Issued At" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: formatDate(receipt.issuedAt) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QrCodeDisplay, { data: receipt.qrData }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-4 w-4 mb-1 text-primary" }),
            "Scan to verify"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap gap-2 pt-1",
        "data-ocid": "receipt-detail.actions",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: handlePrint,
              "data-ocid": "receipt-detail.print_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Print"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              "data-ocid": "receipt-detail.download_button",
              onClick: () => ue.info("PDF download would open here"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5 mr-1.5" }),
                "PDF"
              ]
            }
          ),
          parentEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => onEmail(receipt),
              "data-ocid": "receipt-detail.email_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Email"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "border-amber-500/30 text-amber-500 hover:bg-amber-500/10",
              onClick: () => onDuplicate(receipt),
              "data-ocid": "receipt-detail.duplicate_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Duplicate"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "ml-auto",
              onClick: () => onOpenChange(false),
              "data-ocid": "receipt-detail.close_button",
              children: "Close"
            }
          )
        ]
      }
    )
  ] }) });
}
function useDuplicateReceipt() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.duplicateReceipt(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["receipts"] })
  });
}
function ReceiptsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [classFilter, setClassFilter] = reactExports.useState("all");
  const [detailReceipt, setDetailReceipt] = reactExports.useState(null);
  const [detailOpen, setDetailOpen] = reactExports.useState(false);
  const [duplicateTarget, setDuplicateTarget] = reactExports.useState(null);
  const [emailTarget, setEmailTarget] = reactExports.useState(null);
  const { data: receipts = [], isLoading } = useReceipts();
  const { data: students = [] } = useStudents();
  const { data: classes = [] } = useClasses();
  const duplicateReceipt = useDuplicateReceipt();
  const studentMap = reactExports.useMemo(
    () => new Map(students.map((s) => [String(s.id), s])),
    [students]
  );
  const classMap = reactExports.useMemo(
    () => new Map(classes.map((c) => [String(c.id), c])),
    [classes]
  );
  const filteredReceipts = reactExports.useMemo(() => {
    let data = receipts;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((r) => {
        const s = studentMap.get(String(r.studentId));
        return r.receiptNumber.toLowerCase().includes(q) || (s == null ? void 0 : s.name.toLowerCase().includes(q));
      });
    }
    if (classFilter !== "all") {
      const studentsInClass = students.filter(
        (s) => String(s.classId) === classFilter
      );
      const ids = new Set(studentsInClass.map((s) => String(s.id)));
      data = data.filter((r) => ids.has(String(r.studentId)));
    }
    if (dateFrom) {
      const from = new Date(dateFrom).getTime() * 1e6;
      data = data.filter((r) => Number(r.paymentDate) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo).getTime() * 1e6;
      data = data.filter((r) => Number(r.paymentDate) <= to);
    }
    return data;
  }, [receipts, search, classFilter, dateFrom, dateTo, studentMap, students]);
  const openDetail = reactExports.useCallback((receipt) => {
    setDetailReceipt(receipt);
    setDetailOpen(true);
  }, []);
  const handleConfirmDuplicate = async () => {
    if (!duplicateTarget) return;
    try {
      const dup = await duplicateReceipt.mutateAsync(duplicateTarget.id);
      setDuplicateTarget(null);
      ue.success(`Duplicate receipt created: ${dup.receiptNumber}`);
      setDetailReceipt(dup);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to duplicate");
    }
  };
  const handleEmailReceipt = () => {
    if (!emailTarget) return;
    const s = studentMap.get(String(emailTarget.studentId));
    ue.success(`Receipt emailed to ${(s == null ? void 0 : s.parentEmail) ?? "parent"}!`);
    setEmailTarget(null);
  };
  const getStudentInfo = (receipt) => {
    if (!receipt) return {};
    const s = studentMap.get(String(receipt.studentId));
    const c = classMap.get(String((s == null ? void 0 : s.classId) ?? ""));
    return {
      studentName: s == null ? void 0 : s.name,
      studentClass: c ? `${c.name} ${c.section}` : void 0,
      studentAdmission: s == null ? void 0 : s.admissionNumber,
      parentEmail: s == null ? void 0 : s.parentEmail
    };
  };
  const columns = reactExports.useMemo(
    () => [
      {
        key: "receiptNumber",
        label: "Receipt #",
        sortable: true,
        render: (_v, row) => {
          const r = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-primary", children: r.receiptNumber }),
            r.isDuplicate && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs py-0 px-1.5 border-amber-500/30 text-amber-500",
                children: "Dup"
              }
            )
          ] });
        }
      },
      {
        key: "studentName",
        label: "Student",
        sortable: true,
        render: (_v, row) => {
          const r = row;
          const s = studentMap.get(String(r.studentId));
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: (s == null ? void 0 : s.name) ?? "Unknown" });
        }
      },
      {
        key: "billId",
        label: "Bill #",
        render: (_v, row) => {
          const r = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
            "#",
            String(r.billId)
          ] });
        }
      },
      {
        key: "amount",
        label: "Amount",
        sortable: true,
        align: "right",
        render: (_v, row) => {
          const r = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-emerald-500", children: formatCurrency(r.amount) });
        }
      },
      {
        key: "paymentDate",
        label: "Date",
        sortable: true,
        render: (_v, row) => {
          const r = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: formatDate(r.paymentDate) });
        }
      },
      {
        key: "method",
        label: "Method",
        render: (_v, row) => {
          const r = row;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(MethodBadge, { method: r.method });
        }
      },
      {
        key: "actions",
        label: "Actions",
        align: "center",
        render: (_v, row) => {
          const r = row;
          const s = studentMap.get(String(r.studentId));
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "h-7 w-7 p-0 text-primary",
                title: "View",
                onClick: (e) => {
                  e.stopPropagation();
                  openDetail(r);
                },
                "data-ocid": "receipts.view_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "h-7 w-7 p-0 text-muted-foreground",
                title: "Print",
                onClick: (e) => {
                  e.stopPropagation();
                  openDetail(r);
                },
                "data-ocid": "receipts.print_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "h-7 w-7 p-0 text-muted-foreground",
                title: "Download PDF",
                onClick: (e) => {
                  e.stopPropagation();
                  ue.info("PDF download");
                },
                "data-ocid": "receipts.download_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" })
              }
            ),
            (s == null ? void 0 : s.parentEmail) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "h-7 w-7 p-0 text-muted-foreground",
                title: "Email",
                onClick: (e) => {
                  e.stopPropagation();
                  setEmailTarget(r);
                },
                "data-ocid": "receipts.email_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "h-7 w-7 p-0 text-amber-500",
                title: "Duplicate",
                onClick: (e) => {
                  e.stopPropagation();
                  setDuplicateTarget(r);
                },
                "data-ocid": "receipts.duplicate_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
              }
            )
          ] });
        }
      }
    ],
    [studentMap, openDetail]
  );
  const detailInfo = getStudentInfo(detailReceipt);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "receipts.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Receipts",
        subtitle: "View and manage payment receipts",
        breadcrumbs: [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Receipts" }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 p-4 rounded-xl border border-border/50 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 min-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search receipt number / student...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "receipts.search_input",
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
            "data-ocid": "receipts.date_from_input"
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
            "data-ocid": "receipts.date_to_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: classFilter,
          onChange: (e) => setClassFilter(e.target.value),
          className: "h-9 rounded-md border border-input bg-background px-3 text-sm",
          "data-ocid": "receipts.class_filter",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Classes" }),
            classes.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(c.id), children: [
              c.name,
              " ",
              c.section
            ] }, String(c.id)))
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: isLoading ? Array.from({ length: 4 }, (_, i) => `skel-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, k)) : [
      {
        label: "Total Receipts",
        value: receipts.length,
        color: "text-primary"
      },
      {
        label: "Shown",
        value: filteredReceipts.length,
        color: "text-foreground"
      },
      {
        label: "Duplicates",
        value: filteredReceipts.filter((r) => r.isDuplicate).length,
        color: "text-amber-500"
      },
      {
        label: "Total Collected",
        value: formatCurrency(
          filteredReceipts.reduce((sum, r) => sum + r.amount, 0n)
        ),
        color: "text-emerald-500"
      }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border/50 bg-card p-3 space-y-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-lg font-bold font-display ${stat.color}`, children: stat.value })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        columns,
        data: filteredReceipts,
        loading: isLoading,
        emptyMessage: "No receipts found. Record a payment to generate receipts.",
        rowKey: (row) => String(row.id),
        onRowClick: (row) => openDetail(row),
        "data-ocid": "receipts.table"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReceiptDetailDialog,
      {
        receipt: detailReceipt,
        open: detailOpen,
        onOpenChange: setDetailOpen,
        onDuplicate: (r) => {
          setDuplicateTarget(r);
          setDetailOpen(false);
        },
        onEmail: (r) => {
          setEmailTarget(r);
          setDetailOpen(false);
        },
        ...detailInfo
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!duplicateTarget,
        onOpenChange: (open) => !open && setDuplicateTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "receipts.duplicate_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Issue Duplicate Receipt?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "This will create a duplicate copy of receipt",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: duplicateTarget == null ? void 0 : duplicateTarget.receiptNumber }),
              " marked with a DUPLICATE watermark. The original receipt remains unchanged."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "receipts.duplicate_cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleConfirmDuplicate,
                disabled: duplicateReceipt.isPending,
                "data-ocid": "receipts.duplicate_confirm_button",
                className: "bg-amber-500 hover:bg-amber-600 text-white",
                children: duplicateReceipt.isPending ? "Issuing..." : "Issue Duplicate"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!emailTarget,
        onOpenChange: (open) => !open && setEmailTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "receipts.email_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Email Receipt to Parent?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: emailTarget && (() => {
              const s = studentMap.get(String(emailTarget.studentId));
              return (s == null ? void 0 : s.parentEmail) ? `Receipt ${emailTarget.receiptNumber} will be sent to ${s.parentEmail}.` : "Email receipt to parent.";
            })() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "receipts.email_cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleEmailReceipt,
                "data-ocid": "receipts.email_confirm_button",
                children: "Send Email"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  ReceiptsPage as default
};

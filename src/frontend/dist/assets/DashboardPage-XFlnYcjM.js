import { c as createLucideIcon, u as useDashboardStats, a as useBills, b as usePayments, d as useNavigate, j as jsxRuntimeExports, U as Users, G as GraduationCap, F as FileText, C as CreditCard, B as Badge, e as BillStatus } from "./index-BCwf3qRa.js";
import { P as PageHeader } from "./PageHeader-BUSvgm_1.js";
import { S as StatsCard, T as TrendingUp } from "./StatsCard-BwkdajfT.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-COw9bUv5.js";
import { S as Skeleton } from "./skeleton-BRKo-KLp.js";
import { I as IndianRupee } from "./indian-rupee-DEWnNIuL.js";
import { T as TriangleAlert } from "./triangle-alert-7BobXaSH.js";
import { C as CircleCheck } from "./circle-check-D0U7rHwJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const QUICK_ACTIONS = [
  {
    label: "Manage Students",
    icon: GraduationCap,
    path: "/students",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20"
  },
  {
    label: "View Bills",
    icon: FileText,
    path: "/bills",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20"
  },
  {
    label: "Record Payment",
    icon: CreditCard,
    path: "/payments",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20"
  },
  {
    label: "View Reports",
    icon: ChartColumn,
    path: "/reports",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20"
  }
];
function BillStatusIcon({ status }) {
  if (status === BillStatus.Paid)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-400" });
  if (status === BillStatus.Overdue)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 text-red-400" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3.5 w-3.5 text-amber-400" });
}
function RecentBillsCard({
  bills,
  loading
}) {
  const recent = bills.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-primary" }),
      "Recent Bills"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 space-y-3", children: Array.from({ length: 4 }, (_, i) => `sk-bill-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }, k)) }) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No bills yet" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/30", children: recent.map((bill) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between px-4 py-2.5 hover:bg-muted/10 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BillStatusIcon, { status: bill.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate font-mono", children: bill.billNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: bill.month })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 ml-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground", children: [
              "₹",
              Number(bill.netAmount).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-xs px-1.5 py-0 border ${bill.status === BillStatus.Paid ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : bill.status === BillStatus.Overdue ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`,
                children: bill.status
              }
            )
          ] })
        ]
      },
      bill.billNumber
    )) }) })
  ] });
}
function RecentPaymentsCard({
  payments,
  loading
}) {
  const recent = payments.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass border-border/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-emerald-400" }),
      "Recent Payments"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 space-y-3", children: Array.from({ length: 4 }, (_, i) => `sk-pay-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }, k)) }) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No payments recorded yet" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/30", children: recent.map((payment) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between px-4 py-2.5 hover:bg-muted/10 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 text-emerald-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: payment.method }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: payment.referenceNumber || "—" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-emerald-400 shrink-0 ml-2", children: [
            "₹",
            Number(payment.amount).toLocaleString()
          ] })
        ]
      },
      payment.id.toString()
    )) }) })
  ] });
}
function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: bills, isLoading: billsLoading } = useBills({});
  const { data: payments, isLoading: paymentsLoading } = usePayments({});
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Dashboard",
        subtitle: "School fee management overview",
        breadcrumbs: [{ label: "Dashboard" }]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4",
        "data-ocid": "dashboard.stats.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatsCard,
            {
              label: "Total Students",
              value: statsLoading ? "—" : Number((stats == null ? void 0 : stats.totalStudents) ?? 0).toLocaleString(),
              icon: Users,
              color: "primary",
              loading: statsLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatsCard,
            {
              label: "Total Collected",
              value: statsLoading ? "—" : Number((stats == null ? void 0 : stats.totalCollected) ?? 0).toLocaleString(),
              icon: IndianRupee,
              color: "success",
              prefix: "₹",
              loading: statsLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatsCard,
            {
              label: "Pending Fees",
              value: statsLoading ? "—" : Number((stats == null ? void 0 : stats.pendingFees) ?? 0).toLocaleString(),
              icon: Clock,
              color: "warning",
              prefix: "₹",
              loading: statsLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatsCard,
            {
              label: "Today's Collection",
              value: statsLoading ? "—" : Number((stats == null ? void 0 : stats.todayCollection) ?? 0).toLocaleString(),
              icon: TrendingUp,
              color: "info",
              prefix: "₹",
              loading: statsLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatsCard,
            {
              label: "Due Students",
              value: statsLoading ? "—" : Number((stats == null ? void 0 : stats.dueStudentsCount) ?? 0).toLocaleString(),
              icon: TriangleAlert,
              color: "destructive",
              loading: statsLoading
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.quick_actions.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: QUICK_ACTIONS.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `dashboard.quick_action.${action.label.toLowerCase().replace(/\s+/g, "_")}`,
          onClick: () => navigate({ to: action.path }),
          className: `flex flex-col items-center gap-2.5 p-4 rounded-xl border ${action.bg} hover:scale-[1.02] active:scale-[0.98] transition-smooth cursor-pointer text-center group`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-10 w-10 rounded-xl flex items-center justify-center ${action.bg} border`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { className: `h-5 w-5 ${action.color}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-sm font-medium ${action.color} group-hover:opacity-90`,
                children: action.label
              }
            )
          ]
        },
        action.path
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
        "data-ocid": "dashboard.activity.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RecentBillsCard, { bills: bills ?? [], loading: billsLoading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RecentPaymentsCard,
            {
              payments: payments ?? [],
              loading: paymentsLoading
            }
          )
        ]
      }
    )
  ] });
}
export {
  DashboardPage as default
};

import { c as createLucideIcon, j as jsxRuntimeExports, R as cn } from "./index-BCwf3qRa.js";
import { C as Card, c as CardContent } from "./card-COw9bUv5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const COLOR_MAP = {
  primary: {
    icon: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    gradient: "from-indigo-500/5 to-transparent"
  },
  success: {
    icon: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    gradient: "from-emerald-500/5 to-transparent"
  },
  warning: {
    icon: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    gradient: "from-amber-500/5 to-transparent"
  },
  destructive: {
    icon: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    gradient: "from-red-500/5 to-transparent"
  },
  info: {
    icon: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    gradient: "from-cyan-500/5 to-transparent"
  }
};
function StatsCard({
  label,
  value,
  icon: Icon,
  trend,
  color = "primary",
  prefix,
  suffix,
  loading
}) {
  const colors = COLOR_MAP[color];
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted rounded w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-16" })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: cn("glass border relative overflow-hidden", colors.bg), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none",
          colors.gradient
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider truncate", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold font-display text-foreground tabular-nums", children: [
          prefix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold", children: prefix }),
          value,
          suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal ml-1 text-muted-foreground", children: suffix })
        ] }),
        trend && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex items-center gap-1 text-xs font-medium",
              trend.direction === "up" ? "text-emerald-400" : "text-red-400"
            ),
            children: [
              trend.direction === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Math.abs(trend.value),
                "% vs last month"
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("rounded-xl p-2.5 border", colors.bg), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-5 w-5", colors.icon) }) })
    ] }) })
  ] });
}
export {
  StatsCard as S,
  TrendingUp as T
};

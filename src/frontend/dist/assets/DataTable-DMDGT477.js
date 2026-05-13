import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, S as Search, I as Input, R as cn, l as Button, af as ChevronRight } from "./index-BCwf3qRa.js";
import { S as Skeleton } from "./skeleton-BRKo-KLp.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-KabD4S3q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode);
function DataTable({
  columns,
  data,
  searchable,
  searchPlaceholder = "Search...",
  onSearch,
  totalCount,
  page = 1,
  pageSize = 10,
  onPageChange,
  loading,
  emptyMessage = "No records found",
  rowKey,
  onRowClick,
  "data-ocid": dataOcid
}) {
  const [sortKey, setSortKey] = reactExports.useState(null);
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [localSearch, setLocalSearch] = reactExports.useState("");
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };
  const handleSearch = (value) => {
    setLocalSearch(value);
    onSearch == null ? void 0 : onSearch(value);
  };
  const sortedData = reactExports.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = typeof aVal === "string" && typeof bVal === "string" ? aVal.localeCompare(bVal) : typeof aVal === "number" && typeof bVal === "number" ? aVal - bVal : typeof aVal === "bigint" && typeof bVal === "bigint" ? aVal < bVal ? -1 : aVal > bVal ? 1 : 0 : String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);
  const totalPages = totalCount !== void 0 ? Math.ceil(totalCount / pageSize) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": dataOcid, className: "space-y-3", children: [
    searchable && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": dataOcid ? `${dataOcid}.search_input` : void 0,
          value: localSearch,
          onChange: (e) => handleSearch(e.target.value),
          placeholder: searchPlaceholder,
          className: "pl-9 bg-card border-border/60 focus:border-primary/50"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/50 overflow-hidden bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50 bg-muted/30", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          onClick: () => col.sortable && handleSort(String(col.key)),
          onKeyDown: (e) => e.key === "Enter" && col.sortable && handleSort(String(col.key)),
          className: cn(
            "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none",
            col.sortable && "cursor-pointer hover:text-foreground transition-colors",
            col.align === "right" && "text-right",
            col.align === "center" && "text-center"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "flex items-center gap-1",
                col.align === "right" && "justify-end",
                col.align === "center" && "justify-center"
              ),
              children: [
                col.label,
                col.sortable && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1", children: sortKey === col.key ? sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "h-3 w-3 opacity-40" }) })
              ]
            }
          )
        },
        String(col.key)
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/30", children: loading ? Array.from({ length: 5 }, (_, i) => `skeleton-row-${i}`).map(
        (skeletonKey) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, String(col.key))) }, skeletonKey)
      ) : sortedData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: columns.length,
          className: "px-4 py-12 text-center text-muted-foreground",
          "data-ocid": dataOcid ? `${dataOcid}.empty_state` : void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: emptyMessage })
          ] })
        }
      ) }) : sortedData.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "tr",
        {
          "data-ocid": dataOcid ? `${dataOcid}.item.${idx + 1}` : void 0,
          onClick: () => onRowClick == null ? void 0 : onRowClick(row),
          onKeyDown: (e) => e.key === "Enter" && (onRowClick == null ? void 0 : onRowClick(row)),
          className: cn(
            "transition-colors hover:bg-muted/20",
            onRowClick && "cursor-pointer"
          ),
          children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: cn(
                "px-4 py-3 text-sm text-foreground",
                col.align === "right" && "text-right",
                col.align === "center" && "text-center"
              ),
              children: col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "-")
            },
            String(col.key)
          ))
        },
        rowKey ? rowKey(row) : idx
      )) })
    ] }) }) }),
    totalPages !== void 0 && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Page ",
        page,
        " of ",
        totalPages,
        " — ",
        totalCount,
        " records"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            disabled: page <= 1,
            onClick: () => onPageChange == null ? void 0 : onPageChange(page - 1),
            "data-ocid": dataOcid ? `${dataOcid}.pagination_prev` : void 0,
            className: "border-border/60",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            disabled: page >= totalPages,
            onClick: () => onPageChange == null ? void 0 : onPageChange(page + 1),
            "data-ocid": dataOcid ? `${dataOcid}.pagination_next` : void 0,
            className: "border-border/60",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] })
  ] });
}
export {
  DataTable as D
};

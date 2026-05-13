import { c as createLucideIcon, A as useFeeStructures, f as useClasses, D as useCreateFeeStructure, E as useDeleteFeeStructure, r as reactExports, P as PaymentPlan, H as FeeCategory, j as jsxRuntimeExports, l as Button, I as Input, s as ue, B as Badge } from "./index-BCwf3qRa.js";
import { P as PageHeader } from "./PageHeader-BUSvgm_1.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, L as Label, e as DialogFooter } from "./label-C4vysoj5.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BKCEkiqv.js";
import { S as Skeleton } from "./skeleton-BRKo-KLp.js";
import { P as Plus } from "./plus-_bN1kOQl.js";
import { T as Trash2 } from "./trash-2-D4MKv-Pz.js";
import { I as IndianRupee } from "./indian-rupee-DEWnNIuL.js";
import { C as Calendar } from "./calendar-CrBH3V74.js";
import "./index-DJcHM0sm.js";
import "./index-DQgn1XGa.js";
import "./chevron-up-KabD4S3q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
const Percent = createLucideIcon("percent", __iconNode);
const ACADEMIC_YEAR = `${(/* @__PURE__ */ new Date()).getFullYear()}-${(/* @__PURE__ */ new Date()).getFullYear() + 1}`;
const FEE_CATEGORIES = Object.values(FeeCategory);
const PAYMENT_PLANS = Object.values(PaymentPlan);
const DEFAULT_FORM = {
  classId: "0",
  category: FeeCategory.Tuition,
  customCategoryName: "",
  amount: "",
  paymentPlan: PaymentPlan.Monthly,
  dueDayOfMonth: "10",
  fineRatePercent: "0",
  discountPercent: "0",
  academicYear: ACADEMIC_YEAR
};
function categoryColor(cat) {
  const map = {
    [FeeCategory.Tuition]: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
    [FeeCategory.Admission]: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    [FeeCategory.Exam]: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    [FeeCategory.Transport]: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    [FeeCategory.Hostel]: "bg-purple-500/15 text-purple-400 border-purple-500/25",
    [FeeCategory.Library]: "bg-pink-500/15 text-pink-400 border-pink-500/25",
    [FeeCategory.Miscellaneous]: "bg-muted text-muted-foreground border-border",
    [FeeCategory.Custom]: "bg-muted text-muted-foreground border-border"
  };
  return map[cat] ?? "bg-muted text-muted-foreground border-border";
}
function FeeStructureCard({
  fs,
  className: clsName,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-smooth group",
      "data-ocid": `fee_structure.card.${fs.id.toString()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground font-display", children: clsName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs border ${categoryColor(fs.category)}`,
                  children: fs.category === FeeCategory.Custom ? fs.customCategoryName || "Custom" : fs.category
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs bg-muted text-muted-foreground border-border",
                  children: fs.paymentPlan
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground flex items-center gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3.5 w-3.5" }),
                Number(fs.amount).toLocaleString()
              ] }),
              Number(fs.fineRatePercent) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-red-400 flex items-center gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "h-3 w-3" }),
                Number(fs.fineRatePercent),
                "% fine"
              ] }),
              Number(fs.discountPercent) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-emerald-400 flex items-center gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "h-3 w-3" }),
                Number(fs.discountPercent),
                "% discount"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                "Due day ",
                Number(fs.dueDayOfMonth)
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-7 w-7 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-smooth",
            onClick: () => onDelete(fs),
            "data-ocid": `fee_structure.delete_button.${fs.id.toString()}`,
            "aria-label": "Delete fee structure",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
          }
        )
      ]
    }
  );
}
function FeeStructurePage() {
  const { data: feeStructures, isLoading } = useFeeStructures(
    void 0,
    void 0
  );
  const { data: classes } = useClasses(void 0);
  const createMutation = useCreateFeeStructure();
  const deleteMutation = useDeleteFeeStructure();
  const [mode, setMode] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(DEFAULT_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const changeField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };
  const validate = () => {
    const errs = {};
    if (form.classId === "0") errs.classId = "Please select a class";
    if (!form.amount || Number(form.amount) <= 0)
      errs.amount = "Amount must be greater than 0";
    if (form.category === FeeCategory.Custom && !form.customCategoryName.trim())
      errs.customCategoryName = "Custom category name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const buildInput = () => ({
    classId: BigInt(form.classId),
    category: form.category,
    customCategoryName: form.customCategoryName,
    amount: BigInt(Math.round(Number(form.amount) * 100)),
    paymentPlan: form.paymentPlan,
    dueDayOfMonth: BigInt(Number(form.dueDayOfMonth) || 10),
    fineRatePercent: BigInt(Number(form.fineRatePercent) || 0),
    discountPercent: BigInt(Number(form.discountPercent) || 0),
    academicYear: form.academicYear || ACADEMIC_YEAR
  });
  const openAdd = () => {
    setForm(DEFAULT_FORM);
    setErrors({});
    setMode("add");
  };
  const openDelete = (fs) => {
    setSelected(fs);
    setMode("delete");
  };
  const close = () => {
    setMode(null);
    setSelected(null);
  };
  const handleAdd = async () => {
    if (!validate()) return;
    try {
      await createMutation.mutateAsync(buildInput());
      ue.success("Fee structure created!");
      close();
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to create fee structure"
      );
    }
  };
  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteMutation.mutateAsync(selected.id);
      ue.success("Fee structure deleted!");
      close();
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to delete fee structure"
      );
    }
  };
  const getClassName = (classId) => {
    const cls = (classes ?? []).find((c) => c.id === classId);
    return cls ? `${cls.name} — ${cls.section}` : `Class ${classId.toString()}`;
  };
  const fsList = feeStructures ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "fee_structure.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Fee Structure",
        subtitle: `${fsList.length} fee structure${fsList.length !== 1 ? "s" : ""} configured`,
        breadcrumbs: [{ label: "Fee Structure" }],
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "fee_structure.add_button",
            onClick: openAdd,
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Add Fee Structure"
            ]
          }
        )
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "fee_structure.loading_state", children: Array.from({ length: 4 }, (_, i) => `sk-fs-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, k)) }) : fsList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4 rounded-xl border border-dashed border-border/50 bg-card",
        "data-ocid": "fee_structure.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold font-display text-foreground", children: "No fee structures yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Define fee rules for each class to generate bills automatically" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: openAdd,
              "data-ocid": "fee_structure.empty_add_button",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                " Add First Fee Structure"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: fsList.map((fs) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeeStructureCard,
      {
        fs,
        className: getClassName(fs.classId),
        onDelete: openDelete
      },
      fs.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: mode === "add", onOpenChange: (open) => !open && close(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-lg max-h-[90vh] overflow-y-auto",
        "data-ocid": "fee_structure.add.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Add Fee Structure" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Define fee rules for a class. Bills are auto-calculated from these rules." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "fs-class", children: [
                "Class ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.classId,
                  onValueChange: (v) => changeField("classId", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "fs-class",
                        "data-ocid": "fee_structure.form.class",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a class" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "0", children: "Select a class" }),
                      (classes ?? []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id.toString(), children: [
                        c.name,
                        " — ",
                        c.section
                      ] }, c.id.toString()))
                    ] })
                  ]
                }
              ),
              errors.classId && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "fee_structure.form.class_error",
                  className: "text-xs text-destructive",
                  children: errors.classId
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fs-cat", children: "Fee Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.category,
                    onValueChange: (v) => changeField("category", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "fs-cat",
                          "data-ocid": "fee_structure.form.category",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FEE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: cat }, cat)) })
                    ]
                  }
                )
              ] }),
              form.category === FeeCategory.Custom && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "fs-custom", children: [
                  "Custom Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "fs-custom",
                    "data-ocid": "fee_structure.form.custom_name",
                    value: form.customCategoryName,
                    onChange: (e) => changeField("customCategoryName", e.target.value),
                    placeholder: "e.g. Sports Fee"
                  }
                ),
                errors.customCategoryName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.customCategoryName })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "fs-amount", children: [
                  "Amount (₹) ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "fs-amount",
                    type: "number",
                    min: "0",
                    step: "0.01",
                    "data-ocid": "fee_structure.form.amount",
                    value: form.amount,
                    onChange: (e) => changeField("amount", e.target.value),
                    placeholder: "e.g. 5000"
                  }
                ),
                errors.amount && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    "data-ocid": "fee_structure.form.amount_error",
                    className: "text-xs text-destructive",
                    children: errors.amount
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fs-plan", children: "Payment Plan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.paymentPlan,
                    onValueChange: (v) => changeField("paymentPlan", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "fs-plan",
                          "data-ocid": "fee_structure.form.payment_plan",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAYMENT_PLANS.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: plan, children: plan }, plan)) })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fs-due", children: "Due Day" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "fs-due",
                    type: "number",
                    min: "1",
                    max: "28",
                    "data-ocid": "fee_structure.form.due_day",
                    value: form.dueDayOfMonth,
                    onChange: (e) => changeField("dueDayOfMonth", e.target.value),
                    placeholder: "10"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fs-fine", children: "Fine %" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "fs-fine",
                    type: "number",
                    min: "0",
                    max: "100",
                    "data-ocid": "fee_structure.form.fine_rate",
                    value: form.fineRatePercent,
                    onChange: (e) => changeField("fineRatePercent", e.target.value),
                    placeholder: "0"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fs-discount", children: "Discount %" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "fs-discount",
                    type: "number",
                    min: "0",
                    max: "100",
                    "data-ocid": "fee_structure.form.discount",
                    value: form.discountPercent,
                    onChange: (e) => changeField("discountPercent", e.target.value),
                    placeholder: "0"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fs-year", children: "Academic Year" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "fs-year",
                  "data-ocid": "fee_structure.form.academic_year",
                  value: form.academicYear,
                  onChange: (e) => changeField("academicYear", e.target.value),
                  placeholder: ACADEMIC_YEAR
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: close,
                "data-ocid": "fee_structure.form.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": "fee_structure.form.submit_button",
                disabled: createMutation.isPending,
                onClick: handleAdd,
                children: createMutation.isPending ? "Creating..." : "Create Fee Structure"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: mode === "delete",
        onOpenChange: (open) => !open && close(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "fee_structure.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-destructive", children: "Delete Fee Structure" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Are you sure you want to delete this fee structure? This cannot be undone." })
          ] }),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm text-foreground", children: [
                selected.category === FeeCategory.Custom ? selected.customCategoryName : selected.category,
                " — ₹",
                Number(selected.amount).toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                selected.paymentPlan,
                " · ",
                selected.academicYear
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: close,
                "data-ocid": "fee_structure.delete.cancel_button",
                disabled: deleteMutation.isPending,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "destructive",
                onClick: handleDelete,
                "data-ocid": "fee_structure.delete.confirm_button",
                disabled: deleteMutation.isPending,
                children: deleteMutation.isPending ? "Deleting..." : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  FeeStructurePage as default
};

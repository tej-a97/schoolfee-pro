import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, J as Presence, K as Primitive, L as useControllableState, M as useComposedRefs, N as composeEventHandlers, O as useSize, Q as createContextScope, R as cn, a as useBills, f as useClasses, k as useStudents, T as useUpdateBillStatus, l as Button, Z as Zap, I as Input, e as BillStatus, X, F as FileText, s as ue, V as useGenerateBills, H as FeeCategory } from "./index-BCwf3qRa.js";
import { P as PageHeader } from "./PageHeader-BUSvgm_1.js";
import { S as StatusBadge } from "./StatusBadge-D_jS0nnP.js";
import { u as usePrevious } from "./index-DQgn1XGa.js";
import { C as Check, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BKCEkiqv.js";
import { L as Label, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./label-C4vysoj5.js";
import { S as Separator } from "./separator-DvwiF-tq.js";
import { S as Skeleton } from "./skeleton-BRKo-KLp.js";
import { C as CircleCheckBig } from "./circle-check-big-wg0BM293.js";
import { E as Eye } from "./eye-7bDwyszU.js";
import { T as Trash2 } from "./trash-2-D4MKv-Pz.js";
import { T as TriangleAlert } from "./triangle-alert-7BobXaSH.js";
import { P as Printer } from "./printer-zjzz7390.js";
import "./chevron-up-KabD4S3q.js";
import "./index-DJcHM0sm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
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
  if (!ts || ts === 0n) return "—";
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function isOverdue(dueDate) {
  return dueDate > 0n && Number(dueDate / 1000000n) < Date.now();
}
function isDueSoon(dueDate) {
  const ms = Number(dueDate / 1000000n);
  const now = Date.now();
  return dueDate > 0n && ms >= now && ms - now <= 3 * 864e5;
}
function getFeeCategoryLabel(cat) {
  const map = {
    [FeeCategory.Tuition]: "Tuition",
    [FeeCategory.Exam]: "Exam",
    [FeeCategory.Admission]: "Admission",
    [FeeCategory.Transport]: "Transport",
    [FeeCategory.Hostel]: "Hostel",
    [FeeCategory.Library]: "Library",
    [FeeCategory.Miscellaneous]: "Miscellaneous",
    [FeeCategory.Custom]: "Custom"
  };
  return map[cat] ?? String(cat);
}
function GenerateBillsDialog({
  open,
  onClose,
  classes
}) {
  const generateBills = useGenerateBills();
  const [classId, setClassId] = reactExports.useState("");
  const [academicYear, setAcademicYear] = reactExports.useState(
    `${(/* @__PURE__ */ new Date()).getFullYear()}-${(/* @__PURE__ */ new Date()).getFullYear() + 1}`
  );
  const [month, setMonth] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 7));
  const [result, setResult] = reactExports.useState(null);
  function handleClose() {
    setClassId("");
    setAcademicYear(
      `${(/* @__PURE__ */ new Date()).getFullYear()}-${(/* @__PURE__ */ new Date()).getFullYear() + 1}`
    );
    setMonth((/* @__PURE__ */ new Date()).toISOString().slice(0, 7));
    setResult(null);
    onClose();
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!classId || !academicYear || !month) return;
    try {
      const bills = await generateBills.mutateAsync({
        classId: BigInt(classId),
        academicYear,
        month
      });
      setResult({
        generated: bills.length,
        skipped: 0
      });
      ue.success(`${bills.length} bills generated successfully`);
    } catch (err) {
      ue.error(String(err));
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-md glass border-border/50",
      "data-ocid": "generate_bills.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Generate Fee Bills" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create monthly fee bills for all students in a class." })
        ] }),
        result ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-8 w-8 text-emerald-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-lg text-foreground", children: [
              result.generated,
              " bills generated successfully"
            ] }),
            result.skipped > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              result.skipped,
              " students skipped (already have bills)"
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gen-class", children: "Class *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: classId, onValueChange: setClassId, required: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "gen-class",
                  className: "bg-card border-border/60",
                  "data-ocid": "generate_bills.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a class" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: classes.map((cls) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SelectItem,
                {
                  value: cls.id.toString(),
                  children: [
                    cls.name,
                    " — ",
                    cls.section,
                    " (",
                    cls.academicYear,
                    ")"
                  ]
                },
                cls.id.toString()
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gen-year", children: "Academic Year *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gen-year",
                "data-ocid": "generate_bills.academic_year.input",
                value: academicYear,
                onChange: (e) => setAcademicYear(e.target.value),
                placeholder: "e.g. 2024-2025",
                className: "bg-card border-border/60",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gen-month", children: "Month *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "gen-month",
                "data-ocid": "generate_bills.month.input",
                type: "month",
                value: month,
                onChange: (e) => setMonth(e.target.value),
                className: "bg-card border-border/60",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: handleClose,
                "data-ocid": "generate_bills.cancel_button",
                className: "border-border/60",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: generateBills.isPending || !classId,
                "data-ocid": "generate_bills.submit_button",
                children: generateBills.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                  "Generating…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "mr-2 h-4 w-4" }),
                  "Generate Bills"
                ] })
              }
            )
          ] })
        ] }),
        result && /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleClose,
            "data-ocid": "generate_bills.close_button",
            children: "Done"
          }
        ) })
      ]
    }
  ) });
}
function BillDetailDialog({
  bill,
  studentName,
  className,
  onClose,
  onMarkPaid
}) {
  const printRef = reactExports.useRef(null);
  function handlePrint() {
    window.print();
  }
  if (!bill) return null;
  const isPaid = bill.status === BillStatus.Paid;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!bill, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-2xl glass border-border/50",
      "data-ocid": "bill_detail.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pr-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-lg", children: [
              "Bill #",
              bill.billNumber
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              studentName,
              " — ",
              className
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: bill.status })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: printRef, className: "print-area", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Bill Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-foreground", children: bill.billNumber })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Month" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: bill.month })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Academic Year" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: bill.academicYear })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Due Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: formatDate(bill.dueDate) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Issue Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: formatDate(bill.createdAt) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground mb-3", children: "Fee Breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-b border-border/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Base Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Discount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Fine" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Net" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/30", children: bill.feeComponents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 5,
                className: "px-3 py-4 text-center text-muted-foreground text-xs",
                children: "No fee components"
              }
            ) }) : bill.feeComponents.map((comp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground", children: getFeeCategoryLabel(comp.category) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right font-mono", children: formatCurrency(comp.amount) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right font-mono text-emerald-400", children: comp.discount > 0n ? `-${formatCurrency(comp.discount)}` : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right font-mono text-red-400", children: comp.fine > 0n ? `+${formatCurrency(comp.fine)}` : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right font-mono font-semibold", children: formatCurrency(
                    comp.amount - comp.discount + comp.fine
                  ) })
                ]
              },
              `${String(comp.category)}-${i}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-t border-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 4,
                  className: "px-3 py-3 text-right font-bold text-foreground text-sm",
                  children: "Total Due"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-bold font-mono text-primary text-base", children: formatCurrency(bill.netAmount) })
            ] }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onClose,
              "data-ocid": "bill_detail.close_button",
              className: "border-border/60",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-2 h-4 w-4" }),
                "Close"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handlePrint,
              "data-ocid": "bill_detail.print_button",
              className: "border-border/60",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "mr-2 h-4 w-4" }),
                "Print Bill"
              ]
            }
          ),
          !isPaid && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: () => onMarkPaid(bill),
              "data-ocid": "bill_detail.mark_paid_button",
              className: "bg-emerald-600 hover:bg-emerald-700 text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-2 h-4 w-4" }),
                "Mark as Paid"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  variant,
  onConfirm,
  onCancel,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onCancel(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-sm glass border-border/50",
      "data-ocid": "confirm.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onCancel,
              "data-ocid": "confirm.cancel_button",
              className: "border-border/60",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: variant ?? "default",
              onClick: onConfirm,
              disabled: loading,
              "data-ocid": "confirm.confirm_button",
              children: [
                loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null,
                confirmLabel
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function PrintableBill({
  bill,
  studentName,
  className
}) {
  if (!bill) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print-only hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 max-w-2xl mx-auto font-body text-[#111]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-b-2 border-[#333] pb-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "SchoolPay ERP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Fee Management System" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "123 School Road, Education City" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "FEE BILL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "Bill #: ",
          bill.billNumber
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "Month: ",
          bill.month
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "Academic Year: ",
          bill.academicYear
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
          "Student: ",
          studentName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "Class: ",
          className
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "Due Date: ",
          formatDate(bill.dueDate)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
          "Issue Date: ",
          formatDate(bill.createdAt)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border border-[#333] text-sm mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-[#f0f0f0]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border border-[#333] px-3 py-2 text-left", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border border-[#333] px-3 py-2 text-right", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border border-[#333] px-3 py-2 text-right", children: "Discount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border border-[#333] px-3 py-2 text-right", children: "Fine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border border-[#333] px-3 py-2 text-right", children: "Net" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bill.feeComponents.map((comp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border border-[#ccc] px-3 py-2", children: getFeeCategoryLabel(comp.category) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border border-[#ccc] px-3 py-2 text-right", children: formatCurrency(comp.amount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border border-[#ccc] px-3 py-2 text-right", children: comp.discount > 0n ? `-${formatCurrency(comp.discount)}` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border border-[#ccc] px-3 py-2 text-right", children: comp.fine > 0n ? `+${formatCurrency(comp.fine)}` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border border-[#ccc] px-3 py-2 text-right font-semibold", children: formatCurrency(comp.amount - comp.discount + comp.fine) })
      ] }, `print-${String(comp.category)}-${i}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-[#f0f0f0] font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 4,
            className: "border border-[#333] px-3 py-2 text-right",
            children: "Total Due"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border border-[#333] px-3 py-2 text-right", children: formatCurrency(bill.netAmount) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: "Payment Instructions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Pay at school office or via UPI/Bank Transfer." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Reference: ",
          bill.billNumber
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 border-2 border-[#333] flex items-center justify-center text-xs text-center", children: "QR Code" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center mt-6 border-t pt-3 text-[#666]", children: "This is a computer-generated bill. No signature required." })
  ] }) });
}
function BillsPage() {
  const [filterClassId, setFilterClassId] = reactExports.useState("");
  const [filterMonth, setFilterMonth] = reactExports.useState("");
  const [filterStatus, setFilterStatus] = reactExports.useState("");
  const [studentSearch, setStudentSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const PAGE_SIZE = 15;
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [showGenerateDialog, setShowGenerateDialog] = reactExports.useState(false);
  const [detailBill, setDetailBill] = reactExports.useState(null);
  const [confirmMarkPaidBill, setConfirmMarkPaidBill] = reactExports.useState(
    null
  );
  const [confirmDeleteIds, setConfirmDeleteIds] = reactExports.useState(
    null
  );
  const [bulkStatusTarget, setBulkStatusTarget] = reactExports.useState(null);
  const billFilter = reactExports.useMemo(
    () => ({
      ...filterClassId ? { classId: BigInt(filterClassId) } : {},
      ...filterMonth ? { month: filterMonth } : {},
      ...filterStatus && filterStatus !== "all" ? { status: filterStatus } : {}
    }),
    [filterClassId, filterMonth, filterStatus]
  );
  const { data: bills = [], isLoading: billsLoading } = useBills(billFilter);
  const { data: classes = [], isLoading: classesLoading } = useClasses();
  const { data: students = [] } = useStudents({});
  const updateBillStatus = useUpdateBillStatus();
  const studentMap = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const s of students) m.set(s.id.toString(), s.name);
    return m;
  }, [students]);
  const classMap = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const c of classes) m.set(c.id.toString(), `${c.name} - ${c.section}`);
    return m;
  }, [classes]);
  const filteredBills = reactExports.useMemo(() => {
    if (!studentSearch.trim()) return bills;
    const q = studentSearch.toLowerCase();
    return bills.filter((b) => {
      const name = studentMap.get(b.studentId.toString()) ?? "";
      return name.toLowerCase().includes(q) || b.billNumber.toLowerCase().includes(q);
    });
  }, [bills, studentSearch, studentMap]);
  const paginatedBills = reactExports.useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredBills.slice(start, start + PAGE_SIZE);
  }, [filteredBills, page]);
  const allOnPageSelected = paginatedBills.length > 0 && paginatedBills.every((b) => selectedIds.has(b.id.toString()));
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
  function toggleRow(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function rowClass(bill) {
    if (bill.status === BillStatus.Overdue || bill.status === BillStatus.Pending && isOverdue(bill.dueDate)) {
      return "bg-red-500/5 hover:bg-red-500/10";
    }
    if (bill.status === BillStatus.Pending && isDueSoon(bill.dueDate)) {
      return "bg-amber-500/5 hover:bg-amber-500/10";
    }
    return "hover:bg-muted/20";
  }
  async function handleMarkPaidConfirm() {
    if (!confirmMarkPaidBill) return;
    try {
      await updateBillStatus.mutateAsync({
        billId: confirmMarkPaidBill.id,
        status: BillStatus.Paid
      });
      ue.success(`Bill #${confirmMarkPaidBill.billNumber} marked as Paid`);
      setConfirmMarkPaidBill(null);
      setDetailBill(null);
    } catch (err) {
      ue.error(String(err));
    }
  }
  async function handleBulkStatusUpdate() {
    if (!bulkStatusTarget || selectedIds.size === 0) return;
    try {
      await Promise.all(
        Array.from(selectedIds).map(
          (id) => updateBillStatus.mutateAsync({
            billId: BigInt(id),
            status: bulkStatusTarget
          })
        )
      );
      ue.success(`${selectedIds.size} bills updated to ${bulkStatusTarget}`);
      setSelectedIds(/* @__PURE__ */ new Set());
      setBulkStatusTarget(null);
    } catch (err) {
      ue.error(String(err));
    }
  }
  const totalPages = Math.ceil(filteredBills.length / PAGE_SIZE);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "bills.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Fee Bills",
        breadcrumbs: [
          { label: "Dashboard", path: "/" },
          { label: "Fee Bills" }
        ],
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => setShowGenerateDialog(true),
            "data-ocid": "bills.generate_bills.open_modal_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "mr-2 h-4 w-4" }),
              "Generate Bills"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Class" }),
          classesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: filterClassId || "all",
              onValueChange: (v) => {
                setFilterClassId(v === "all" ? "" : v);
                setPage(1);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "bg-card border-border/60",
                    "data-ocid": "bills.filter.class.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Classes" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Classes" }),
                  classes.map((cls) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    SelectItem,
                    {
                      value: cls.id.toString(),
                      children: [
                        cls.name,
                        " — ",
                        cls.section
                      ]
                    },
                    cls.id.toString()
                  ))
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Month" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: filterMonth,
              onChange: (e) => {
                setFilterMonth(e.target.value);
                setPage(1);
              },
              className: "bg-card border-border/60",
              "data-ocid": "bills.filter.month.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: filterStatus || "all",
              onValueChange: (v) => {
                setFilterStatus(v === "all" ? "" : v);
                setPage(1);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "bg-card border-border/60",
                    "data-ocid": "bills.filter.status.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Statuses" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BillStatus.Pending, children: "Pending" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BillStatus.Partial_, children: "Partial" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BillStatus.Paid, children: "Paid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BillStatus.Overdue, children: "Overdue" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BillStatus.Cancelled, children: "Cancelled" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Search Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Name or bill number…",
              value: studentSearch,
              onChange: (e) => {
                setStudentSearch(e.target.value);
                setPage(1);
              },
              className: "bg-card border-border/60",
              "data-ocid": "bills.search.input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3 pt-3 border-t border-border/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filteredBills.length }),
          " ",
          filteredBills.length === 1 ? "bill" : "bills",
          " found"
        ] }),
        (filterClassId || filterMonth || filterStatus || studentSearch) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-7 text-xs",
            onClick: () => {
              setFilterClassId("");
              setFilterMonth("");
              setFilterStatus("");
              setStudentSearch("");
              setPage(1);
            },
            "data-ocid": "bills.filter.clear_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-1 h-3 w-3" }),
              "Clear filters"
            ]
          }
        )
      ] })
    ] }),
    selectedIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/30",
        "data-ocid": "bills.bulk_actions.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-primary", children: [
            selectedIds.size,
            " selected"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              onValueChange: (v) => setBulkStatusTarget(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-40 h-8 text-sm bg-card border-border/60",
                    "data-ocid": "bills.bulk_actions.status.select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Change status…" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BillStatus.Paid, children: "Mark Paid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BillStatus.Pending, children: "Mark Pending" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: BillStatus.Cancelled, children: "Mark Cancelled" })
                ] })
              ]
            }
          ),
          bulkStatusTarget && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              className: "h-8",
              onClick: handleBulkStatusUpdate,
              disabled: updateBillStatus.isPending,
              "data-ocid": "bills.bulk_actions.apply_button",
              children: [
                updateBillStatus.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-1.5 h-3 w-3" }),
                "Apply"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-8 ml-auto text-muted-foreground hover:text-foreground",
              onClick: () => {
                setSelectedIds(/* @__PURE__ */ new Set());
                setBulkStatusTarget(null);
              },
              "data-ocid": "bills.bulk_actions.clear_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border/50 overflow-hidden bg-card",
        "data-ocid": "bills.table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50 bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: allOnPageSelected,
                  onCheckedChange: toggleAll,
                  "aria-label": "Select all",
                  "data-ocid": "bills.select_all.checkbox"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Bill #" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Student" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Class" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Month" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Net Due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Due Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/30", children: billsLoading ? Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: Array.from({ length: 10 }, (_, j) => `cell-${j}`).map(
              (cellKey) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, cellKey)
            ) }, key)) : paginatedBills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                colSpan: 10,
                className: "px-4 py-16 text-center",
                "data-ocid": "bills.table.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No bills found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try adjusting filters or generate new bills" })
                ] })
              }
            ) }) : paginatedBills.map((bill, idx) => {
              const sid = bill.id.toString();
              const studentName = studentMap.get(bill.studentId.toString()) ?? "Unknown";
              const classLabel = classMap.get(bill.classId.toString()) ?? `Class ${bill.classId}`;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  "data-ocid": `bills.table.item.${idx + 1}`,
                  className: cn("transition-colors", rowClass(bill)),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        checked: selectedIds.has(sid),
                        onCheckedChange: () => toggleRow(sid),
                        "aria-label": `Select bill ${bill.billNumber}`,
                        "data-ocid": `bills.table.checkbox.${idx + 1}`
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs font-semibold text-primary", children: bill.billNumber }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: studentName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: classLabel }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: bill.month }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono", children: formatCurrency(bill.totalAmount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-semibold text-foreground", children: formatCurrency(bill.netAmount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: formatDate(bill.dueDate) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: bill.status, size: "sm" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "sm",
                          className: "h-7 w-7 p-0 text-muted-foreground hover:text-primary",
                          onClick: () => setDetailBill(bill),
                          "aria-label": "View bill details",
                          "data-ocid": `bills.table.view_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                        }
                      ),
                      bill.status !== BillStatus.Paid && bill.status !== BillStatus.Cancelled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "sm",
                          className: "h-7 w-7 p-0 text-muted-foreground hover:text-emerald-400",
                          onClick: () => setConfirmMarkPaidBill(bill),
                          "aria-label": "Mark as paid",
                          "data-ocid": `bills.table.mark_paid_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "sm",
                          className: "h-7 w-7 p-0 text-muted-foreground hover:text-destructive",
                          onClick: () => setConfirmDeleteIds([bill.id]),
                          "aria-label": "Delete bill",
                          "data-ocid": `bills.table.delete_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                        }
                      )
                    ] }) })
                  ]
                },
                sid
              );
            }) })
          ] }) }),
          totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Showing",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                (page - 1) * PAGE_SIZE + 1,
                "–",
                Math.min(page * PAGE_SIZE, filteredBills.length)
              ] }),
              " ",
              "of",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filteredBills.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  disabled: page <= 1,
                  onClick: () => setPage((p) => p - 1),
                  className: "border-border/60",
                  "data-ocid": "bills.table.pagination_prev",
                  children: "Previous"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                page,
                " / ",
                totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  disabled: page >= totalPages,
                  onClick: () => setPage((p) => p + 1),
                  className: "border-border/60",
                  "data-ocid": "bills.table.pagination_next",
                  children: "Next"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded bg-red-500/20 border border-red-500/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Overdue" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded bg-amber-500/20 border border-amber-500/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Due within 3 days" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3 ml-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Color-coded rows indicate urgency" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PrintableBill,
      {
        bill: detailBill,
        studentName: detailBill ? studentMap.get(detailBill.studentId.toString()) ?? "Unknown" : "",
        className: detailBill ? classMap.get(detailBill.classId.toString()) ?? "" : ""
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GenerateBillsDialog,
      {
        open: showGenerateDialog,
        onClose: () => setShowGenerateDialog(false),
        classes
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BillDetailDialog,
      {
        bill: detailBill,
        studentName: detailBill ? studentMap.get(detailBill.studentId.toString()) ?? "Unknown" : "",
        className: detailBill ? classMap.get(detailBill.classId.toString()) ?? "" : "",
        onClose: () => setDetailBill(null),
        onMarkPaid: (b) => {
          setConfirmMarkPaidBill(b);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!confirmMarkPaidBill,
        title: "Mark Bill as Paid",
        description: `Are you sure you want to mark bill #${confirmMarkPaidBill == null ? void 0 : confirmMarkPaidBill.billNumber} as Paid? This action cannot be undone easily.`,
        confirmLabel: "Mark Paid",
        onConfirm: handleMarkPaidConfirm,
        onCancel: () => setConfirmMarkPaidBill(null),
        loading: updateBillStatus.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: !!confirmDeleteIds,
        title: "Delete Bill",
        description: "This bill will be permanently deleted. This action cannot be undone.",
        confirmLabel: "Delete",
        variant: "destructive",
        onConfirm: () => {
          ue.info("Delete functionality coming soon.");
          setConfirmDeleteIds(null);
        },
        onCancel: () => setConfirmDeleteIds(null)
      }
    )
  ] });
}
export {
  BillsPage as default
};

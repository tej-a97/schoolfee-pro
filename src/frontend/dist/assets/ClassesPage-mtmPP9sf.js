import { c as createLucideIcon, f as useClasses, x as useAddClass, y as useUpdateClass, z as useDeleteClass, r as reactExports, j as jsxRuntimeExports, l as Button, s as ue, B as Badge, U as Users, I as Input } from "./index-BCwf3qRa.js";
import { P as PageHeader } from "./PageHeader-BUSvgm_1.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter, L as Label } from "./label-C4vysoj5.js";
import { S as Skeleton } from "./skeleton-BRKo-KLp.js";
import { P as Plus } from "./plus-_bN1kOQl.js";
import { T as Trash2 } from "./trash-2-D4MKv-Pz.js";
import { P as Pencil } from "./pencil-CbJvMtL6.js";
import "./index-DJcHM0sm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode);
const ACADEMIC_YEAR = `${(/* @__PURE__ */ new Date()).getFullYear()}-${(/* @__PURE__ */ new Date()).getFullYear() + 1}`;
const DEFAULT_FORM = {
  name: "",
  section: "",
  academicYear: ACADEMIC_YEAR,
  capacity: "40"
};
function ClassCard({
  cls,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:bg-card/90 transition-smooth group",
      "data-ocid": `classes.card.${cls.id.toString()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground font-display", children: cls.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs bg-primary/10 text-primary border-primary/20",
                  children: cls.section
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
                Number(cls.studentCount),
                "/",
                Number(cls.capacity),
                " students"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: cls.academicYear })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-7 w-7 p-0 hover:bg-amber-500/10 hover:text-amber-400",
              onClick: () => onEdit(cls),
              "data-ocid": `classes.edit_button.${cls.id.toString()}`,
              "aria-label": `Edit ${cls.name}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive",
              onClick: () => onDelete(cls),
              "data-ocid": `classes.delete_button.${cls.id.toString()}`,
              "aria-label": `Delete ${cls.name}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
            }
          )
        ] })
      ]
    }
  );
}
function ClassForm({
  form,
  errors,
  onChange,
  onSubmit,
  isSubmitting,
  submitLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cls-name", children: [
          "Class Name ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "cls-name",
            "data-ocid": "classes.form.name",
            value: form.name,
            onChange: (e) => onChange("name", e.target.value),
            placeholder: "e.g. Class 10"
          }
        ),
        errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            "data-ocid": "classes.form.name_error",
            className: "text-xs text-destructive",
            children: errors.name
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cls-section", children: [
          "Section ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "cls-section",
            "data-ocid": "classes.form.section",
            value: form.section,
            onChange: (e) => onChange("section", e.target.value),
            placeholder: "e.g. A"
          }
        ),
        errors.section && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            "data-ocid": "classes.form.section_error",
            className: "text-xs text-destructive",
            children: errors.section
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cls-year", children: "Academic Year" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "cls-year",
            "data-ocid": "classes.form.academic_year",
            value: form.academicYear,
            onChange: (e) => onChange("academicYear", e.target.value),
            placeholder: ACADEMIC_YEAR
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cls-cap", children: "Capacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "cls-cap",
            type: "number",
            min: "1",
            "data-ocid": "classes.form.capacity",
            value: form.capacity,
            onChange: (e) => onChange("capacity", e.target.value),
            placeholder: "40"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        "data-ocid": "classes.form.submit_button",
        disabled: isSubmitting,
        onClick: onSubmit,
        className: "w-full sm:w-auto",
        children: isSubmitting ? "Saving..." : submitLabel
      }
    ) })
  ] });
}
function ClassesPage() {
  const { data: classes, isLoading } = useClasses(void 0);
  const addMutation = useAddClass();
  const updateMutation = useUpdateClass();
  const deleteMutation = useDeleteClass();
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
    if (!form.name.trim()) errs.name = "Class name is required";
    if (!form.section.trim()) errs.section = "Section is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const buildInput = () => ({
    name: form.name.trim(),
    section: form.section.trim(),
    academicYear: form.academicYear.trim() || ACADEMIC_YEAR,
    capacity: BigInt(Number(form.capacity) || 40)
  });
  const openAdd = () => {
    setForm(DEFAULT_FORM);
    setErrors({});
    setMode("add");
  };
  const openEdit = (cls) => {
    setSelected(cls);
    setForm({
      name: cls.name,
      section: cls.section,
      academicYear: cls.academicYear,
      capacity: Number(cls.capacity).toString()
    });
    setErrors({});
    setMode("edit");
  };
  const openDelete = (cls) => {
    setSelected(cls);
    setMode("delete");
  };
  const close = () => {
    setMode(null);
    setSelected(null);
  };
  const handleAdd = async () => {
    if (!validate()) return;
    try {
      await addMutation.mutateAsync(buildInput());
      ue.success("Class added successfully!");
      close();
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to add class");
    }
  };
  const handleUpdate = async () => {
    if (!selected || !validate()) return;
    try {
      await updateMutation.mutateAsync({
        id: selected.id,
        input: buildInput()
      });
      ue.success("Class updated successfully!");
      close();
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to update class"
      );
    }
  };
  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteMutation.mutateAsync(selected.id);
      ue.success("Class deleted successfully!");
      close();
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to delete class"
      );
    }
  };
  const classList = classes ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "classes.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Classes",
        subtitle: `${classList.length} class${classList.length !== 1 ? "es" : ""} configured`,
        breadcrumbs: [{ label: "Classes" }],
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "classes.add_button",
            onClick: openAdd,
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Add Class"
            ]
          }
        )
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "classes.loading_state", children: Array.from({ length: 5 }, (_, i) => `sk-cls-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, k)) }) : classList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4 rounded-xl border border-dashed border-border/50 bg-card",
        "data-ocid": "classes.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold font-display text-foreground", children: "No classes yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Add your first class to get started" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: openAdd,
              "data-ocid": "classes.empty_add_button",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                " Add First Class"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: classList.map((cls) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ClassCard,
      {
        cls,
        onEdit: openEdit,
        onDelete: openDelete
      },
      cls.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: mode === "add", onOpenChange: (open) => !open && close(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "classes.add.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Add New Class" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Configure a class and section for your school." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ClassForm,
        {
          form,
          errors,
          onChange: changeField,
          onSubmit: handleAdd,
          isSubmitting: addMutation.isPending,
          submitLabel: "Add Class"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: mode === "edit", onOpenChange: (open) => !open && close(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "classes.edit.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Class" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update class details below." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ClassForm,
        {
          form,
          errors,
          onChange: changeField,
          onSubmit: handleUpdate,
          isSubmitting: updateMutation.isPending,
          submitLabel: "Save Changes"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: mode === "delete",
        onOpenChange: (open) => !open && close(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "classes.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-destructive", children: "Delete Class" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "Are you sure you want to delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                selected == null ? void 0 : selected.name,
                " — ",
                selected == null ? void 0 : selected.section
              ] }),
              "? This cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm text-foreground", children: [
                selected == null ? void 0 : selected.name,
                " — ",
                selected == null ? void 0 : selected.section
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: selected == null ? void 0 : selected.academicYear })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: close,
                "data-ocid": "classes.delete.cancel_button",
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
                "data-ocid": "classes.delete.confirm_button",
                disabled: deleteMutation.isPending,
                children: deleteMutation.isPending ? "Deleting..." : "Delete Class"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  ClassesPage as default
};

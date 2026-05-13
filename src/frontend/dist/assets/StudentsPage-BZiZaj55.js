import { c as createLucideIcon, r as reactExports, f as useClasses, g as useAddStudent, h as useUpdateStudent, i as useDeleteStudent, k as useStudents, j as jsxRuntimeExports, l as Button, S as Search, I as Input, G as GraduationCap, m as Sheet, n as SheetContent, o as SheetHeader, p as SheetTitle, q as SheetDescription, s as ue, t as useStudent, a as useBills, v as User, U as Users, w as SheetFooter } from "./index-BCwf3qRa.js";
import { D as DataTable } from "./DataTable-DMDGT477.js";
import { P as PageHeader } from "./PageHeader-BUSvgm_1.js";
import { S as StatusBadge } from "./StatusBadge-D_jS0nnP.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter, L as Label } from "./label-C4vysoj5.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BKCEkiqv.js";
import { S as Separator } from "./separator-DvwiF-tq.js";
import { S as Skeleton } from "./skeleton-BRKo-KLp.js";
import { T as Textarea } from "./textarea-C36GBQna.js";
import { P as Plus } from "./plus-_bN1kOQl.js";
import { P as Pencil } from "./pencil-CbJvMtL6.js";
import { T as Trash2 } from "./trash-2-D4MKv-Pz.js";
import { E as Eye } from "./eye-7bDwyszU.js";
import { C as Calendar } from "./calendar-CrBH3V74.js";
import { M as Mail } from "./mail-9F5fMpuP.js";
import "./chevron-up-KabD4S3q.js";
import "./index-DJcHM0sm.js";
import "./index-DQgn1XGa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$2);
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
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
const PAGE_SIZE = 20;
const ACADEMIC_YEAR = `${(/* @__PURE__ */ new Date()).getFullYear()}-${(/* @__PURE__ */ new Date()).getFullYear() + 1}`;
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function StudentAvatar({
  name,
  photoUrl,
  size = "sm"
}) {
  const dim = size === "lg" ? "h-16 w-16 text-xl" : "h-8 w-8 text-xs";
  if (photoUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: photoUrl,
        alt: name,
        className: `${dim} rounded-full object-cover border border-border/50`
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `${dim} rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center font-semibold text-primary`,
      children: getInitials(name)
    }
  );
}
function StudentProfile({ studentId }) {
  const { data: student, isLoading } = useStudent(studentId);
  const { data: bills } = useBills({ studentId });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }, k)) });
  }
  if (!student)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Student not found." });
  const recentBills = (bills ?? []).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StudentAvatar,
        {
          name: student.name,
          photoUrl: student.photoUrl || void 0,
          size: "lg"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold font-display text-foreground", children: student.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: student.admissionNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: student.status }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-3.5 w-3.5" }),
          label: "Roll No",
          value: student.rollNumber || "—"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
          label: "Date of Birth",
          value: student.dob || "—"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }),
          label: "Gender",
          value: student.gender || "—"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InfoRow,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5" }),
          label: "Academic Year",
          value: student.academicYear
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: "Parent / Guardian" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
            label: "Name",
            value: student.parentName
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
            label: "Phone",
            value: student.parentPhone
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
            label: "Email",
            value: student.parentEmail
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            label: "Address",
            value: student.address || "—"
          }
        )
      ] })
    ] }),
    recentBills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "Recent Fee Bills" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border/50 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-b border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-medium text-muted-foreground", children: "Bill #" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-medium text-muted-foreground", children: "Month" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right font-medium text-muted-foreground", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-center font-medium text-muted-foreground", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/30", children: recentBills.map((bill) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground font-mono", children: bill.billNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: bill.month }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 text-right font-medium text-foreground", children: [
              "₹",
              Number(bill.netAmount).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: bill.status, size: "sm" }) })
          ] }, bill.billNumber)) })
        ] }) })
      ] })
    ] })
  ] });
}
function InfoRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-muted-foreground", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground w-24 shrink-0", children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium break-words min-w-0", children: value })
  ] });
}
function StudentForm({
  initial,
  onSubmit,
  isSubmitting,
  classes
}) {
  var _a;
  const [form, setForm] = reactExports.useState(
    () => ({
      name: "",
      admissionNumber: "",
      rollNumber: "",
      dob: "",
      gender: "Male",
      classId: 0n,
      sectionId: 0n,
      academicYear: ACADEMIC_YEAR,
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      address: "",
      photoUrl: "",
      status: "Active",
      ...initial
    })
  );
  const [errors, setErrors] = reactExports.useState({});
  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };
  const validate = () => {
    var _a2, _b, _c, _d;
    const errs = {};
    if (!((_a2 = form.name) == null ? void 0 : _a2.trim())) errs.name = "Full name is required";
    if (!((_b = form.parentName) == null ? void 0 : _b.trim())) errs.parentName = "Parent name is required";
    if (!((_c = form.parentEmail) == null ? void 0 : _c.trim()))
      errs.parentEmail = "Parent email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.parentEmail))
      errs.parentEmail = "Invalid email address";
    if (!((_d = form.parentPhone) == null ? void 0 : _d.trim()))
      errs.parentPhone = "Parent phone is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      name: form.name ?? "",
      admissionNumber: form.admissionNumber ?? "",
      rollNumber: form.rollNumber ?? "",
      dob: form.dob ?? "",
      gender: form.gender ?? "Male",
      classId: form.classId ?? 0n,
      sectionId: form.sectionId ?? 0n,
      academicYear: form.academicYear ?? ACADEMIC_YEAR,
      parentName: form.parentName ?? "",
      parentEmail: form.parentEmail ?? "",
      parentPhone: form.parentPhone ?? "",
      address: form.address ?? "",
      photoUrl: form.photoUrl ?? ""
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)] pr-1",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-1", children: "Student Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "s-name", children: [
                "Full Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "s-name",
                  "data-ocid": "student.form.name",
                  value: form.name ?? "",
                  onChange: (e) => set("name", e.target.value),
                  placeholder: "e.g. Arjun Sharma"
                }
              ),
              errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "student.form.name_error",
                  className: "text-xs text-destructive",
                  children: errors.name
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "s-adm", children: "Admission Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "s-adm",
                  "data-ocid": "student.form.admission_number",
                  value: form.admissionNumber ?? "",
                  onChange: (e) => set("admissionNumber", e.target.value),
                  placeholder: "Auto-generated if empty"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "s-roll", children: "Roll Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "s-roll",
                  "data-ocid": "student.form.roll_number",
                  value: form.rollNumber ?? "",
                  onChange: (e) => set("rollNumber", e.target.value),
                  placeholder: "e.g. 42"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "s-dob", children: "Date of Birth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "s-dob",
                  type: "date",
                  "data-ocid": "student.form.dob",
                  value: form.dob ?? "",
                  onChange: (e) => set("dob", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "s-gender", children: "Gender" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.gender ?? "Male",
                  onValueChange: (v) => set("gender", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "s-gender", "data-ocid": "student.form.gender", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select gender" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Male", children: "Male" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Female", children: "Female" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Other", children: "Other" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "s-class", children: "Class" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: ((_a = form.classId) == null ? void 0 : _a.toString()) ?? "0",
                  onValueChange: (v) => set("classId", BigInt(v)),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "s-class", "data-ocid": "student.form.class", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select class" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "0", children: "Select a class" }),
                      classes.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id.toString(), children: [
                        c.name,
                        " — ",
                        c.section
                      ] }, c.id.toString()))
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "s-ay", children: "Academic Year" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "s-ay",
                  "data-ocid": "student.form.academic_year",
                  value: form.academicYear ?? ACADEMIC_YEAR,
                  onChange: (e) => set("academicYear", e.target.value),
                  placeholder: ACADEMIC_YEAR
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "s-status", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.status ?? "Active",
                  onValueChange: (v) => set("status", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "s-status", "data-ocid": "student.form.status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Active", children: "Active" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Inactive", children: "Inactive" })
                    ] })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-1", children: "Parent / Guardian Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "s-pname", children: [
                "Parent Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "s-pname",
                  "data-ocid": "student.form.parent_name",
                  value: form.parentName ?? "",
                  onChange: (e) => set("parentName", e.target.value),
                  placeholder: "e.g. Rajesh Sharma"
                }
              ),
              errors.parentName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "student.form.parent_name_error",
                  className: "text-xs text-destructive",
                  children: errors.parentName
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "s-pemail", children: [
                "Parent Email ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "s-pemail",
                  type: "email",
                  "data-ocid": "student.form.parent_email",
                  value: form.parentEmail ?? "",
                  onChange: (e) => set("parentEmail", e.target.value),
                  placeholder: "parent@email.com"
                }
              ),
              errors.parentEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "student.form.parent_email_error",
                  className: "text-xs text-destructive",
                  children: errors.parentEmail
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "s-pphone", children: [
                "Parent Phone ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "s-pphone",
                  "data-ocid": "student.form.parent_phone",
                  value: form.parentPhone ?? "",
                  onChange: (e) => set("parentPhone", e.target.value),
                  placeholder: "+91 98765 43210"
                }
              ),
              errors.parentPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "student.form.parent_phone_error",
                  className: "text-xs text-destructive",
                  children: errors.parentPhone
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "s-addr", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "s-addr",
                  "data-ocid": "student.form.address",
                  value: form.address ?? "",
                  onChange: (e) => set("address", e.target.value),
                  placeholder: "Full residential address",
                  rows: 2,
                  className: "resize-none"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetFooter, { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "student.form.submit_button",
            disabled: isSubmitting,
            className: "w-full",
            children: isSubmitting ? "Saving..." : (initial == null ? void 0 : initial.name) ? "Update Student" : "Add Student"
          }
        ) })
      ]
    }
  );
}
function StudentsPage() {
  const [page, setPage] = reactExports.useState(1);
  const [search, setSearch] = reactExports.useState("");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const [classFilter, setClassFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [academicYearFilter, setAcademicYearFilter] = reactExports.useState(ACADEMIC_YEAR);
  const [searchTimer, setSearchTimer] = reactExports.useState(null);
  const [mode, setMode] = reactExports.useState(null);
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [selectedStudent, setSelectedStudent] = reactExports.useState(null);
  const { data: classes } = useClasses();
  const addMutation = useAddStudent();
  const updateMutation = useUpdateStudent();
  const deleteMutation = useDeleteStudent();
  const handleSearchChange = reactExports.useCallback(
    (value) => {
      setSearch(value);
      if (searchTimer) clearTimeout(searchTimer);
      const t = setTimeout(() => setDebouncedSearch(value), 300);
      setSearchTimer(t);
    },
    [searchTimer]
  );
  const filter = reactExports.useMemo(
    () => ({
      ...debouncedSearch ? { searchTerm: debouncedSearch } : {},
      ...classFilter !== "all" ? { classId: BigInt(classFilter) } : {},
      ...statusFilter !== "all" ? { status: statusFilter } : {},
      ...academicYearFilter ? { academicYear: academicYearFilter } : {}
    }),
    [debouncedSearch, classFilter, statusFilter, academicYearFilter]
  );
  const { data: students, isLoading } = useStudents(filter);
  const paginatedStudents = reactExports.useMemo(() => {
    const all = students ?? [];
    const start = (page - 1) * PAGE_SIZE;
    return all.slice(start, start + PAGE_SIZE);
  }, [students, page]);
  const openView = (student) => {
    setSelectedId(student.id);
    setSelectedStudent(student);
    setMode("view");
  };
  const openEdit = (student) => {
    setSelectedId(student.id);
    setSelectedStudent(student);
    setMode("edit");
  };
  const openDelete = (student) => {
    setSelectedId(student.id);
    setSelectedStudent(student);
    setMode("delete");
  };
  const closeModal = () => {
    setMode(null);
    setSelectedId(null);
    setSelectedStudent(null);
  };
  const handleAdd = async (input) => {
    await addMutation.mutateAsync(input);
    ue.success("Student added successfully!");
    closeModal();
  };
  const handleUpdate = async (input) => {
    if (!selectedId) return;
    await updateMutation.mutateAsync({ id: selectedId, input });
    ue.success("Student updated successfully!");
    closeModal();
  };
  const handleDelete = async () => {
    if (!selectedId) return;
    await deleteMutation.mutateAsync(selectedId);
    ue.success("Student deleted successfully!");
    closeModal();
  };
  const getClassName = (classId) => {
    const cls = (classes ?? []).find((c) => c.id === classId);
    return cls ? `${cls.name} — ${cls.section}` : "—";
  };
  const columns = [
    {
      key: "name",
      label: "Name / Photo",
      render: (_v, row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-2.5 hover:opacity-80 transition-opacity text-left",
          onClick: () => openView(row),
          "data-ocid": "student.name.link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StudentAvatar,
              {
                name: row.name,
                photoUrl: row.photoUrl || void 0
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm truncate max-w-[120px]", children: row.name })
          ]
        }
      )
    },
    { key: "admissionNumber", label: "Admission No", sortable: true },
    {
      key: "classId",
      label: "Class / Section",
      render: (_v, row) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: getClassName(row.classId) })
    },
    { key: "rollNumber", label: "Roll No", sortable: true },
    { key: "parentName", label: "Parent Name", sortable: true },
    { key: "parentPhone", label: "Parent Phone" },
    {
      key: "status",
      label: "Status",
      render: (_v, row) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: row.status })
    },
    {
      key: "id",
      label: "Actions",
      align: "center",
      render: (_v, row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary",
            onClick: (e) => {
              e.stopPropagation();
              openView(row);
            },
            "data-ocid": "student.view_button",
            "aria-label": "View student",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-7 w-7 p-0 hover:bg-amber-500/10 hover:text-amber-500",
            onClick: (e) => {
              e.stopPropagation();
              openEdit(row);
            },
            "data-ocid": "student.edit_button",
            "aria-label": "Edit student",
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
            onClick: (e) => {
              e.stopPropagation();
              openDelete(row);
            },
            "data-ocid": "student.delete_button",
            "aria-label": "Delete student",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
          }
        )
      ] })
    }
  ];
  const totalCount = (students == null ? void 0 : students.length) ?? 0;
  const isEmptyWithNoFilters = !isLoading && (students ?? []).length === 0 && !debouncedSearch && classFilter === "all" && statusFilter === "all";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "students.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Students",
        subtitle: totalCount > 0 ? `${totalCount} student${totalCount !== 1 ? "s" : ""} enrolled` : void 0,
        breadcrumbs: [{ label: "Students" }],
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => setMode("add"),
            "data-ocid": "students.add_button",
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Add Student"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "students.search_input",
            value: search,
            onChange: (e) => handleSearchChange(e.target.value),
            placeholder: "Search name, admission no., roll no...",
            className: "pl-9 bg-background border-border/60 focus:border-primary/50"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: classFilter,
          onValueChange: (v) => {
            setClassFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "students.class_filter",
                className: "w-[160px] bg-background border-border/60",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Classes" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Classes" }),
              (classes ?? []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id.toString(), children: [
                c.name,
                " — ",
                c.section
              ] }, c.id.toString()))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: statusFilter,
          onValueChange: (v) => {
            setStatusFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "students.status_filter",
                className: "w-[140px] bg-background border-border/60",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Status" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Active", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Inactive", children: "Inactive" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: academicYearFilter,
          onValueChange: (v) => {
            setAcademicYearFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "students.year_filter",
                className: "w-[150px] bg-background border-border/60",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Academic Year" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ACADEMIC_YEAR, children: ACADEMIC_YEAR }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectItem,
                {
                  value: `${(/* @__PURE__ */ new Date()).getFullYear() - 1}-${(/* @__PURE__ */ new Date()).getFullYear()}`,
                  children: `${(/* @__PURE__ */ new Date()).getFullYear() - 1}-${(/* @__PURE__ */ new Date()).getFullYear()}`
                }
              )
            ] })
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-xl border border-border/50 bg-card overflow-hidden",
        "data-ocid": "students.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: Array.from({ length: 5 }, (_, i) => `sk-row-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
        ] }, k)) })
      }
    ) : isEmptyWithNoFilters ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4 rounded-xl border border-dashed border-border/50 bg-card",
        "data-ocid": "students.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold font-display text-foreground", children: "No students yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Add your first student to get started" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: () => setMode("add"),
              "data-ocid": "students.empty_add_button",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                "Add First Student"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        "data-ocid": "students.table",
        columns,
        data: paginatedStudents,
        loading: isLoading,
        totalCount,
        page,
        pageSize: PAGE_SIZE,
        onPageChange: setPage,
        rowKey: (row) => String(row.id),
        onRowClick: (row) => openView(row),
        emptyMessage: "No students match your filters"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: mode === "view",
        onOpenChange: (open) => !open && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-lg max-h-[90vh] overflow-hidden flex flex-col",
            "data-ocid": "student.view.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Student Profile" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Full student details and fee history" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: selectedId && /* @__PURE__ */ jsxRuntimeExports.jsx(StudentProfile, { studentId: selectedId }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-4 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => {
                      closeModal();
                      if (selectedStudent) openEdit(selectedStudent);
                    },
                    "data-ocid": "student.view.edit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5 mr-1.5" }),
                      " Edit Student"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    onClick: closeModal,
                    "data-ocid": "student.view.close_button",
                    children: "Close"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Sheet,
      {
        open: mode === "add",
        onOpenChange: (open) => !open && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SheetContent,
          {
            side: "right",
            className: "w-full sm:max-w-lg",
            "data-ocid": "student.add.sheet",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display", children: "Add New Student" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Fill in student details to enroll them in the system." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StudentForm,
                {
                  classes: classes ?? [],
                  onSubmit: handleAdd,
                  isSubmitting: addMutation.isPending
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Sheet,
      {
        open: mode === "edit",
        onOpenChange: (open) => !open && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SheetContent,
          {
            side: "right",
            className: "w-full sm:max-w-lg",
            "data-ocid": "student.edit.sheet",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display", children: "Edit Student" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Update student information below." })
              ] }),
              selectedStudent && /* @__PURE__ */ jsxRuntimeExports.jsx(
                StudentForm,
                {
                  initial: {
                    name: selectedStudent.name,
                    admissionNumber: selectedStudent.admissionNumber,
                    rollNumber: selectedStudent.rollNumber,
                    dob: selectedStudent.dob,
                    gender: selectedStudent.gender,
                    classId: selectedStudent.classId,
                    sectionId: selectedStudent.sectionId,
                    academicYear: selectedStudent.academicYear,
                    parentName: selectedStudent.parentName,
                    parentEmail: selectedStudent.parentEmail,
                    parentPhone: selectedStudent.parentPhone,
                    address: selectedStudent.address,
                    photoUrl: selectedStudent.photoUrl,
                    status: selectedStudent.status
                  },
                  classes: classes ?? [],
                  onSubmit: handleUpdate,
                  isSubmitting: updateMutation.isPending
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: mode === "delete",
        onOpenChange: (open) => !open && closeModal(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "student.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-destructive", children: "Delete Student" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "Are you sure you want to delete",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: selectedStudent == null ? void 0 : selectedStudent.name }),
              "? This action cannot be undone and will remove all associated records."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: selectedStudent == null ? void 0 : selectedStudent.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: selectedStudent == null ? void 0 : selectedStudent.admissionNumber })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: closeModal,
                "data-ocid": "student.delete.cancel_button",
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
                "data-ocid": "student.delete.confirm_button",
                disabled: deleteMutation.isPending,
                children: deleteMutation.isPending ? "Deleting..." : "Delete Student"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  StudentsPage as default
};

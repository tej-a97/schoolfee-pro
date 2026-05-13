import { FeeCategory, PaymentPlan } from "@/backend";
import type { FeeStructureInput } from "@/backend";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useClasses,
  useCreateFeeStructure,
  useDeleteFeeStructure,
  useFeeStructures,
} from "@/hooks/useBackend";
import type { FeeStructure, FeeStructureId } from "@/types";
import {
  Calendar,
  IndianRupee,
  Layers,
  Percent,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ACADEMIC_YEAR = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

const FEE_CATEGORIES = Object.values(FeeCategory);
const PAYMENT_PLANS = Object.values(PaymentPlan);

type ModalMode = "add" | "delete" | null;

interface FeeFormState {
  classId: string;
  category: FeeCategory;
  customCategoryName: string;
  amount: string;
  paymentPlan: PaymentPlan;
  dueDayOfMonth: string;
  fineRatePercent: string;
  discountPercent: string;
  academicYear: string;
}

const DEFAULT_FORM: FeeFormState = {
  classId: "0",
  category: FeeCategory.Tuition,
  customCategoryName: "",
  amount: "",
  paymentPlan: PaymentPlan.Monthly,
  dueDayOfMonth: "10",
  fineRatePercent: "0",
  discountPercent: "0",
  academicYear: ACADEMIC_YEAR,
};

function categoryColor(cat: FeeCategory) {
  const map: Record<FeeCategory, string> = {
    [FeeCategory.Tuition]:
      "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
    [FeeCategory.Admission]:
      "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    [FeeCategory.Exam]: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    [FeeCategory.Transport]: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    [FeeCategory.Hostel]:
      "bg-purple-500/15 text-purple-400 border-purple-500/25",
    [FeeCategory.Library]: "bg-pink-500/15 text-pink-400 border-pink-500/25",
    [FeeCategory.Miscellaneous]: "bg-muted text-muted-foreground border-border",
    [FeeCategory.Custom]: "bg-muted text-muted-foreground border-border",
  };
  return map[cat] ?? "bg-muted text-muted-foreground border-border";
}

function FeeStructureCard({
  fs,
  className: clsName,
  onDelete,
}: {
  fs: FeeStructure;
  className: string;
  onDelete: (fs: FeeStructure) => void;
}) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-smooth group"
      data-ocid={`fee_structure.card.${fs.id.toString()}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Layers className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-foreground font-display">
              {clsName}
            </span>
            <Badge
              variant="outline"
              className={`text-xs border ${categoryColor(fs.category)}`}
            >
              {fs.category === FeeCategory.Custom
                ? fs.customCategoryName || "Custom"
                : fs.category}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs bg-muted text-muted-foreground border-border"
            >
              {fs.paymentPlan}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-1">
            <span className="text-sm font-bold text-foreground flex items-center gap-0.5">
              <IndianRupee className="h-3.5 w-3.5" />
              {Number(fs.amount).toLocaleString()}
            </span>
            {Number(fs.fineRatePercent) > 0 && (
              <span className="text-xs text-red-400 flex items-center gap-0.5">
                <Percent className="h-3 w-3" />
                {Number(fs.fineRatePercent)}% fine
              </span>
            )}
            {Number(fs.discountPercent) > 0 && (
              <span className="text-xs text-emerald-400 flex items-center gap-0.5">
                <Percent className="h-3 w-3" />
                {Number(fs.discountPercent)}% discount
              </span>
            )}
            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
              <Calendar className="h-3 w-3" />
              Due day {Number(fs.dueDayOfMonth)}
            </span>
          </div>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-smooth"
        onClick={() => onDelete(fs)}
        data-ocid={`fee_structure.delete_button.${fs.id.toString()}`}
        aria-label="Delete fee structure"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

export default function FeeStructurePage() {
  const { data: feeStructures, isLoading } = useFeeStructures(
    undefined,
    undefined,
  );
  const { data: classes } = useClasses(undefined);
  const createMutation = useCreateFeeStructure();
  const deleteMutation = useDeleteFeeStructure();

  const [mode, setMode] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<FeeStructure | null>(null);
  const [form, setForm] = useState<FeeFormState>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const changeField = (
    field: keyof FeeFormState,
    value: string | FeeCategory | PaymentPlan,
  ) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (form.classId === "0") errs.classId = "Please select a class";
    if (!form.amount || Number(form.amount) <= 0)
      errs.amount = "Amount must be greater than 0";
    if (form.category === FeeCategory.Custom && !form.customCategoryName.trim())
      errs.customCategoryName = "Custom category name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildInput = (): FeeStructureInput => ({
    classId: BigInt(form.classId),
    category: form.category,
    customCategoryName: form.customCategoryName,
    amount: BigInt(Math.round(Number(form.amount) * 100)),
    paymentPlan: form.paymentPlan,
    dueDayOfMonth: BigInt(Number(form.dueDayOfMonth) || 10),
    fineRatePercent: BigInt(Number(form.fineRatePercent) || 0),
    discountPercent: BigInt(Number(form.discountPercent) || 0),
    academicYear: form.academicYear || ACADEMIC_YEAR,
  });

  const openAdd = () => {
    setForm(DEFAULT_FORM);
    setErrors({});
    setMode("add");
  };

  const openDelete = (fs: FeeStructure) => {
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
      toast.success("Fee structure created!");
      close();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create fee structure",
      );
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteMutation.mutateAsync(selected.id as FeeStructureId);
      toast.success("Fee structure deleted!");
      close();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete fee structure",
      );
    }
  };

  const getClassName = (classId: bigint) => {
    const cls = (classes ?? []).find((c) => c.id === classId);
    return cls ? `${cls.name} — ${cls.section}` : `Class ${classId.toString()}`;
  };

  const fsList = feeStructures ?? [];

  return (
    <div className="space-y-6" data-ocid="fee_structure.page">
      <PageHeader
        title="Fee Structure"
        subtitle={`${fsList.length} fee structure${fsList.length !== 1 ? "s" : ""} configured`}
        breadcrumbs={[{ label: "Fee Structure" }]}
        actions={
          <Button
            type="button"
            data-ocid="fee_structure.add_button"
            onClick={openAdd}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Fee Structure
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-3" data-ocid="fee_structure.loading_state">
          {Array.from({ length: 4 }, (_, i) => `sk-fs-${i}`).map((k) => (
            <Skeleton key={k} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : fsList.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 rounded-xl border border-dashed border-border/50 bg-card"
          data-ocid="fee_structure.empty_state"
        >
          <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Layers className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold font-display text-foreground">
              No fee structures yet
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Define fee rules for each class to generate bills automatically
            </p>
          </div>
          <Button
            type="button"
            onClick={openAdd}
            data-ocid="fee_structure.empty_add_button"
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add First Fee Structure
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {fsList.map((fs) => (
            <FeeStructureCard
              key={fs.id.toString()}
              fs={fs}
              className={getClassName(fs.classId)}
              onDelete={openDelete}
            />
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={mode === "add"} onOpenChange={(open) => !open && close()}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="fee_structure.add.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Add Fee Structure
            </DialogTitle>
            <DialogDescription>
              Define fee rules for a class. Bills are auto-calculated from these
              rules.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Class */}
            <div className="space-y-1">
              <Label htmlFor="fs-class">
                Class <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.classId}
                onValueChange={(v) => changeField("classId", v)}
              >
                <SelectTrigger
                  id="fs-class"
                  data-ocid="fee_structure.form.class"
                >
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Select a class</SelectItem>
                  {(classes ?? []).map((c) => (
                    <SelectItem key={c.id.toString()} value={c.id.toString()}>
                      {c.name} — {c.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.classId && (
                <p
                  data-ocid="fee_structure.form.class_error"
                  className="text-xs text-destructive"
                >
                  {errors.classId}
                </p>
              )}
            </div>

            {/* Category + Custom name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="fs-cat">Fee Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    changeField("category", v as FeeCategory)
                  }
                >
                  <SelectTrigger
                    id="fs-cat"
                    data-ocid="fee_structure.form.category"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FEE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {form.category === FeeCategory.Custom && (
                <div className="space-y-1">
                  <Label htmlFor="fs-custom">
                    Custom Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fs-custom"
                    data-ocid="fee_structure.form.custom_name"
                    value={form.customCategoryName}
                    onChange={(e) =>
                      changeField("customCategoryName", e.target.value)
                    }
                    placeholder="e.g. Sports Fee"
                  />
                  {errors.customCategoryName && (
                    <p className="text-xs text-destructive">
                      {errors.customCategoryName}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Amount + Payment Plan */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="fs-amount">
                  Amount (₹) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fs-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  data-ocid="fee_structure.form.amount"
                  value={form.amount}
                  onChange={(e) => changeField("amount", e.target.value)}
                  placeholder="e.g. 5000"
                />
                {errors.amount && (
                  <p
                    data-ocid="fee_structure.form.amount_error"
                    className="text-xs text-destructive"
                  >
                    {errors.amount}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="fs-plan">Payment Plan</Label>
                <Select
                  value={form.paymentPlan}
                  onValueChange={(v) =>
                    changeField("paymentPlan", v as PaymentPlan)
                  }
                >
                  <SelectTrigger
                    id="fs-plan"
                    data-ocid="fee_structure.form.payment_plan"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_PLANS.map((plan) => (
                      <SelectItem key={plan} value={plan}>
                        {plan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Due Day + Fine + Discount */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="fs-due">Due Day</Label>
                <Input
                  id="fs-due"
                  type="number"
                  min="1"
                  max="28"
                  data-ocid="fee_structure.form.due_day"
                  value={form.dueDayOfMonth}
                  onChange={(e) => changeField("dueDayOfMonth", e.target.value)}
                  placeholder="10"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fs-fine">Fine %</Label>
                <Input
                  id="fs-fine"
                  type="number"
                  min="0"
                  max="100"
                  data-ocid="fee_structure.form.fine_rate"
                  value={form.fineRatePercent}
                  onChange={(e) =>
                    changeField("fineRatePercent", e.target.value)
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fs-discount">Discount %</Label>
                <Input
                  id="fs-discount"
                  type="number"
                  min="0"
                  max="100"
                  data-ocid="fee_structure.form.discount"
                  value={form.discountPercent}
                  onChange={(e) =>
                    changeField("discountPercent", e.target.value)
                  }
                  placeholder="0"
                />
              </div>
            </div>

            {/* Academic Year */}
            <div className="space-y-1">
              <Label htmlFor="fs-year">Academic Year</Label>
              <Input
                id="fs-year"
                data-ocid="fee_structure.form.academic_year"
                value={form.academicYear}
                onChange={(e) => changeField("academicYear", e.target.value)}
                placeholder={ACADEMIC_YEAR}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={close}
              data-ocid="fee_structure.form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="fee_structure.form.submit_button"
              disabled={createMutation.isPending}
              onClick={handleAdd}
            >
              {createMutation.isPending
                ? "Creating..."
                : "Create Fee Structure"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={mode === "delete"}
        onOpenChange={(open) => !open && close()}
      >
        <DialogContent data-ocid="fee_structure.delete.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-destructive">
              Delete Fee Structure
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this fee structure? This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">
                  {selected.category === FeeCategory.Custom
                    ? selected.customCategoryName
                    : selected.category}
                  {" — ₹"}
                  {Number(selected.amount).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selected.paymentPlan} · {selected.academicYear}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={close}
              data-ocid="fee_structure.delete.cancel_button"
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              data-ocid="fee_structure.delete.confirm_button"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

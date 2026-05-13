import type { ClassInput } from "@/backend";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddClass,
  useClasses,
  useDeleteClass,
  useUpdateClass,
} from "@/hooks/useBackend";
import type { Class, ClassId } from "@/types";
import { BookOpen, Pencil, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ACADEMIC_YEAR = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

type ModalMode = "add" | "edit" | "delete" | null;

interface ClassFormState {
  name: string;
  section: string;
  academicYear: string;
  capacity: string;
}

const DEFAULT_FORM: ClassFormState = {
  name: "",
  section: "",
  academicYear: ACADEMIC_YEAR,
  capacity: "40",
};

function ClassCard({
  cls,
  onEdit,
  onDelete,
}: {
  cls: Class;
  onEdit: (cls: Class) => void;
  onDelete: (cls: Class) => void;
}) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:bg-card/90 transition-smooth group"
      data-ocid={`classes.card.${cls.id.toString()}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-foreground font-display">
              {cls.name}
            </p>
            <Badge
              variant="outline"
              className="text-xs bg-primary/10 text-primary border-primary/20"
            >
              {cls.section}
            </Badge>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              {Number(cls.studentCount)}/{Number(cls.capacity)} students
            </span>
            <span className="text-xs text-muted-foreground">
              {cls.academicYear}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 hover:bg-amber-500/10 hover:text-amber-400"
          onClick={() => onEdit(cls)}
          data-ocid={`classes.edit_button.${cls.id.toString()}`}
          aria-label={`Edit ${cls.name}`}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDelete(cls)}
          data-ocid={`classes.delete_button.${cls.id.toString()}`}
          aria-label={`Delete ${cls.name}`}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

function ClassForm({
  form,
  errors,
  onChange,
  onSubmit,
  isSubmitting,
  submitLabel,
}: {
  form: ClassFormState;
  errors: Record<string, string>;
  onChange: (field: keyof ClassFormState, value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="cls-name">
            Class Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="cls-name"
            data-ocid="classes.form.name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="e.g. Class 10"
          />
          {errors.name && (
            <p
              data-ocid="classes.form.name_error"
              className="text-xs text-destructive"
            >
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="cls-section">
            Section <span className="text-destructive">*</span>
          </Label>
          <Input
            id="cls-section"
            data-ocid="classes.form.section"
            value={form.section}
            onChange={(e) => onChange("section", e.target.value)}
            placeholder="e.g. A"
          />
          {errors.section && (
            <p
              data-ocid="classes.form.section_error"
              className="text-xs text-destructive"
            >
              {errors.section}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="cls-year">Academic Year</Label>
          <Input
            id="cls-year"
            data-ocid="classes.form.academic_year"
            value={form.academicYear}
            onChange={(e) => onChange("academicYear", e.target.value)}
            placeholder={ACADEMIC_YEAR}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="cls-cap">Capacity</Label>
          <Input
            id="cls-cap"
            type="number"
            min="1"
            data-ocid="classes.form.capacity"
            value={form.capacity}
            onChange={(e) => onChange("capacity", e.target.value)}
            placeholder="40"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          data-ocid="classes.form.submit_button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </DialogFooter>
    </div>
  );
}

export default function ClassesPage() {
  const { data: classes, isLoading } = useClasses(undefined);
  const addMutation = useAddClass();
  const updateMutation = useUpdateClass();
  const deleteMutation = useDeleteClass();

  const [mode, setMode] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<Class | null>(null);
  const [form, setForm] = useState<ClassFormState>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const changeField = (field: keyof ClassFormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Class name is required";
    if (!form.section.trim()) errs.section = "Section is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildInput = (): ClassInput => ({
    name: form.name.trim(),
    section: form.section.trim(),
    academicYear: form.academicYear.trim() || ACADEMIC_YEAR,
    capacity: BigInt(Number(form.capacity) || 40),
  });

  const openAdd = () => {
    setForm(DEFAULT_FORM);
    setErrors({});
    setMode("add");
  };

  const openEdit = (cls: Class) => {
    setSelected(cls);
    setForm({
      name: cls.name,
      section: cls.section,
      academicYear: cls.academicYear,
      capacity: Number(cls.capacity).toString(),
    });
    setErrors({});
    setMode("edit");
  };

  const openDelete = (cls: Class) => {
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
      toast.success("Class added successfully!");
      close();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add class");
    }
  };

  const handleUpdate = async () => {
    if (!selected || !validate()) return;
    try {
      await updateMutation.mutateAsync({
        id: selected.id as ClassId,
        input: buildInput(),
      });
      toast.success("Class updated successfully!");
      close();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update class",
      );
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteMutation.mutateAsync(selected.id as ClassId);
      toast.success("Class deleted successfully!");
      close();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete class",
      );
    }
  };

  const classList = classes ?? [];

  return (
    <div className="space-y-6" data-ocid="classes.page">
      <PageHeader
        title="Classes"
        subtitle={`${classList.length} class${classList.length !== 1 ? "es" : ""} configured`}
        breadcrumbs={[{ label: "Classes" }]}
        actions={
          <Button
            type="button"
            data-ocid="classes.add_button"
            onClick={openAdd}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Class
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-3" data-ocid="classes.loading_state">
          {Array.from({ length: 5 }, (_, i) => `sk-cls-${i}`).map((k) => (
            <Skeleton key={k} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : classList.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 rounded-xl border border-dashed border-border/50 bg-card"
          data-ocid="classes.empty_state"
        >
          <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold font-display text-foreground">
              No classes yet
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first class to get started
            </p>
          </div>
          <Button
            type="button"
            onClick={openAdd}
            data-ocid="classes.empty_add_button"
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add First Class
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {classList.map((cls) => (
            <ClassCard
              key={cls.id.toString()}
              cls={cls}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={mode === "add"} onOpenChange={(open) => !open && close()}>
        <DialogContent data-ocid="classes.add.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Add New Class</DialogTitle>
            <DialogDescription>
              Configure a class and section for your school.
            </DialogDescription>
          </DialogHeader>
          <ClassForm
            form={form}
            errors={errors}
            onChange={changeField}
            onSubmit={handleAdd}
            isSubmitting={addMutation.isPending}
            submitLabel="Add Class"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={mode === "edit"} onOpenChange={(open) => !open && close()}>
        <DialogContent data-ocid="classes.edit.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Class</DialogTitle>
            <DialogDescription>Update class details below.</DialogDescription>
          </DialogHeader>
          <ClassForm
            form={form}
            errors={errors}
            onChange={changeField}
            onSubmit={handleUpdate}
            isSubmitting={updateMutation.isPending}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={mode === "delete"}
        onOpenChange={(open) => !open && close()}
      >
        <DialogContent data-ocid="classes.delete.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-destructive">
              Delete Class
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selected?.name} — {selected?.section}
              </span>
              ? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">
                {selected?.name} — {selected?.section}
              </p>
              <p className="text-xs text-muted-foreground">
                {selected?.academicYear}
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={close}
              data-ocid="classes.delete.cancel_button"
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              data-ocid="classes.delete.confirm_button"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Class"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

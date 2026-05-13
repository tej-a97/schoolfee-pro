import { BillStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: BillStatus | string;
  size?: "sm" | "md";
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  [BillStatus.Paid]: {
    label: "Paid",
    className:
      "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30",
  },
  [BillStatus.Pending]: {
    label: "Pending",
    className:
      "bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30",
  },
  [BillStatus.Partial_]: {
    label: "Partial",
    className:
      "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
  },
  [BillStatus.Overdue]: {
    label: "Overdue",
    className:
      "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30",
  },
  [BillStatus.Cancelled]: {
    label: "Cancelled",
    className: "bg-muted text-muted-foreground border-border hover:bg-muted",
  },
  Active: {
    label: "Active",
    className:
      "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30",
  },
  Inactive: {
    label: "Inactive",
    className: "bg-muted text-muted-foreground border-border hover:bg-muted",
  },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border",
  };

  return (
    <Badge
      variant="outline"
      className={`font-medium border ${config.className} ${size === "sm" ? "text-xs px-1.5 py-0" : "text-xs px-2.5 py-0.5"}`}
    >
      <span
        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
          status === BillStatus.Paid || status === "Active"
            ? "bg-emerald-400"
            : status === BillStatus.Pending
              ? "bg-amber-400"
              : status === BillStatus.Overdue
                ? "bg-red-400"
                : status === "Partial" || status === BillStatus.Partial_
                  ? "bg-blue-400"
                  : "bg-muted-foreground"
        }`}
      />
      {config.label}
    </Badge>
  );
}

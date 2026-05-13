import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; direction: "up" | "down" };
  color?: "primary" | "success" | "warning" | "destructive" | "info";
  prefix?: string;
  suffix?: string;
  loading?: boolean;
}

const COLOR_MAP = {
  primary: {
    icon: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    gradient: "from-indigo-500/5 to-transparent",
  },
  success: {
    icon: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    gradient: "from-emerald-500/5 to-transparent",
  },
  warning: {
    icon: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    gradient: "from-amber-500/5 to-transparent",
  },
  destructive: {
    icon: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    gradient: "from-red-500/5 to-transparent",
  },
  info: {
    icon: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    gradient: "from-cyan-500/5 to-transparent",
  },
};

export function StatsCard({
  label,
  value,
  icon: Icon,
  trend,
  color = "primary",
  prefix,
  suffix,
  loading,
}: StatsCardProps) {
  const colors = COLOR_MAP[color];

  if (loading) {
    return (
      <Card className="glass border-border/50">
        <CardContent className="p-5">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-8 bg-muted rounded w-32" />
            <div className="h-3 bg-muted rounded w-16" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("glass border relative overflow-hidden", colors.bg)}>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none",
          colors.gradient,
        )}
      />
      <CardContent className="p-5 relative">
        <div className="flex items-start justify-between">
          <div className="space-y-1 min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">
              {label}
            </p>
            <p className="text-2xl font-bold font-display text-foreground tabular-nums">
              {prefix && (
                <span className="text-lg font-semibold">{prefix}</span>
              )}
              {value}
              {suffix && (
                <span className="text-sm font-normal ml-1 text-muted-foreground">
                  {suffix}
                </span>
              )}
            </p>
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  trend.direction === "up"
                    ? "text-emerald-400"
                    : "text-red-400",
                )}
              >
                {trend.direction === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{Math.abs(trend.value)}% vs last month</span>
              </div>
            )}
          </div>
          <div className={cn("rounded-xl p-2.5 border", colors.bg)}>
            <Icon className={cn("h-5 w-5", colors.icon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

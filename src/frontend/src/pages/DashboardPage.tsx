import { BillStatus } from "@/backend";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBills, useDashboardStats, usePayments } from "@/hooks/useBackend";
import type { Bill, Payment } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Circle,
  Clock,
  CreditCard,
  FileText,
  GraduationCap,
  IndianRupee,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    label: "Manage Students",
    icon: GraduationCap,
    path: "/students",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    label: "View Bills",
    icon: FileText,
    path: "/bills",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    label: "Record Payment",
    icon: CreditCard,
    path: "/payments",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    label: "View Reports",
    icon: BarChart3,
    path: "/reports",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
];

function BillStatusIcon({ status }: { status: string }) {
  if (status === BillStatus.Paid)
    return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />;
  if (status === BillStatus.Overdue)
    return <XCircle className="h-3.5 w-3.5 text-red-400" />;
  return <Circle className="h-3.5 w-3.5 text-amber-400" />;
}

function RecentBillsCard({
  bills,
  loading,
}: { bills: Bill[]; loading: boolean }) {
  const recent = bills.slice(0, 6);
  return (
    <Card className="glass border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Recent Bills
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="px-4 pb-4 space-y-3">
            {Array.from({ length: 4 }, (_, i) => `sk-bill-${i}`).map((k) => (
              <Skeleton key={k} className="h-8 w-full" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="px-4 pb-6 text-center">
            <p className="text-sm text-muted-foreground">No bills yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {recent.map((bill) => (
              <div
                key={bill.billNumber}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/10 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <BillStatusIcon status={bill.status} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate font-mono">
                      {bill.billNumber}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {bill.month}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="text-xs font-semibold text-foreground">
                    ₹{Number(bill.netAmount).toLocaleString()}
                  </p>
                  <Badge
                    variant="outline"
                    className={`text-xs px-1.5 py-0 border ${
                      bill.status === BillStatus.Paid
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : bill.status === BillStatus.Overdue
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {bill.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecentPaymentsCard({
  payments,
  loading,
}: { payments: Payment[]; loading: boolean }) {
  const recent = payments.slice(0, 6);
  return (
    <Card className="glass border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-emerald-400" />
          Recent Payments
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="px-4 pb-4 space-y-3">
            {Array.from({ length: 4 }, (_, i) => `sk-pay-${i}`).map((k) => (
              <Skeleton key={k} className="h-8 w-full" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="px-4 pb-6 text-center">
            <p className="text-sm text-muted-foreground">
              No payments recorded yet
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {recent.map((payment) => (
              <div
                key={payment.id.toString()}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/10 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {payment.method}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.referenceNumber || "—"}
                    </p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-emerald-400 shrink-0 ml-2">
                  ₹{Number(payment.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: bills, isLoading: billsLoading } = useBills({});
  const { data: payments, isLoading: paymentsLoading } = usePayments({});
  const navigate = useNavigate();

  return (
    <div className="space-y-6" data-ocid="dashboard.page">
      <PageHeader
        title="Dashboard"
        subtitle="School fee management overview"
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      {/* Stats Row */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4"
        data-ocid="dashboard.stats.section"
      >
        <StatsCard
          label="Total Students"
          value={
            statsLoading
              ? "—"
              : Number(stats?.totalStudents ?? 0).toLocaleString()
          }
          icon={Users}
          color="primary"
          loading={statsLoading}
        />
        <StatsCard
          label="Total Collected"
          value={
            statsLoading
              ? "—"
              : Number(stats?.totalCollected ?? 0).toLocaleString()
          }
          icon={IndianRupee}
          color="success"
          prefix="₹"
          loading={statsLoading}
        />
        <StatsCard
          label="Pending Fees"
          value={
            statsLoading
              ? "—"
              : Number(stats?.pendingFees ?? 0).toLocaleString()
          }
          icon={Clock}
          color="warning"
          prefix="₹"
          loading={statsLoading}
        />
        <StatsCard
          label="Today's Collection"
          value={
            statsLoading
              ? "—"
              : Number(stats?.todayCollection ?? 0).toLocaleString()
          }
          icon={TrendingUp}
          color="info"
          prefix="₹"
          loading={statsLoading}
        />
        <StatsCard
          label="Due Students"
          value={
            statsLoading
              ? "—"
              : Number(stats?.dueStudentsCount ?? 0).toLocaleString()
          }
          icon={AlertTriangle}
          color="destructive"
          loading={statsLoading}
        />
      </div>

      {/* Quick Actions */}
      <div data-ocid="dashboard.quick_actions.section">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.path}
              type="button"
              data-ocid={`dashboard.quick_action.${action.label.toLowerCase().replace(/\s+/g, "_")}`}
              onClick={() => navigate({ to: action.path })}
              className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border ${
                action.bg
              } hover:scale-[1.02] active:scale-[0.98] transition-smooth cursor-pointer text-center group`}
            >
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center ${action.bg} border`}
              >
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <span
                className={`text-sm font-medium ${action.color} group-hover:opacity-90`}
              >
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity Row */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        data-ocid="dashboard.activity.section"
      >
        <RecentBillsCard bills={bills ?? []} loading={billsLoading} />
        <RecentPaymentsCard
          payments={payments ?? []}
          loading={paymentsLoading}
        />
      </div>
    </div>
  );
}

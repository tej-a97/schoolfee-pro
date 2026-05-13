import { BillStatus, PaymentMethod } from "@/backend";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useBills,
  useClasses,
  usePayments,
  useStudents,
} from "@/hooks/useBackend";
import type { Bill, Class, Payment, Student } from "@/types";
import {
  AlertTriangle,
  BarChart2,
  Calendar,
  Download,
  FileText,
  Printer,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: bigint) =>
  `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

function toDateStr(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toISOString().slice(0, 10);
}

function daysOverdue(dueTs: bigint): number {
  const diff = Date.now() - Number(dueTs) / 1_000_000;
  return Math.max(0, Math.floor(diff / 86_400_000));
}

function downloadCSV(filename: string, rows: string[][]): void {
  const content = rows
    .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const CHART_COLORS = ["#818cf8", "#34d399", "#fbbf24", "#f87171", "#a78bfa"];

// ── Sub-component: Loading skeleton ──────────────────────────────────────────

function ReportSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }, (_, i) => `skel-report-${i}`).map((k) => (
          <Skeleton key={k} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

// ── Tab: Daily Collection ─────────────────────────────────────────────────────

function DailyTab({
  payments,
  students,
}: { payments: Payment[]; students: Student[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  const studentMap = useMemo(() => {
    const m = new Map<bigint, Student>();
    for (const s of students) m.set(s.id, s);
    return m;
  }, [students]);

  const filtered = useMemo(
    () => payments.filter((p) => toDateStr(p.paymentDate) === date),
    [payments, date],
  );

  const totalCollected = useMemo(
    () => filtered.reduce((acc, p) => acc + p.amount, 0n),
    [filtered],
  );

  const methodBreakdown = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const p of filtered) {
      acc[p.method] = (acc[p.method] ?? 0) + Number(p.amount);
    }
    return Object.entries(acc).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  function exportCSV() {
    const rows: string[][] = [
      ["Receipt#", "Student", "Amount", "Method", "Date", "Reference"],
      ...filtered.map((p) => [
        p.id.toString(),
        studentMap.get(p.studentId)?.name ?? "Unknown",
        Number(p.amount).toString(),
        p.method,
        toDateStr(p.paymentDate),
        p.referenceNumber,
      ]),
    ];
    downloadCSV(`daily-report-${date}.csv`, rows);
  }

  return (
    <div className="space-y-6" data-ocid="daily_report.section">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="daily-date"
          >
            Select Date
          </label>
          <input
            id="daily-date"
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="daily_report.date_input"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            data-ocid="daily_report.print_button"
          >
            <Printer className="h-4 w-4 mr-1.5" /> Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            data-ocid="daily_report.export_button"
          >
            <Download className="h-4 w-4 mr-1.5" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          label="Total Collected"
          value={fmt(totalCollected)}
          icon={Wallet}
          color="success"
        />
        <StatsCard
          label="Transactions"
          value={filtered.length}
          icon={FileText}
          color="primary"
        />
        <StatsCard
          label="Payment Methods"
          value={methodBreakdown.length}
          icon={BarChart2}
          color="info"
        />
      </div>

      {/* Pie + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="glass border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Payment Method Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {methodBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={methodBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {methodBreakdown.map((entry, i) => (
                      <Cell
                        key={entry.name}
                        fill={CHART_COLORS[i % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">
                No transactions for this date
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto max-h-[260px]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-card/90 backdrop-blur-sm">
                  <tr className="border-b border-border/50">
                    <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                      Student
                    </th>
                    <th className="text-right px-4 py-2 text-muted-foreground font-medium">
                      Amount
                    </th>
                    <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                      Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-8 text-muted-foreground"
                        data-ocid="daily_report.empty_state"
                      >
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p, i) => (
                      <tr
                        key={p.id.toString()}
                        className="border-b border-border/30 hover:bg-muted/30"
                        data-ocid={`daily_report.item.${i + 1}`}
                      >
                        <td className="px-4 py-2.5 truncate max-w-[120px]">
                          {studentMap.get(p.studentId)?.name ?? "—"}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono tabular-nums text-emerald-400">
                          {fmt(p.amount)}
                        </td>
                        <td className="px-4 py-2.5">
                          <Badge variant="outline" className="text-xs">
                            {p.method}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Tab: Monthly Report ───────────────────────────────────────────────────────

function MonthlyTab({
  payments,
  classes,
}: { payments: Payment[]; classes: Class[] }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const _classMap = useMemo(() => {
    const m = new Map<bigint, Class>();
    for (const c of classes) m.set(c.id, c);
    return m;
  }, [classes]);

  const pad = useCallback((n: number) => String(n).padStart(2, "0"), []);
  const monthStr = `${year}-${pad(month)}`;
  const prevMonth =
    month === 1 ? `${year - 1}-12` : `${year}-${pad(month - 1)}`;

  const monthPayments = useMemo(
    () => payments.filter((p) => toDateStr(p.paymentDate).startsWith(monthStr)),
    [payments, monthStr],
  );
  const prevPayments = useMemo(
    () =>
      payments.filter((p) => toDateStr(p.paymentDate).startsWith(prevMonth)),
    [payments, prevMonth],
  );

  const totalCurrent = monthPayments.reduce((a, p) => a + p.amount, 0n);
  const totalPrev = prevPayments.reduce((a, p) => a + p.amount, 0n);
  const trendPct =
    totalPrev === 0n
      ? 0
      : Math.round(
          ((Number(totalCurrent) - Number(totalPrev)) / Number(totalPrev)) *
            100,
        );

  // Daily totals line chart
  const daysInMonth = new Date(year, month, 0).getDate();
  const dailyData = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const p of monthPayments) {
      const d = toDateStr(p.paymentDate);
      acc[d] = (acc[d] ?? 0) + Number(p.amount);
    }
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = `${monthStr}-${pad(i + 1)}`;
      return { day: i + 1, amount: acc[day] ?? 0 };
    });
  }, [monthPayments, monthStr, daysInMonth, pad]);

  // Class-wise bar chart
  const classData = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const p of monthPayments) {
      // We don't have classId on payments directly — group by bill's classId is unavailable here;
      // aggregate by "Unknown" will be replaced when bills are joined on a future pass
      const cls = "All Classes";
      acc[cls] = (acc[cls] ?? 0) + Number(p.amount);
    }
    return Object.entries(acc).map(([name, value]) => ({ name, value }));
  }, [monthPayments]);

  function exportCSV() {
    const rows: string[][] = [
      ["Month", "Day", "Amount"],
      ...dailyData.map((d) => [
        monthStr,
        d.day.toString(),
        d.amount.toString(),
      ]),
    ];
    downloadCSV(`monthly-report-${monthStr}.csv`, rows);
  }

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [2023, 2024, 2025, 2026];

  return (
    <div className="space-y-6" data-ocid="monthly_report.section">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Select
            value={String(month)}
            onValueChange={(v) => setMonth(Number(v))}
          >
            <SelectTrigger
              className="w-36"
              data-ocid="monthly_report.month_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((m, i) => (
                <SelectItem key={m} value={String(i + 1)}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={String(year)}
            onValueChange={(v) => setYear(Number(v))}
          >
            <SelectTrigger
              className="w-24"
              data-ocid="monthly_report.year_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            data-ocid="monthly_report.print_button"
          >
            <Printer className="h-4 w-4 mr-1.5" /> Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            data-ocid="monthly_report.export_button"
          >
            <Download className="h-4 w-4 mr-1.5" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsCard
          label="Total Collected"
          value={fmt(totalCurrent)}
          icon={Wallet}
          color="success"
          trend={
            totalPrev > 0n
              ? {
                  value: Math.abs(trendPct),
                  direction: trendPct >= 0 ? "up" : "down",
                }
              : undefined
          }
        />
        <StatsCard
          label="Transactions"
          value={monthPayments.length}
          icon={FileText}
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="glass border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Daily Collections — {MONTHS[month - 1]} {year}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={dailyData}
                margin={{ top: 4, right: 4, left: 0, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  strokeOpacity={0.4}
                />
                <XAxis
                  dataKey="day"
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  width={60}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
                  }
                />
                <Tooltip
                  formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Collection Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={classData}
                margin={{ top: 4, right: 4, left: 0, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  strokeOpacity={0.4}
                />
                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  width={60}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
                  }
                />
                <Tooltip
                  formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
                />
                <Bar
                  dataKey="value"
                  fill={CHART_COLORS[1]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Tab: Pending Fees ─────────────────────────────────────────────────────────

function PendingTab({
  bills,
  students,
  classes,
}: { bills: Bill[]; students: Student[]; classes: Class[] }) {
  const [classFilter, setClassFilter] = useState<string>("all");

  const studentMap = useMemo(() => {
    const m = new Map<bigint, Student>();
    for (const s of students) m.set(s.id, s);
    return m;
  }, [students]);

  const classMap = useMemo(() => {
    const m = new Map<bigint, Class>();
    for (const c of classes) m.set(c.id, c);
    return m;
  }, [classes]);

  const pending = useMemo(
    () =>
      bills
        .filter(
          (b) =>
            (b.status === BillStatus.Pending ||
              b.status === BillStatus.Overdue ||
              b.status === BillStatus.Partial_) &&
            (classFilter === "all" || b.classId.toString() === classFilter),
        )
        .sort((a, b) => daysOverdue(b.dueDate) - daysOverdue(a.dueDate)),
    [bills, classFilter],
  );

  const totalPending = pending.reduce((a, b) => a + b.netAmount, 0n);
  const uniqueStudents = new Set(pending.map((b) => b.studentId.toString()))
    .size;

  function exportCSV() {
    const rows: string[][] = [
      [
        "Bill#",
        "Student",
        "Class",
        "Amount",
        "Due Date",
        "Days Overdue",
        "Status",
      ],
      ...pending.map((b) => [
        b.billNumber,
        studentMap.get(b.studentId)?.name ?? "Unknown",
        classMap.get(b.classId)?.name ?? "—",
        Number(b.netAmount).toString(),
        toDateStr(b.dueDate),
        daysOverdue(b.dueDate).toString(),
        b.status,
      ]),
    ];
    downloadCSV("pending-fees.csv", rows);
  }

  return (
    <div className="space-y-6" data-ocid="pending_fees.section">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger
              className="w-44"
              data-ocid="pending_fees.class_filter"
            >
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((c) => (
                <SelectItem key={c.id.toString()} value={c.id.toString()}>
                  {c.name} — {c.section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={exportCSV}
          data-ocid="pending_fees.export_button"
        >
          <Download className="h-4 w-4 mr-1.5" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsCard
          label="Total Pending Amount"
          value={fmt(totalPending)}
          icon={Wallet}
          color="warning"
        />
        <StatsCard
          label="Students with Pending"
          value={uniqueStudents}
          icon={Users}
          color="destructive"
        />
      </div>

      <Card className="glass border-border/50">
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card/90 backdrop-blur-sm">
                <tr className="border-b border-border/50">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Student
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Class
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Bill #
                  </th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Due Date
                  </th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">
                    Overdue
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {pending.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-10 text-muted-foreground"
                      data-ocid="pending_fees.empty_state"
                    >
                      No pending fees found 🎉
                    </td>
                  </tr>
                ) : (
                  pending.map((b, i) => {
                    const over = daysOverdue(b.dueDate);
                    return (
                      <tr
                        key={b.id.toString()}
                        className="border-b border-border/30 hover:bg-muted/30"
                        data-ocid={`pending_fees.item.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-medium truncate max-w-[140px]">
                          {studentMap.get(b.studentId)?.name ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {classMap.get(b.classId)?.name ?? "—"}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                          {b.billNumber}
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums">
                          {fmt(b.netAmount)}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {toDateStr(b.dueDate)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {over > 0 ? (
                            <span className="text-red-400 font-semibold">
                              {over}d
                            </span>
                          ) : (
                            <span className="text-emerald-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={b.status} size="sm" />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab: Defaulters ───────────────────────────────────────────────────────────

function DefaultersTab({
  bills,
  students,
  classes,
}: { bills: Bill[]; students: Student[]; classes: Class[] }) {
  const studentMap = useMemo(() => {
    const m = new Map<bigint, Student>();
    for (const s of students) m.set(s.id, s);
    return m;
  }, [students]);

  const classMap = useMemo(() => {
    const m = new Map<bigint, Class>();
    for (const c of classes) m.set(c.id, c);
    return m;
  }, [classes]);

  // Group overdue bills by student
  const defaulterRows = useMemo(() => {
    const byStudent = new Map<
      string,
      { student: Student; outstanding: bigint; oldestDue: bigint; cls: string }
    >();
    for (const b of bills) {
      if (b.status !== BillStatus.Overdue) continue;
      const key = b.studentId.toString();
      const stu = studentMap.get(b.studentId);
      if (!stu) continue;
      if (byStudent.has(key)) {
        const r = byStudent.get(key)!;
        r.outstanding += b.netAmount;
        if (b.dueDate < r.oldestDue) r.oldestDue = b.dueDate;
      } else {
        byStudent.set(key, {
          student: stu,
          outstanding: b.netAmount,
          oldestDue: b.dueDate,
          cls: classMap.get(b.classId)?.name ?? "—",
        });
      }
    }
    return Array.from(byStudent.values()).sort((a, b) =>
      Number(b.outstanding - a.outstanding),
    );
  }, [bills, studentMap, classMap]);

  function exportCSV() {
    const rows: string[][] = [
      [
        "Admission#",
        "Student",
        "Class",
        "Parent Phone",
        "Parent Email",
        "Outstanding",
        "Oldest Due",
      ],
      ...defaulterRows.map((r) => [
        r.student.admissionNumber,
        r.student.name,
        r.cls,
        r.student.parentPhone,
        r.student.parentEmail,
        Number(r.outstanding).toString(),
        toDateStr(r.oldestDue),
      ]),
    ];
    downloadCSV("defaulters.csv", rows);
  }

  return (
    <div className="space-y-6" data-ocid="defaulters.section">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div />
        <Button
          variant="outline"
          size="sm"
          onClick={exportCSV}
          data-ocid="defaulters.export_button"
        >
          <Download className="h-4 w-4 mr-1.5" /> Export CSV
        </Button>
      </div>

      <StatsCard
        label="Total Defaulters"
        value={defaulterRows.length}
        icon={AlertTriangle}
        color="destructive"
      />

      <Card className="glass border-border/50">
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card/90 backdrop-blur-sm">
                <tr className="border-b border-border/50">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Student
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Admission #
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Class
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Parent Phone
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Parent Email
                  </th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">
                    Outstanding
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Oldest Due
                  </th>
                </tr>
              </thead>
              <tbody>
                {defaulterRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-10 text-muted-foreground"
                      data-ocid="defaulters.empty_state"
                    >
                      No defaulters found 🎉
                    </td>
                  </tr>
                ) : (
                  defaulterRows.map((r, i) => (
                    <tr
                      key={r.student.id.toString()}
                      className="border-b border-border/30 hover:bg-muted/30"
                      data-ocid={`defaulters.item.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-medium">
                        {r.student.name}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {r.student.admissionNumber}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {r.cls}
                      </td>
                      <td className="px-4 py-3">{r.student.parentPhone}</td>
                      <td className="px-4 py-3 truncate max-w-[160px] text-muted-foreground">
                        {r.student.parentEmail}
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-red-400 font-semibold">
                        {fmt(r.outstanding)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {toDateStr(r.oldestDue)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab: Class-wise Report ────────────────────────────────────────────────────

function ClasswiseTab({
  bills,
  payments: _payments,
  classes,
}: { bills: Bill[]; payments: Payment[]; classes: Class[] }) {
  const academicYears = useMemo(() => {
    const s = new Set(bills.map((b) => b.academicYear));
    return Array.from(s).sort().reverse();
  }, [bills]);

  const [ayFilter, setAyFilter] = useState<string>("all");

  const classMap = useMemo(() => {
    const m = new Map<bigint, Class>();
    for (const c of classes) m.set(c.id, c);
    return m;
  }, [classes]);

  const filteredBills = useMemo(
    () =>
      ayFilter === "all"
        ? bills
        : bills.filter((b) => b.academicYear === ayFilter),
    [bills, ayFilter],
  );

  const classStats = useMemo(() => {
    const acc = new Map<
      string,
      { classId: bigint; name: string; billed: bigint; collected: bigint }
    >();
    for (const b of filteredBills) {
      const key = b.classId.toString();
      const cls = classMap.get(b.classId);
      const name = cls ? `${cls.name} ${cls.section}` : `Class ${key}`;
      if (!acc.has(key))
        acc.set(key, { classId: b.classId, name, billed: 0n, collected: 0n });
      const r = acc.get(key)!;
      r.billed += b.totalAmount;
      if (b.status === BillStatus.Paid) r.collected += b.totalAmount;
      else if (b.status === BillStatus.Partial_)
        r.collected += b.totalAmount - b.netAmount;
    }
    return Array.from(acc.values());
  }, [filteredBills, classMap]);

  const chartData = classStats.map((r) => ({
    name: r.name,
    Billed: Number(r.billed),
    Collected: Number(r.collected),
  }));

  function exportCSV() {
    const rows: string[][] = [
      [
        "Class",
        "Total Billed",
        "Total Collected",
        "Pending",
        "Collection Rate %",
      ],
      ...classStats.map((r) => [
        r.name,
        Number(r.billed).toString(),
        Number(r.collected).toString(),
        Number(r.billed - r.collected).toString(),
        r.billed > 0n
          ? `${Math.round((Number(r.collected) / Number(r.billed)) * 100)}%`
          : "0%",
      ]),
    ];
    downloadCSV(`classwise-${ayFilter}.csv`, rows);
  }

  return (
    <div className="space-y-6" data-ocid="classwise.section">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Select value={ayFilter} onValueChange={setAyFilter}>
          <SelectTrigger className="w-44" data-ocid="classwise.year_filter">
            <SelectValue placeholder="All Academic Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {academicYears.map((ay) => (
              <SelectItem key={ay} value={ay}>
                {ay}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={exportCSV}
          data-ocid="classwise.export_button"
        >
          <Download className="h-4 w-4 mr-1.5" /> Export CSV
        </Button>
      </div>

      <Card className="glass border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            Collection per Class
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 4, left: 0, bottom: 24 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  strokeOpacity={0.4}
                />
                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 10,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  width={60}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
                  }
                />
                <Tooltip
                  formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  dataKey="Billed"
                  fill={CHART_COLORS[0]}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Collected"
                  fill={CHART_COLORS[1]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div
              className="flex items-center justify-center h-[260px] text-muted-foreground text-sm"
              data-ocid="classwise.empty_state"
            >
              No data for selected period
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card/90 backdrop-blur-sm">
                <tr className="border-b border-border/50">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Class
                  </th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">
                    Total Billed
                  </th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">
                    Collected
                  </th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">
                    Pending
                  </th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">
                    Rate %
                  </th>
                </tr>
              </thead>
              <tbody>
                {classStats.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No class data available
                    </td>
                  </tr>
                ) : (
                  classStats.map((r, i) => {
                    const rate =
                      r.billed > 0n
                        ? Math.round(
                            (Number(r.collected) / Number(r.billed)) * 100,
                          )
                        : 0;
                    return (
                      <tr
                        key={r.classId.toString()}
                        className="border-b border-border/30 hover:bg-muted/30"
                        data-ocid={`classwise.item.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-medium">{r.name}</td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums">
                          {fmt(r.billed)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-emerald-400">
                          {fmt(r.collected)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-amber-400">
                          {fmt(r.billed - r.collected)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span
                            className={`font-semibold ${rate >= 80 ? "text-emerald-400" : rate >= 50 ? "text-amber-400" : "text-red-400"}`}
                          >
                            {rate}%
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab: Transaction Report ───────────────────────────────────────────────────

function TransactionTab({
  payments,
  students,
  classes: _classes,
}: { payments: Payment[]; students: Student[]; classes: Class[] }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [methodFilter, setMethodFilter] = useState<string>("all");

  const studentMap = useMemo(() => {
    const m = new Map<bigint, Student>();
    for (const s of students) m.set(s.id, s);
    return m;
  }, [students]);

  const filtered = useMemo(
    () =>
      payments.filter((p) => {
        const d = toDateStr(p.paymentDate);
        if (dateFrom && d < dateFrom) return false;
        if (dateTo && d > dateTo) return false;
        if (methodFilter !== "all" && p.method !== methodFilter) return false;
        return true;
      }),
    [payments, dateFrom, dateTo, methodFilter],
  );

  const totalAmount = filtered.reduce((a, p) => a + p.amount, 0n);

  const methods = Object.values(PaymentMethod);

  function exportCSV() {
    const rows: string[][] = [
      [
        "Payment ID",
        "Student",
        "Amount",
        "Method",
        "Date",
        "Reference",
        "Notes",
      ],
      ...filtered.map((p) => [
        p.id.toString(),
        studentMap.get(p.studentId)?.name ?? "Unknown",
        Number(p.amount).toString(),
        p.method,
        toDateStr(p.paymentDate),
        p.referenceNumber,
        p.notes,
      ]),
      ["", "TOTAL", Number(totalAmount).toString(), "", "", "", ""],
    ];
    downloadCSV("transaction-report.csv", rows);
  }

  return (
    <div className="space-y-6" data-ocid="transaction_report.section">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground" htmlFor="txn-from">
            From
          </label>
          <input
            id="txn-from"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="transaction_report.date_from_input"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground" htmlFor="txn-to">
            To
          </label>
          <input
            id="txn-to"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="transaction_report.date_to_input"
          />
        </div>
        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger
            className="w-40"
            data-ocid="transaction_report.method_filter"
          >
            <SelectValue placeholder="All Methods" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            {methods.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            data-ocid="transaction_report.print_button"
          >
            <Printer className="h-4 w-4 mr-1.5" /> Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            data-ocid="transaction_report.export_button"
          >
            <Download className="h-4 w-4 mr-1.5" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsCard
          label="Total Amount"
          value={fmt(totalAmount)}
          icon={Wallet}
          color="success"
        />
        <StatsCard
          label="Transactions"
          value={filtered.length}
          icon={FileText}
          color="primary"
        />
      </div>

      <Card className="glass border-border/50">
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card/90 backdrop-blur-sm">
                <tr className="border-b border-border/50">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Payment ID
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Student
                  </th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Method
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-muted-foreground"
                      data-ocid="transaction_report.empty_state"
                    >
                      No transactions match the filters
                    </td>
                  </tr>
                ) : (
                  filtered.map((p, i) => (
                    <tr
                      key={p.id.toString()}
                      className="border-b border-border/30 hover:bg-muted/30"
                      data-ocid={`transaction_report.item.${i + 1}`}
                    >
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                        #{p.id.toString()}
                      </td>
                      <td className="px-4 py-2.5 font-medium">
                        {studentMap.get(p.studentId)?.name ?? "—"}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-emerald-400">
                        {fmt(p.amount)}
                      </td>
                      <td className="px-4 py-2.5">
                        <Badge variant="outline" className="text-xs">
                          {p.method}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {toDateStr(p.paymentDate)}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs truncate max-w-[120px]">
                        {p.referenceNumber || "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {filtered.length > 0 && (
                <tfoot>
                  <tr className="border-t-2 border-border bg-muted/30">
                    <td colSpan={2} className="px-4 py-3 font-semibold">
                      Total
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums font-bold text-emerald-400">
                      {fmt(totalAmount)}
                    </td>
                    <td colSpan={3} />
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const { data: bills = [], isLoading: billsLoading } = useBills({});
  const { data: payments = [], isLoading: paymentsLoading } = usePayments({});
  const { data: students = [], isLoading: studentsLoading } = useStudents({});
  const { data: classes = [], isLoading: classesLoading } = useClasses();

  const isLoading =
    billsLoading || paymentsLoading || studentsLoading || classesLoading;

  return (
    <div className="space-y-6 print:space-y-4" data-ocid="reports.page">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Comprehensive financial reports and insights"
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "Reports & Analytics" },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="print:hidden"
            data-ocid="reports.print_button"
          >
            <Printer className="h-4 w-4 mr-1.5" />
            Print Page
          </Button>
        }
      />

      {isLoading ? (
        <ReportSkeleton />
      ) : (
        <Tabs defaultValue="daily" className="w-full" data-ocid="reports.tabs">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1 mb-6 print:hidden">
            <TabsTrigger value="daily" data-ocid="reports.tab.daily">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              Daily
            </TabsTrigger>
            <TabsTrigger value="monthly" data-ocid="reports.tab.monthly">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              Monthly
            </TabsTrigger>
            <TabsTrigger value="pending" data-ocid="reports.tab.pending">
              <Wallet className="h-3.5 w-3.5 mr-1.5" />
              Pending Fees
            </TabsTrigger>
            <TabsTrigger value="defaulters" data-ocid="reports.tab.defaulters">
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
              Defaulters
            </TabsTrigger>
            <TabsTrigger value="classwise" data-ocid="reports.tab.classwise">
              <BarChart2 className="h-3.5 w-3.5 mr-1.5" />
              Class-wise
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              data-ocid="reports.tab.transactions"
            >
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily">
            <DailyTab
              payments={payments as Payment[]}
              students={students as Student[]}
            />
          </TabsContent>

          <TabsContent value="monthly">
            <MonthlyTab
              payments={payments as Payment[]}
              classes={classes as Class[]}
            />
          </TabsContent>

          <TabsContent value="pending">
            <PendingTab
              bills={bills as Bill[]}
              students={students as Student[]}
              classes={classes as Class[]}
            />
          </TabsContent>

          <TabsContent value="defaulters">
            <DefaultersTab
              bills={bills as Bill[]}
              students={students as Student[]}
              classes={classes as Class[]}
            />
          </TabsContent>

          <TabsContent value="classwise">
            <ClasswiseTab
              bills={bills as Bill[]}
              payments={payments as Payment[]}
              classes={classes as Class[]}
            />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionTab
              payments={payments as Payment[]}
              students={students as Student[]}
              classes={classes as Class[]}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

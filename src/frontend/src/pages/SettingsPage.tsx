import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAppStore } from "@/store/appStore";
import {
  CalendarDays,
  Info,
  Moon,
  Palette,
  School,
  ShieldCheck,
  Sun,
} from "lucide-react";

const ACADEMIC_YEAR = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

function SettingRow({
  label,
  description,
  icon,
  children,
}: {
  label: string;
  description?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-start gap-3 min-w-0">
        <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}

export default function SettingsPage() {
  const { isDarkMode, setIsDarkMode } = useAppStore();

  return (
    <div className="space-y-6" data-ocid="settings.page">
      <PageHeader
        title="Settings"
        subtitle="Manage your school profile and preferences"
        breadcrumbs={[{ label: "Settings" }]}
      />

      {/* School Profile Card */}
      <Card className="glass border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <School className="h-4 w-4 text-primary" />
            School Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/15">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-subtle shrink-0">
              <span className="text-white text-2xl font-bold font-display">
                S
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold font-display text-foreground">
                SchoolFee Pro
              </h3>
              <p className="text-sm text-muted-foreground">
                Modern School Fee Management System
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className="text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                >
                  Active
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Production
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Platform
              </p>
              <p className="font-medium text-foreground mt-0.5">
                Internet Computer
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Version
              </p>
              <p className="font-medium text-foreground mt-0.5">1.0.0</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Year Card */}
      <Card className="glass border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            Academic Year
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SettingRow
            label="Current Academic Year"
            description="The active academic year used across all fee structures and student records."
            icon={<CalendarDays className="h-4 w-4 text-primary" />}
          >
            <Badge
              variant="outline"
              className="text-sm font-semibold bg-primary/10 text-primary border-primary/30"
              data-ocid="settings.academic_year.badge"
            >
              {ACADEMIC_YEAR}
            </Badge>
          </SettingRow>
        </CardContent>
      </Card>

      {/* Appearance Card */}
      <Card className="glass border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SettingRow
            label="Dark Mode"
            description="Switch between light and dark interface theme. Your preference is saved automatically."
            icon={
              isDarkMode ? (
                <Moon className="h-4 w-4 text-primary" />
              ) : (
                <Sun className="h-4 w-4 text-primary" />
              )
            }
          >
            <Switch
              data-ocid="settings.dark_mode.toggle"
              checked={isDarkMode}
              onCheckedChange={(val) => {
                setIsDarkMode(val);
                document.documentElement.classList.toggle("dark", val);
              }}
              aria-label="Toggle dark mode"
            />
          </SettingRow>

          <Separator className="my-1" />

          <SettingRow
            label="Current Theme"
            description="Indigo-based professional color palette with glass morphism effects."
            icon={<Palette className="h-4 w-4 text-indigo-400" />}
          >
            <Badge
              variant="outline"
              className="text-xs bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
            >
              {isDarkMode ? "Dark" : "Light"}
            </Badge>
          </SettingRow>
        </CardContent>
      </Card>

      {/* Security & Info Card */}
      <Card className="glass border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Security & Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SettingRow
            label="Internet Identity"
            description="Decentralised, passwordless authentication secured by the Internet Computer."
            icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />}
          >
            <Badge
              variant="outline"
              className="text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
            >
              Active
            </Badge>
          </SettingRow>

          <Separator className="my-1" />

          <SettingRow
            label="Data Storage"
            description="All data is stored securely on-chain in the Motoko canister state."
            icon={<Info className="h-4 w-4 text-cyan-400" />}
          >
            <Badge
              variant="outline"
              className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
            >
              On-Chain
            </Badge>
          </SettingRow>
        </CardContent>
      </Card>
    </div>
  );
}

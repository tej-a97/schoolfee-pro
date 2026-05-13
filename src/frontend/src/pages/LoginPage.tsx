import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { GraduationCap, Shield, Users, Zap } from "lucide-react";
import { useEffect } from "react";

const FEATURES = [
  { icon: Shield, text: "Secure Internet Identity login" },
  { icon: Zap, text: "Real-time fee tracking & analytics" },
  { icon: Users, text: "Multi-role access for all staff" },
];

export default function LoginPage() {
  const { isAuthenticated, isInitializing, isLoggingIn, login, authError } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const isLoading = isInitializing || isLoggingIn;

  return (
    <div className="min-h-screen flex bg-background" data-ocid="login.page">
      {/* Left panel — branding / illustration */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-purple-600/15 blur-2xl" />

        <img
          src="/assets/generated/school-fee-hero.dim_1200x800.jpg"
          alt="SchoolFee Pro"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-indigo-300" />
            </div>
            <div>
              <p className="font-bold text-xl font-display">SchoolFee Pro</p>
              <p className="text-sm text-indigo-300">Fee Management System</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold font-display leading-tight mb-4">
            Modern Fee Management
            <br />
            <span className="text-indigo-300">for Modern Schools</span>
          </h2>
          <p className="text-indigo-200/80 text-base mb-8 max-w-sm">
            Track payments, generate bills, send reminders, and manage your
            school finances in one place.
          </p>

          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-indigo-300" />
                </div>
                <span className="text-sm text-indigo-100/90">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "10K+", label: "Students Managed" },
              { value: "₹50L+", label: "Fees Collected" },
              { value: "500+", label: "Schools Trust Us" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-white font-display">
                  {stat.value}
                </p>
                <p className="text-xs text-indigo-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 lg:max-w-md flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8" data-ocid="login.card">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <p className="font-bold text-lg font-display text-foreground">
              SchoolFee Pro
            </p>
          </div>

          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Sign in to access SchoolFee Pro — your complete private school fee
              management platform.
            </p>
          </div>

          {/* Login button */}
          <div className="space-y-3">
            <Button
              type="button"
              className={cn(
                "w-full h-12 text-base font-semibold relative overflow-hidden",
                "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600",
                "border border-indigo-500/50 shadow-lg shadow-indigo-500/20",
                "transition-all duration-200",
              )}
              onClick={login}
              disabled={isLoading}
              data-ocid="login.submit_button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="false"
                    role="img"
                  >
                    <title>Loading</title>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {isInitializing ? "Loading..." : "Signing in..."}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Sign in with Internet Identity
                </span>
              )}
            </Button>

            {authError && (
              <div
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                data-ocid="login.error_state"
              >
                {authError}
              </div>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
              <span>
                Your identity is secured with Internet Identity — no passwords
                needed.
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <GraduationCap className="h-3.5 w-3.5 flex-shrink-0 text-indigo-400" />
              <span>
                For school staff accounts, contact your system administrator.
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              Built with caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

import { Layout } from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "@/pages/LoginPage";
import { useAppStore } from "@/store/appStore";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-64">
    <div className="animate-spin h-6 w-6 rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useInternetIdentity();
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold">S</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Loading SchoolFee Pro...
          </p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
    </Layout>
  );
}

function PlaceholderPage({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-4">
      <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
        <span className="text-indigo-400 text-xl font-bold">{name[0]}</span>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold font-display text-foreground">
          {name}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          This page is coming soon.
        </p>
      </div>
    </div>
  );
}

const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").catch(() => ({
    default: () => <PlaceholderPage name="Dashboard" />,
  })),
);
const StudentsPage = lazy(() =>
  import("@/pages/StudentsPage").catch(() => ({
    default: () => <PlaceholderPage name="Students" />,
  })),
);
const ClassesPage = lazy(() =>
  import("@/pages/ClassesPage").catch(() => ({
    default: () => <PlaceholderPage name="Classes" />,
  })),
);
const FeeStructurePage = lazy(() =>
  import("@/pages/FeeStructurePage").catch(() => ({
    default: () => <PlaceholderPage name="Fee Structure" />,
  })),
);
const BillsPage = lazy(() =>
  import("@/pages/BillsPage").catch(() => ({
    default: () => <PlaceholderPage name="Bills" />,
  })),
);
const PaymentsPage = lazy(() =>
  import("@/pages/PaymentsPage").catch(() => ({
    default: () => <PlaceholderPage name="Payments" />,
  })),
);
const ReceiptsPage = lazy(() =>
  import("@/pages/ReceiptsPage").catch(() => ({
    default: () => <PlaceholderPage name="Receipts" />,
  })),
);
const ReportsPage = lazy(() =>
  import("@/pages/ReportsPage").catch(() => ({
    default: () => <PlaceholderPage name="Reports" />,
  })),
);
const NotificationsPage = lazy(() =>
  import("@/pages/NotificationsPage").catch(() => ({
    default: () => <PlaceholderPage name="Notifications" />,
  })),
);
const SettingsPage = lazy(() =>
  import("@/pages/SettingsPage").catch(() => ({
    default: () => <PlaceholderPage name="Settings" />,
  })),
);

const rootRoute = createRootRoute({ component: () => <Outlet /> });

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <AuthGuard>
      <DashboardPage />
    </AuthGuard>
  ),
});

const studentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/students",
  component: () => (
    <AuthGuard>
      <StudentsPage />
    </AuthGuard>
  ),
});

const studentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/students/$id",
  component: () => (
    <AuthGuard>
      <PlaceholderPage name="Student Detail" />
    </AuthGuard>
  ),
});

const classesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/classes",
  component: () => (
    <AuthGuard>
      <ClassesPage />
    </AuthGuard>
  ),
});

const feeStructureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/fee-structure",
  component: () => (
    <AuthGuard>
      <FeeStructurePage />
    </AuthGuard>
  ),
});

const billsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bills",
  component: () => (
    <AuthGuard>
      <BillsPage />
    </AuthGuard>
  ),
});

const paymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payments",
  component: () => (
    <AuthGuard>
      <PaymentsPage />
    </AuthGuard>
  ),
});

const receiptsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/receipts",
  component: () => (
    <AuthGuard>
      <ReceiptsPage />
    </AuthGuard>
  ),
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: () => (
    <AuthGuard>
      <ReportsPage />
    </AuthGuard>
  ),
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notifications",
  component: () => (
    <AuthGuard>
      <NotificationsPage />
    </AuthGuard>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <AuthGuard>
      <SettingsPage />
    </AuthGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  indexRoute,
  dashboardRoute,
  studentsRoute,
  studentDetailRoute,
  classesRoute,
  feeStructureRoute,
  billsRoute,
  paymentsRoute,
  receiptsRoute,
  reportsRoute,
  notificationsRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppRoot() {
  const { isDarkMode } = useAppStore();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoot />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

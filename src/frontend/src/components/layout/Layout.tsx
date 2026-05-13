import { Role } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  Bell,
  ChevronRight,
  CreditCard,
  DollarSign,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Receipt,
  Search,
  Settings,
  Sun,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface NavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  roles?: Role[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Students", path: "/students", icon: Users },
  { label: "Classes", path: "/classes", icon: GraduationCap },
  {
    label: "Fee Structure",
    path: "/fee-structure",
    icon: DollarSign,
    roles: [Role.SuperAdmin, Role.SchoolAdmin, Role.Accountant],
  },
  {
    label: "Bills",
    path: "/bills",
    icon: FileText,
    roles: [Role.SuperAdmin, Role.SchoolAdmin, Role.Accountant],
  },
  {
    label: "Payments",
    path: "/payments",
    icon: CreditCard,
    roles: [Role.SuperAdmin, Role.SchoolAdmin, Role.Accountant],
  },
  { label: "Receipts", path: "/receipts", icon: Receipt },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart2,
    roles: [Role.SuperAdmin, Role.SchoolAdmin, Role.Accountant],
  },
  { label: "Notifications", path: "/notifications", icon: Bell },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    roles: [Role.SuperAdmin, Role.SchoolAdmin],
  },
];

function SidebarContent({
  collapsed,
  onClose,
}: { collapsed: boolean; onClose?: () => void }) {
  const { role } = useAuth();
  const { pathname } = useRouterState({ select: (s) => s.location });
  const filteredItems = NAV_ITEMS.filter(
    (item) => !item.roles || !role || item.roles.includes(role),
  );

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 p-4 border-b border-border/40",
          collapsed && "justify-center px-3",
        )}
      >
        <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-bold text-sm text-foreground font-display truncate">
              SchoolFee Pro
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Fee Management
            </p>
          </div>
        )}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto p-1 rounded-lg hover:bg-muted/50 text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav
        className="flex-1 overflow-y-auto p-2 space-y-0.5"
        aria-label="Main navigation"
      >
        {filteredItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/dashboard" && pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              data-ocid={`nav.${item.label.toLowerCase().replace(/ /g, "_")}.link`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isActive && "text-indigo-400",
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {isActive && !collapsed && (
                <ChevronRight className="h-3 w-3 ml-auto text-indigo-400 opacity-60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer role badge */}
      {!collapsed && role && (
        <div className="p-3 border-t border-border/40">
          <div className="px-3 py-2 rounded-xl bg-muted/30 border border-border/30">
            <p className="text-xs text-muted-foreground">Signed in as</p>
            <p className="text-xs font-semibold text-foreground capitalize">
              {role.replace(/([A-Z])/g, " $1").trim()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const {
    isDarkMode,
    setIsDarkMode,
    sidebarOpen,
    setSidebarOpen,
    globalSearch,
    setGlobalSearch,
  } = useAppStore();
  const { user, logout } = useAuth();
  const { data: notifications = [] } = useNotifications();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const { pathname } = useRouterState({ select: (s) => s.location });

  // Sync dark mode to document root
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const pageTitle =
    NAV_ITEMS.find(
      (item) =>
        pathname === item.path ||
        (item.path !== "/dashboard" && pathname.startsWith(item.path)),
    )?.label ?? "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        data-ocid="layout.sidebar"
        className={cn(
          "hidden lg:flex flex-col flex-shrink-0 glass border-r border-border/40 transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-[72px]",
        )}
      >
        <SidebarContent collapsed={!sidebarOpen} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-64 p-0 glass border-r border-border/40"
        >
          <SidebarContent
            collapsed={false}
            onClose={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header
          data-ocid="layout.navbar"
          className="flex-shrink-0 h-14 flex items-center gap-3 px-4 glass border-b border-border/40 bg-card"
        >
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8"
                onClick={() => setMobileOpen(true)}
                data-ocid="layout.mobile_menu_button"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </Sheet>

          {/* Desktop sidebar toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden lg:flex h-8 w-8 text-muted-foreground"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            data-ocid="layout.sidebar_toggle"
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Page title */}
          <h2 className="text-sm font-semibold text-foreground hidden sm:block">
            {pageTitle}
          </h2>

          {/* Search */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                data-ocid="layout.search_input"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search students, bills..."
                className="pl-9 h-8 text-xs bg-muted/30 border-border/40 focus:border-primary/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Dark mode toggle */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => setIsDarkMode(!isDarkMode)}
              data-ocid="layout.theme_toggle"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Notifications */}
            <Link to="/notifications" data-ocid="layout.notifications_button">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground relative"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] bg-red-500 text-white border-0">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-8 gap-2 px-2 text-muted-foreground hover:text-foreground"
                  data-ocid="layout.user_menu_button"
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center flex-shrink-0">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="hidden sm:block text-xs font-medium max-w-20 truncate">
                    {user?.name ?? "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 glass border-border/50"
              >
                <DropdownMenuLabel className="text-xs">
                  <div className="font-semibold text-foreground truncate">
                    {user?.name ?? "User"}
                  </div>
                  <div className="text-muted-foreground font-normal capitalize">
                    {user?.role?.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-destructive focus:text-destructive cursor-pointer"
                  data-ocid="layout.logout_button"
                >
                  <LogOut className="h-3.5 w-3.5 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/types";
import { ChevronRight, Home } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2"
          aria-label="Breadcrumb"
        >
          <Home className="h-3 w-3" />
          {breadcrumbs.map((crumb) => (
            <span
              key={crumb.path || crumb.label}
              className="flex items-center gap-1.5"
            >
              <ChevronRight className="h-3 w-3" />
              {crumb.path ? (
                <a
                  href={crumb.path}
                  className="hover:text-foreground transition-colors duration-200 hover:underline"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-foreground font-medium">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
        )}
      </div>
    </div>
  );
}

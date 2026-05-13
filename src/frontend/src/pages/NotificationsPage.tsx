import { NotificationType } from "@/backend";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarkNotificationRead, useNotifications } from "@/hooks/useBackend";
import type { Notification } from "@/types";
import {
  AlertTriangle,
  Bell,
  BellRing,
  CheckCircle2,
  CreditCard,
  FileText,
  MailCheck,
} from "lucide-react";
import { toast } from "sonner";

function notifIcon(type: NotificationType) {
  switch (type) {
    case NotificationType.PaymentConfirmation:
      return <CreditCard className="h-4 w-4 text-emerald-400" />;
    case NotificationType.BillGenerated:
      return <FileText className="h-4 w-4 text-indigo-400" />;
    case NotificationType.OverdueAlert:
      return <AlertTriangle className="h-4 w-4 text-red-400" />;
    default:
      return <BellRing className="h-4 w-4 text-amber-400" />;
  }
}

function notifColor(type: NotificationType) {
  switch (type) {
    case NotificationType.PaymentConfirmation:
      return "bg-emerald-500/10 border-emerald-500/20";
    case NotificationType.BillGenerated:
      return "bg-indigo-500/10 border-indigo-500/20";
    case NotificationType.OverdueAlert:
      return "bg-red-500/10 border-red-500/20";
    default:
      return "bg-amber-500/10 border-amber-500/20";
  }
}

function notifLabel(type: NotificationType) {
  switch (type) {
    case NotificationType.PaymentConfirmation:
      return "Payment";
    case NotificationType.BillGenerated:
      return "Bill";
    case NotificationType.OverdueAlert:
      return "Overdue";
    case NotificationType.FeeReminder:
      return "Reminder";
    default:
      return "Notification";
  }
}

function formatDate(ts: bigint) {
  const ms = Number(ts);
  if (!ms) return "—";
  return new Date(ms / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function NotificationItem({
  notification,
  onMarkRead,
  isMarkingRead,
}: {
  notification: Notification;
  onMarkRead: (id: bigint) => void;
  isMarkingRead: boolean;
}) {
  return (
    <div
      data-ocid={`notifications.item.${notification.id.toString()}`}
      className={`flex items-start gap-3 p-4 rounded-xl border transition-smooth ${
        notification.isRead
          ? "bg-card border-border/40 opacity-70"
          : "bg-card border-border/60 shadow-subtle"
      }`}
    >
      <div
        className={`h-9 w-9 rounded-xl border flex items-center justify-center shrink-0 ${notifColor(notification.notifType)}`}
      >
        {notifIcon(notification.notifType)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={`text-xs px-1.5 py-0 border ${notifColor(notification.notifType)}`}
            >
              {notifLabel(notification.notifType)}
            </Badge>
            {!notification.isRead && (
              <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
            )}
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatDate(notification.createdAt)}
          </span>
        </div>
        <p className="text-sm text-foreground mt-1.5 leading-relaxed">
          {notification.message}
        </p>
      </div>

      {!notification.isRead && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          data-ocid={`notifications.mark_read.${notification.id.toString()}`}
          disabled={isMarkingRead}
          onClick={() => onMarkRead(notification.id)}
          className="shrink-0 h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary"
          aria-label="Mark as read"
        >
          <MailCheck className="h-3.5 w-3.5 mr-1" />
          Read
        </Button>
      )}
      {notification.isRead && (
        <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
      )}
    </div>
  );
}

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();

  const handleMarkRead = async (id: bigint) => {
    try {
      await markRead.mutateAsync(id);
      toast.success("Notification marked as read");
    } catch {
      toast.error("Failed to mark notification as read");
    }
  };

  const unreadCount = (notifications ?? []).filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6" data-ocid="notifications.page">
      <PageHeader
        title="Notifications"
        subtitle={
          unreadCount > 0
            ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
            : "All caught up!"
        }
        breadcrumbs={[{ label: "Notifications" }]}
      />

      {isLoading ? (
        <div className="space-y-3" data-ocid="notifications.loading_state">
          {Array.from({ length: 5 }, (_, i) => `sk-notif-${i}`).map((k) => (
            <Card key={k} className="glass border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 animate-pulse">
                  <Skeleton className="h-9 w-9 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (notifications ?? []).length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 rounded-xl border border-dashed border-border/50 bg-card"
          data-ocid="notifications.empty_state"
        >
          <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Bell className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold font-display text-foreground">
              No notifications
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              You're all caught up. New alerts will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {(notifications ?? []).map((notification) => (
            <NotificationItem
              key={notification.id.toString()}
              notification={notification}
              onMarkRead={handleMarkRead}
              isMarkingRead={markRead.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}

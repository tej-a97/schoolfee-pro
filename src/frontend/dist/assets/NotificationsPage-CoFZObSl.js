import { c as createLucideIcon, aI as useNotifications, aJ as useMarkNotificationRead, j as jsxRuntimeExports, aK as Bell, s as ue, B as Badge, l as Button, aL as NotificationType, F as FileText, C as CreditCard } from "./index-BCwf3qRa.js";
import { P as PageHeader } from "./PageHeader-BUSvgm_1.js";
import { C as Card, c as CardContent } from "./card-COw9bUv5.js";
import { S as Skeleton } from "./skeleton-BRKo-KLp.js";
import { C as CircleCheck } from "./circle-check-D0U7rHwJ.js";
import { T as TriangleAlert } from "./triangle-alert-7BobXaSH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M22 8c0-2.3-.8-4.3-2-6", key: "5bb3ad" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ],
  ["path", { d: "M4 2C2.8 3.7 2 5.7 2 8", key: "tap9e0" }]
];
const BellRing = createLucideIcon("bell-ring", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8", key: "12jkf8" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }],
  ["path", { d: "m16 19 2 2 4-4", key: "1b14m6" }]
];
const MailCheck = createLucideIcon("mail-check", __iconNode);
function notifIcon(type) {
  switch (type) {
    case NotificationType.PaymentConfirmation:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-emerald-400" });
    case NotificationType.BillGenerated:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-indigo-400" });
    case NotificationType.OverdueAlert:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-400" });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, { className: "h-4 w-4 text-amber-400" });
  }
}
function notifColor(type) {
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
function notifLabel(type) {
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
function formatDate(ts) {
  const ms = Number(ts);
  if (!ms) return "—";
  return new Date(ms / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function NotificationItem({
  notification,
  onMarkRead,
  isMarkingRead
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `notifications.item.${notification.id.toString()}`,
      className: `flex items-start gap-3 p-4 rounded-xl border transition-smooth ${notification.isRead ? "bg-card border-border/40 opacity-70" : "bg-card border-border/60 shadow-subtle"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-9 w-9 rounded-xl border flex items-center justify-center shrink-0 ${notifColor(notification.notifType)}`,
            children: notifIcon(notification.notifType)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs px-1.5 py-0 border ${notifColor(notification.notifType)}`,
                  children: notifLabel(notification.notifType)
                }
              ),
              !notification.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary inline-block" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: formatDate(notification.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mt-1.5 leading-relaxed", children: notification.message })
        ] }),
        !notification.isRead && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            "data-ocid": `notifications.mark_read.${notification.id.toString()}`,
            disabled: isMarkingRead,
            onClick: () => onMarkRead(notification.id),
            className: "shrink-0 h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary",
            "aria-label": "Mark as read",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MailCheck, { className: "h-3.5 w-3.5 mr-1" }),
              "Read"
            ]
          }
        ),
        notification.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-muted-foreground shrink-0 mt-0.5" })
      ]
    }
  );
}
function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();
  const handleMarkRead = async (id) => {
    try {
      await markRead.mutateAsync(id);
      ue.success("Notification marked as read");
    } catch {
      ue.error("Failed to mark notification as read");
    }
  };
  const unreadCount = (notifications ?? []).filter((n) => !n.isRead).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "notifications.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Notifications",
        subtitle: unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}` : "All caught up!",
        breadcrumbs: [{ label: "Notifications" }]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "notifications.loading_state", children: Array.from({ length: 5 }, (_, i) => `sk-notif-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 animate-pulse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-9 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" })
      ] })
    ] }) }) }, k)) }) : (notifications ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4 rounded-xl border border-dashed border-border/50 bg-card",
        "data-ocid": "notifications.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold font-display text-foreground", children: "No notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "You're all caught up. New alerts will appear here." })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (notifications ?? []).map((notification) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      NotificationItem,
      {
        notification,
        onMarkRead: handleMarkRead,
        isMarkingRead: markRead.isPending
      },
      notification.id.toString()
    )) })
  ] });
}
export {
  NotificationsPage as default
};

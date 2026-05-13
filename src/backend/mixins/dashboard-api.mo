import Common "../types/common";
import NotifTypes "../types/notifications";
import NotifLib "../lib/notifications";
import FeeTypes "../types/fees";
import StudentTypes "../types/students";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  students : Map.Map<Common.StudentId, StudentTypes.Student>,
  payments : Map.Map<Common.PaymentId, FeeTypes.Payment>,
  bills : Map.Map<Common.BillId, FeeTypes.Bill>,
) {
  public query func getStats() : async NotifTypes.DashboardStats {
    let allPayments = payments.values()
      .map(func(p) {
        { amount = p.amount; paymentDate = p.paymentDate };
      })
      .toArray();
    let pendingBills = bills.values()
      .filter(func(b) { b.status == #Pending or b.status == #Partial })
      .map(func(b) { { netAmount = b.netAmount } })
      .toArray();
    let overdueBills = bills.values()
      .filter(func(b) { b.status == #Overdue })
      .map(func(b) { { studentId = b.studentId } })
      .toArray();
    NotifLib.getDashboardStats(
      students.size(),
      allPayments,
      pendingBills,
      overdueBills,
      Time.now(),
    );
  };
};

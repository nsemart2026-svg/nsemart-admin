"use client";

import TotalProductSaleCard from "@/components/modules/Dashboard/custom/TotalProductSaleCard";
import CommissionCard from "@/components/modules/Dashboard/custom/CommissionCard";
import WithdrawCard from "@/components/modules/Dashboard/custom/WithdrawCard";
import SrTotalSaleQuantityCard from "../sr/SrTotalQuantitySaleCard";
import { useGetUserCommissionSummaryQuery } from "@/redux/featured/order/orderApi";
import { useSelector } from "react-redux";

export default function SRDashboard() {
  const userId = useSelector((state: any) => state.auth.user?._id);

  // ✅ Fetch commission summary from backend
  const { data: commissionSummary, isLoading } = useGetUserCommissionSummaryQuery(userId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Total product sales - can map totalOrders if needed */}
        <TotalProductSaleCard
          totalAmount={commissionSummary?.totalSaleAmount || 0} // total commission as amount
          totalCount={commissionSummary?.totalQuantity|| 0} // total orders
        />

        {/* Commission card */}
        <CommissionCard
          amount={commissionSummary?.totalCommission || 0}
          rate={commissionSummary?.averagePercentageRate}
        />

        {/* Withdraw card */}
        <WithdrawCard />

        {/* Total sale quantity */}
        <SrTotalSaleQuantityCard
          quantity={commissionSummary?.totalQuantity|| 0} // show completed orders
          unit="orders"
          diffPercent={12.4} // optional
          period="Last 30 days"
        />
      </div>
    </div>
  );
}

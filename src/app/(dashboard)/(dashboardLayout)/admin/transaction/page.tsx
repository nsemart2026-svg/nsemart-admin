import { FilterBar } from "@/components/modules/Dashboard/Transaction/FilterBar";
import { PaymentMethodCard } from "@/components/modules/Dashboard/Transaction/PaymentMethodCard";
import { TransactionTable } from "@/components/modules/Dashboard/Transaction/TransactionTable";
import { StatCard } from "@/components/shared/StatCard";
import { StatCardLight } from "@/components/modules/Dashboard/Transaction/StatCardLight";

const TransactionPage = () => {
  return (
    <div className="p-4 py-6 w-full">
      {/* Filter Bar */}
      <FilterBar />

      {/* Top Section: Stat Cards (auto width) + Payment Card (fills rest) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6 items-start">
        {/* Stat Cards (50% width on xl and up) */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <StatCard />
            <StatCardLight
              title="Completed Transactions"
              value="3,150"
              changePercent={1.5}
            />
            <StatCardLight
              title="Pending Transactions"
              value="150"
              changePercent={0.8}
            />
            <StatCardLight
              title="Failed Transactions"
              value="75"
              changePercent={-1.5}
            />
          </div>
        </div>

        {/* Payment Method (50% width on xl and up) */}
        <div className="w-full">
          <PaymentMethodCard />
        </div>
      </div>

      <TransactionTable></TransactionTable>
    </div>
  );
};

export default TransactionPage;

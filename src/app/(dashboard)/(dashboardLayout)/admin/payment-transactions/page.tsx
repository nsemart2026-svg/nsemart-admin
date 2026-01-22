import StatsCards from "@/components/shared/StatsCards";
import TransactionHistoryTable from "@/components/tables/TransactionHistoryTable";
import { Button } from "@/components/ui/button";
import { statsData } from "@/data/transaction-history-data";
import { Download, Filter } from "lucide-react";
import React from "react";

const PaymentTransactions = () => {
  return (
    <div className="py-6 p-2 sm:p-4">
      <div className="flex justify-end mb-4 gap-2">
        <Button>
          <Download /> Export
        </Button>
        <Button variant={"outline"}>
          <Filter />
          Advanced Filter
        </Button>
      </div>
      <StatsCards items={statsData} />

      <TransactionHistoryTable />
    </div>
  );
};

export default PaymentTransactions;

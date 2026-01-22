import PendingDepositTable from "@/components/tables/PendingDepositTable";
import React from "react";

const PendingDeposit = () => {
  return (
    <div className="py-6 p-2 sm:p-4">
      <h3 className="text-3xl font-semibold mb-2 opacity-90">
        Pending Deposits
      </h3>
      <p className="text-sm opacity-60 mb-8">
        Review and manage deposits awaiting approval
      </p>

      <PendingDepositTable />
    </div>
  );
};

export default PendingDeposit;

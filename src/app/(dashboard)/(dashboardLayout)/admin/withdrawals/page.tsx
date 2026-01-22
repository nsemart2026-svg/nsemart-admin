// import WithdrawalsCategories from "@/components/modules/Dashboard/Withdrawals/WithdrawalsCategories";
import WithdrawalsManagementTable from "@/components/tables/WithdrawalsManagementTable";
import React from "react";

const Withdrawals = () => {
  return (
    <div className="py-6 p-2 sm:p-4">
      <div className="flex justify-end mb-4">

      </div>
      {/* <StatsCards items={statsData} />
      <WithdrawalsCategories items={categoryData} /> */}
      <WithdrawalsManagementTable />
    </div>
  );
};

export default Withdrawals;

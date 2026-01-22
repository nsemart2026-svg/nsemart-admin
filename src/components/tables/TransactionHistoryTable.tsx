import { Button } from "../ui/button";
import ReusableTable from "./ReusableTable";
import {
  transactionsColumns,
  transactionsData,
} from "@/data/transaction-history-data";
import SearchInput from "../shared/SearchInput";

export type TransactionsItem = {
  transactionId: string;
  type: string;
  amount: string;
  customer: string;
  name: string;
  date: string;
  orderId: string;
  status: "Completed" | "Failed" | "Processing" | "Pending" | "Disputed";
};
const TransactionHistoryTable = () => {
  return (
    <section className="mt-8 space-y-4 bg-white p-4 rounded-md">
      <div>
        <h3 className="text-2xl font-semibold mb-2">Transaction History </h3>
        <p className="text-sm text-muted-foreground">
          Monitor all financial transactions and payment activities
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center my-8">
        <SearchInput
          placeholder="Search by transaction ID, customer, or order..."
          className="w-full"
        />

        <div className="flex gap-2 text-gray-500">
          <Button variant="outline">Date Range</Button>
          <Button variant="outline">Type</Button>
          <Button variant="outline">Status</Button>
          <Button variant="outline">Method</Button>
        </div>
      </div>

      <ReusableTable<TransactionsItem>
        data={transactionsData}
        columns={transactionsColumns}
      />
    </section>
  );
};

export default TransactionHistoryTable;

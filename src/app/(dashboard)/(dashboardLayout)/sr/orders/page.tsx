import OrdersTable from "@/components/sr/OrdersTable";

export default function SROrdersPage() {
  return (
    <div className="p-2 md:p-4">
      <h1 className="text-lg md:text-xl font-semibold mb-3">Orders</h1>
      <OrdersTable />
    </div>
  );
}

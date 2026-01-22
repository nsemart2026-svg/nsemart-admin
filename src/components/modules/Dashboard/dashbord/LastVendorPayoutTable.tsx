'use client';

const payouts = Array(10).fill({
  id: '#5089',
  date: '26 July 2025',
  total: 12896,
  action: 'View Detail',
});

export default function LastVendorPayoutTable() {
  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-md p-4 w-full max-w-full">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-base font-semibold">Last Vendor Pay Out</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <span className="font-medium">View All</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Issued Date</th>
              <th className="p-2">Total</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payouts.map((row, idx) => (
              <tr key={idx}>
                <td className="p-2 text-green-600 font-medium">{row.id}</td>
                <td className="p-2">{row.date}</td>
                <td className="p-2">৳ {row.total.toLocaleString()}</td>
                <td className="p-2 text-green-600 font-medium cursor-pointer hover:underline">
                  {row.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

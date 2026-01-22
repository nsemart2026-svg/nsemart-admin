"use client";

export default function TopPerformingBrands() {
  const data = [
    { brand: "Apple", category: "Electronics", revenue: "$485,600", profit: "$155,400", margin: "32.0%", color: "bg-green-500" },
    { brand: "Samsung", category: "Electronics", revenue: "$378,900", profit: "$106,400", margin: "28.1%", color: "bg-green-400" },
    { brand: "Sony", category: "Electronics", revenue: "$289,400", profit: "$72,400", margin: "25.0%", color: "bg-yellow-400" },
    { brand: "Nike", category: "Apparel", revenue: "$234,800", profit: "$75,100", margin: "32.0%", color: "bg-green-500" },
    { brand: "Adidas", category: "Apparel", revenue: "$198,600", profit: "$55,600", margin: "28.0%", color: "bg-green-400" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[24px] font-bold">Top Performing Brands</h2>
        <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          High Revenue
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Revenue</th>
              <th className="py-3 px-4">Profit</th>
              <th className="py-3 px-4">Margin</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {data.map((row, idx) => (
              <tr
                key={row.brand}
                className={idx !== data.length - 1 ? "border-b border-gray-100" : ""}
              >
                <td className="py-3 px-4 font-medium">{row.brand}</td>
                <td className="py-3 px-4">{row.category}</td>
                <td className="py-3 px-4">{row.revenue}</td>
                <td className="py-3 px-4">{row.profit}</td>
                <td className="py-3 px-4">
                  <span
                    className={`${row.color} text-white text-xs font-semibold px-2 py-1 rounded-full`}
                  >
                    {row.margin}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

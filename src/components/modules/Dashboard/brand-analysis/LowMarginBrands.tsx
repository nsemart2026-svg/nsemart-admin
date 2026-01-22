"use client";

export default function LowMarginBrands() {
  const data = [
    { brand: "Generic Tech", category: "Electronics", revenue: "$124,500", profit: "$6,200", margin: "5.0%" },
    { brand: "Budget Plus", category: "Home & Garden", revenue: "$89,200", profit: "$4,500", margin: "5.0%" },
    { brand: "Value Store", category: "Apparel", revenue: "$156,800", profit: "$9,400", margin: "6.0%" },
    { brand: "Basic Brand", category: "Electronics", revenue: "$98,600", profit: "$6,900", margin: "7.0%" },
    { brand: "Economy Choice", category: "Home & Garden", revenue: "$67,400", profit: "$5,400", margin: "8.0%" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[24px] font-bold">Low Margin Brands</h2>
        <span className="bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          Needs Attention
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
                <td className="py-3 px-4 text-red-500 font-medium">{row.profit}</td>
                <td className="py-3 px-4">
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
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

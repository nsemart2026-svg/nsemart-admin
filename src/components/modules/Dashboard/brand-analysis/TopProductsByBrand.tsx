"use client";

export default function TopProductsByBrand() {
  const data = [
    { brand: "Apple", product: "iPhone 15 Pro", revenue: "$128,400", profit: "$45,900", units: 240, margin: "35.8%" },
    { brand: "Apple", product: "MacBook Air M2", revenue: "$89,600", profit: "$26,880", units: 112, margin: "30.0%" },
    { brand: "Samsung", product: "Galaxy S24 Ultra", revenue: "$96,800", profit: "$24,200", units: 192, margin: "25.0%" },
    { brand: "Sony", product: "WH-1000XM5", revenue: "$45,600", profit: "$13,680", units: 152, margin: "30.0%" },
    { brand: "Nike", product: "Air Jordan Retro", revenue: "$38,400", profit: "$15,360", units: 96, margin: "40.0%" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Table Title */}
      <h2 className="text-[24px] font-bold mb-4">Top Products by Brand</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-500 border-b text-sm">
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Revenue</th>
              <th className="py-3 px-4">Profit</th>
              <th className="py-3 px-4">Units</th>
              <th className="py-3 px-4">Margin</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {data.map((row, idx) => (
              <tr
                key={`${row.brand}-${row.product}`}
                className={idx !== data.length - 1 ? "border-b border-gray-100" : ""}
              >
                <td className="py-3 px-4 font-medium">{row.brand}</td>
                <td className="py-3 px-4">{row.product}</td>
                <td className="py-3 px-4">{row.revenue}</td>
                <td className="py-3 px-4">{row.profit}</td>
                <td className="py-3 px-4">{row.units}</td>
                <td className="py-3 px-4">
                  <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
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

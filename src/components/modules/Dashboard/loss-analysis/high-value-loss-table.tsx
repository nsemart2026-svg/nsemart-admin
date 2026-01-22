import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface HighValueLoss {
  product: string;
  category: string;
  quantity: number;
  lossValue: string;
  severity: "High" | "Medium";
}

const data: HighValueLoss[] = [
  { product: "Premium Laptop", category: "Electronics", quantity: 8, lossValue: "$12,800", severity: "High" },
  { product: "Gaming Console", category: "Electronics", quantity: 12, lossValue: "$6,000", severity: "High" },
  { product: "Designer Watch", category: "Accessories", quantity: 5, lossValue: "$5,750", severity: "High" },
  { product: "Professional Camera", category: "Electronics", quantity: 3, lossValue: "$4,200", severity: "Medium" },
  { product: "Tablet Pro", category: "Electronics", quantity: 15, lossValue: "$7,500", severity: "Medium" },
  { product: "Professional Camera", category: "Electronics", quantity: 3, lossValue: "$4,200", severity: "Medium" },
  { product: "Tablet Pro", category: "Electronics", quantity: 15, lossValue: "$7,500", severity: "Medium" },
  { product: "Tablet Pro", category: "Electronics", quantity: 15, lossValue: "$7,500", severity: "Medium" },
];

export function HighValueLossTable() {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        <h2 className="text-xl font-bold text-gray-900">High Value Loss Products</h2>
        <span className="bg-red-500 text-white text-sm font-medium px-4 py-1.5 rounded-full">
          Critical Losses
        </span>
      </div>

      {/* Table with padding */}
      <div className="p-6 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-400 font-medium">Product</TableHead>
              <TableHead className="text-gray-400 font-medium">Category</TableHead>
              <TableHead className="text-gray-400 font-medium">Quantity</TableHead>
              <TableHead className="text-gray-400 font-medium">Loss Value</TableHead>
              <TableHead className="text-gray-400 flex justify-end font-medium">Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i} className="border-b">
                <TableCell className="font-medium text-gray-900">{row.product}</TableCell>
                <TableCell className="text-gray-600">{row.category}</TableCell>
                <TableCell className="text-gray-900">{row.quantity}</TableCell>
                <TableCell
                  className={`font-semibold ${
                    row.severity === "High" ? "text-red-500" : "text-orange-500"
                  }`}
                >
                  {row.lossValue}
                </TableCell>
                <TableCell className="flex justify-end">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      row.severity === "High"
                        ? "bg-red-600 text-white"
                        : "bg-[#DB7706] text-white"
                    }`}
                  >
                    {row.severity}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

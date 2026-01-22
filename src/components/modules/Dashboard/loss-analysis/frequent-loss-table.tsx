import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface FrequentLoss {
  product: string;
  category: string;
  quantity: number;
  lossValue: string;
  type: string;
}

const data: FrequentLoss[] = [
  { product: "Phone Case", category: "Accessories", quantity: 145, lossValue: "$725", type: "Damage" },
  { product: "USB Cables", category: "Electronics", quantity: 234, lossValue: "$1,170", type: "Damage" },
  { product: "Screen Protector", category: "Accessories", quantity: 189, lossValue: "$945", type: "Quality" },
  { product: "Basic Earphones", category: "Electronics", quantity: 167, lossValue: "$835", type: "Returns" },
  { product: "Phone Stand", category: "Accessories", quantity: 98, lossValue: "$490", type: "Damage" },
];

export function FrequentLossTable() {
  return (
    <Card className="rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between  px-6 py-4">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Frequent Loss Products
        </CardTitle>
        <span className="bg-amber-600 text-white text-sm font-medium px-4 py-1.5 rounded-full">
          High Frequency
        </span>
      </CardHeader>

      {/* Table */}
      <CardContent className="p-0">
        <div className="p-6 bg-white">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-gray-400 font-medium">Product</TableHead>
              <TableHead className="px-6 py-3 text-gray-400 font-medium">Category</TableHead>
              <TableHead className="px-6 py-3 text-gray-400 font-medium">Quantity</TableHead>
              <TableHead className="px-6 py-3 text-gray-400 font-medium">Loss Value</TableHead>
              <TableHead className="px-6 py-3 text-gray-400 font-medium">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i} className="border-b last:border-0">
                <TableCell className="px-6 py-4 font-medium text-gray-900">{row.product}</TableCell>
                <TableCell className="px-6 py-4 text-gray-400">{row.category}</TableCell>
                <TableCell className="px-6 py-4 font-medium text-gray-900">{row.quantity}</TableCell>
                <TableCell className="px-6 py-4 font-semibold text-amber-600">{row.lossValue}</TableCell>
                <TableCell className="px-6 py-4">
                  <span className="border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-500 bg-gray-50">
                    {row.type}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}

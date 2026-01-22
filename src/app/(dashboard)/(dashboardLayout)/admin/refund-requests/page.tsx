import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, RotateCcw } from "lucide-react";

const refundData = [
  {
    id: "REF-2024-001",
    account: "PayPal Business",
    amount: "$890 USD",
    date: "2024-01-15",
    status: "Pending",
    description: "Customer refund request - defective product",
  },
  {
    id: "REF-2024-002",
    account: "Stripe Account",
    amount: "$1,340.75 USD",
    date: "2024-01-12",
    status: "Pending",
    description: "Service cancellation refund",
  },
  {
    id: "REF-2024-003",
    account: "Primary Business Account",
    amount: "$450.5 USD",
    date: "2024-01-13",
    status: "Approved",
    description: "Duplicate payment refund - processed",
  },
  {
    id: "REF-2024-004",
    account: "PayPal Business",
    amount: "$2,105 USD",
    date: "2024-01-12",
    status: "Pending",
    description: "Contract termination refund",
  },
];

export default function Component() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          Refund Requests
        </h1>
        <p className="text-sm text-gray-600">
          Manage customer refund requests and processing
        </p>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Refund Requests</CardTitle>
              <Badge variant="secondary" className="text-xs">
                4
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-normal">
                12/06/2024 - 17/06/2024
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transaction ID"
                className="pl-10 max-w-sm"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="font-medium text-gray-700">
                    Transaction ID
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Account
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Amount
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Date
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Description
                  </TableHead>
                  <TableHead className="font-medium text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {refundData.map((refund) => (
                  <TableRow key={refund.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-gray-900">
                      {refund.id}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {refund.account}
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      {refund.amount}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {refund.date}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          refund.status === "Approved" ? "default" : "secondary"
                        }
                        className={
                          refund.status === "Approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        }
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            refund.status === "Approved"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        {refund.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-700 max-w-xs">
                      {refund.description}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Process Refund
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

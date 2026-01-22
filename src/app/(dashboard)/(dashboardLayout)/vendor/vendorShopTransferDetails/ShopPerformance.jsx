import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShopPerformance() {
  const stats = [
    { value: "138", label: "Orders" },
    { value: "567", label: "Products" },
    { value: "$46,621", label: "Revenue" },
    { value: "1,245", label: "Customers" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Shop Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

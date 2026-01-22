import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, Shield } from "lucide-react"

export default function ShippingReturns() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Shipping & Policies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        
        {/* Shipping Methods */}
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">Shipping Methods</p>
            <p className="text-gray-500">Standard, Express, International</p>
          </div>
        </div>

        {/* Processing Time */}
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">Processing Time</p>
            <p className="text-gray-500">1-2 business days</p>
          </div>
        </div>

        {/* Return Policy */}
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">Return Policy</p>
            <p className="text-gray-500">30-day returns for most items</p>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShopDetails() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Shop Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        
        {/* Shop Type */}
        <div>
          <p className="text-gray-400 text-xs font-medium">Shop Type</p>
          <p className="text-gray-900">Electronics & Tech Gadgets</p>
        </div>

        {/* Business Hours */}
        <div>
          <p className="text-gray-400 text-xs font-medium">Business Hours</p>
          <p className="text-gray-900">Mon-Fri: 9:00 AM - 6:00 PM</p>
          <p className="text-gray-900">Sat: 10:00 AM - 4:00 PM</p>
          <p className="text-gray-900">Sun: Closed</p>
        </div>

        {/* Tax Information */}
        <div>
          <p className="text-gray-400 text-xs font-medium">Tax Information</p>
          <p className="text-gray-900">Tax ID: TX-9876543210</p>
        </div>
      </CardContent>
    </Card>
  )
}

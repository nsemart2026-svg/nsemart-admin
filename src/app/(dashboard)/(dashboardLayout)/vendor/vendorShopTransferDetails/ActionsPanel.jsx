import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ActionsPanel() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Actions</CardTitle>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            In Review
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full bg-green-600 hover:bg-green-700">✓ Approve Transfer</Button>
        <Button variant="destructive" className="w-full">✗ Reject Transfer</Button>
        <Button variant="outline" className="w-full bg-transparent">📄 Request More Info</Button>
      </CardContent>
    </Card>
  )
}

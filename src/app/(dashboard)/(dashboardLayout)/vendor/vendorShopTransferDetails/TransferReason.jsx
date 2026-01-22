import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TransferReason() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Transfer Reason</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          I'm transferring this shop to Sarah as I'm relocating and won't be able to manage the business anymore. Sarah
          has been working with me for the past year and is a trusted ally of operations. All financial obligations have
          been settled.
        </p>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Circle } from "lucide-react"

export default function TransferTimeline() {
  const steps = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Transfer Request Submitted",
      desc: "June 10, 2023 - Request submitted by Tech Gadgets Store",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Transfer Fee Payment",
      desc: "Transfer fee of $50.00 was paid by John Doe",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "New Owner Confirmation",
      desc: "Sarah Johnson confirmed to receive request",
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      title: "Admin Review",
      desc: "Pending",
    },
    {
      icon: <Circle className="w-5 h-5 text-gray-300" />,
      title: "Transfer Approval",
      desc: "Pending",
      inactive: true,
    },
    {
      icon: <Circle className="w-5 h-5 text-gray-300" />,
      title: "Transfer Completion",
      desc: "Shop ownership and ownership of the transfer",
      inactive: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Transfer Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              {step.icon}
              <div>
                <p className={`font-medium ${step.inactive ? "text-gray-400" : ""}`}>{step.title}</p>
                <p className={`text-sm ${step.inactive ? "text-gray-400" : "text-gray-500"}`}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

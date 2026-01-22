import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Percent, DollarSign, Globe, Users } from "lucide-react"

export default function TransactionFeesCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Percent className="w-5 h-5" />
          Transaction Fees
        </CardTitle>
        <CardDescription>Configure transaction fees and pricing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <InputSetting 
          icon={<Percent className="w-4 h-4 text-gray-500" />} 
          label="Base Fee Per Sale" 
          id="base-fee" 
          placeholder="2.9" 
        />
        
        <InputSetting 
          icon={<DollarSign className="w-4 h-4 text-gray-500" />} 
          label="Fixed Fee Per Transaction" 
          id="fixed-fee" 
          placeholder="0.30" 
        />
        
        <InputSetting 
          icon={<Globe className="w-4 h-4 text-gray-500" />} 
          label="International Fee (%)" 
          id="international-fee" 
          placeholder="1.5" 
        />
        
        <SwitchSetting 
          icon={<Users className="w-4 h-4 text-gray-500" />} 
          label="Free Trial for Customer" 
          description="Offer free trial periods" 
          id="free-trial" 
        />
      </CardContent>
    </Card>
  )
}

function InputSetting({ icon, label, id, placeholder }: {
  icon: React.ReactNode
  label: string
  id: string
  placeholder: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-2 font-medium">
        {icon}
        {label}
      </Label>
      <Input id={id} placeholder={placeholder} className="bg-white" />
    </div>
  )
}

function SwitchSetting({ icon, label, description, id }: {
  icon: React.ReactNode
  label: string
  description: string
  id: string
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        {icon}
        <div>
          <Label htmlFor={id} className="font-medium">
            {label}
          </Label>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Switch id={id} />
    </div>
  )
}
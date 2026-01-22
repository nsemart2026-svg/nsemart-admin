import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DollarSign, Globe, Settings } from "lucide-react"

export default function PaymentRulesCard() {
    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Payment Rules
                </CardTitle>
                <CardDescription>Configure payment processing rules and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <InputSetting
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    label="Minimum Order Amount"
                    id="min-order"
                    placeholder="10.00"
                    type="number"
                />

                <InputSetting
                    icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                    label="Maximum Order Amount"
                    id="max-order"
                    placeholder="10000.00"
                    type="number"
                />

                <CurrencySetting />

                <SwitchSetting
                    icon={<Settings className="w-4 h-4 text-gray-500" />}
                    label="Auto-capture"
                    id="auto-capture"
                    helpText="Automatically capture payments"
                    defaultChecked
                />
            </CardContent>
        </Card>
    )
}

interface InputSettingProps {
    icon: React.ReactNode
    label: string
    id: string
    placeholder: string
    type?: string
}

function InputSetting({ icon, label, id, placeholder, type = "text" }: InputSettingProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="flex items-center gap-2 font-medium">
                {icon}
                {label}
            </Label>
            <Input
                id={id}
                placeholder={placeholder}
                type={type}
                className="bg-white"
            />
        </div>
    )
}

interface SwitchSettingProps {
    icon: React.ReactNode
    label: string
    id: string
    helpText?: string
    defaultChecked?: boolean
}

function SwitchSetting({ icon, label, id, helpText, defaultChecked = false }: SwitchSettingProps) {
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    {icon}
                    <Label htmlFor={id} className="font-medium">
                        {label}
                    </Label>
                </div>
                {helpText && (
                    <p className="text-xs text-muted-foreground ml-6">
                        {helpText}
                    </p>
                )}
            </div>
            <Switch id={id} defaultChecked={defaultChecked} />
        </div>
    )
}

function CurrencySetting() {
    return (
        <div className="space-y-2 w-full">
            <Label htmlFor="default-currency" className="flex items-center gap-2 font-medium">
                <Globe className="w-4 h-4 text-gray-500" />
                Default Currency
            </Label>
            <Select defaultValue="usd">
                <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="gbp">GBP - British Pound</SelectItem>
                    <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                    <SelectItem value="aud">AUD - Australian Dollar</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
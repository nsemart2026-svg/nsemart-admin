import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Lock, Globe } from "lucide-react"

export default function StripeConfigurationCard() {
    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Stripe Configuration
                </CardTitle>
                <CardDescription>Configure Stripe payment gateway settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <InputSetting
                    icon={<Lock className="w-4 h-4 text-gray-500" />}
                    label="Publish Key"
                    id="publish-key"
                    type="password"
                    placeholder="pk_test_..."
                />
                <InputSetting
                    icon={<Lock className="w-4 h-4 text-gray-500" />}
                    label="Secret Key"
                    id="secret-key"
                    type="password"
                    placeholder="sk_test_..."
                />

                <InputSetting
                    icon={<Globe className="w-4 h-4 text-gray-500" />}
                    label="Webhook Endpoint"
                    id="webhook-endpoint"
                    type="text"
                    placeholder="https://yoursite.com/webhook"
                />

                <SwitchSetting
                    icon={<Settings className="w-4 h-4 text-gray-500" />}
                    label="Test Mode"
                    id="test-mode"
                    helpText="Use Stripe test environment"
                    defaultChecked
                />
            </CardContent>
        </Card>
    )
}

function SwitchSetting({ 
    icon, 
    label, 
    id, 
    helpText, 
    defaultChecked = false 
}: {
    icon: React.ReactNode
    label: string
    id: string
    helpText?: string
    defaultChecked?: boolean
}) {
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

function InputSetting({ 
    icon, 
    label, 
    id, 
    type, 
    placeholder 
}: {
    icon: React.ReactNode
    label: string
    id: string
    type: string
    placeholder: string
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="flex items-center gap-2 font-medium">
                {icon}
                {label}
            </Label>
            <Input id={id} placeholder={placeholder} type={type} className="bg-white" />
        </div>
    )
}
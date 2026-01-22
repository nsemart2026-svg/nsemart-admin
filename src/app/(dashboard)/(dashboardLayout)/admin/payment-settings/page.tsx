import PaymentGatewaysCard from "@/components/payment-settings/PaymentGatewaysCard"
import PaymentRulesCard from "@/components/payment-settings/PaymentRulesCard"
import SecuritySettingsCard from "@/components/payment-settings/SecuritySettingsCard"
import StripeConfigurationCard from "@/components/payment-settings/StripeConfigurationCard"
import TransactionFeesCard from "@/components/payment-settings/TransactionFeesCard"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export default function PaymentSettings() {
    return (
        <div className="w-full mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
            <HeaderSection />

            <PaymentGatewaysCard />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StripeConfigurationCard />
                <PaymentRulesCard />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SecuritySettingsCard />
                <TransactionFeesCard />
            </div>

            <SaveButton />
        </div>
    )
}

function HeaderSection() {
    return (
        <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">Payment Settings</h1>
            <p className="text-sm text-gray-600">Manage your payment gateways and settings</p>
        </div>
    )
}

function SaveButton() {
    return (
        <div className="flex justify-end pt-4">
            <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Save Payment Settings
            </Button>
        </div>
    )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TransferInformation() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Transfer Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Shop Name</p>
                        <p className="font-medium">Tech Gadgets Store</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Transfer Date</p>
                        <p className="font-medium">June 12, 2023</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Current Owner Email</p>
                        <p className="font-medium">john.doe@john.doe@example.com</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">New Owner Email</p>
                        <p className="font-medium">sarah.johnson.sarah@example.com</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Additional Comments</p>
                    <p className="font-medium">Willing 48 hours after approval</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Transfer Value</p>
                    <p className="font-medium text-lg">$50.00 (Paid)</p>
                </div>
            </CardContent>
        </Card>
    )
}

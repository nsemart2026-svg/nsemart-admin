"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

export function SEOToolsCard() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">SEO Tools Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <Label>Google Analytics ID</Label>
                        <Input placeholder="Enter Tracking ID (e.g., UA-XXXXX-Y)" />
                       
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <Label>Google Tag Manager ID</Label>
                        <Input placeholder="Enter Container ID (e.g., GTM-XXXXXX)" />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <Label>Search Console Verification</Label>
                        <Input placeholder=" Verification meta tag Content" />
                        <p className="text-sm text-muted-foreground">Monitor search performance</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <Label>Bing Webmaster Verification</Label>
                        <Input placeholder=" Verification meta tag Content" />
                        <p className="text-sm text-muted-foreground">Bing search optimization</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <Label>Enable Analytics</Label>
                        <p className="text-sm text-muted-foreground">Track website analytics</p>
                    </div>
                    <Switch  defaultChecked />
                </div>
            </CardContent>
        </Card>
    )
}
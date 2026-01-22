"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function SocialMediaMetaCard() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Social Media Meta</CardTitle>
                <p className="text-xs text-muted-foreground">Configure Open Graph and Twitter Card settings</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="og-title">Open Graph Title</Label>
                    <Input id="og-title" placeholder="Social media title" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="og-description">Open Graph Description</Label>
                    <Textarea id="og-description" placeholder="Social media description" className="min-h-[60px]" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="og-image">Open Graph Image URL</Label>
                    <Input id="og-image" placeholder="https://yoursite.com/image.jpg" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="twitter-card">Twitter Handle</Label>
                    <Input id="twitter-card" placeholder="@yourusername" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="twitter-card">Facebook App ID</Label>
                    <Input id="twitter-card" placeholder="12345678" />
                </div>
            </CardContent>
        </Card>
    )
}
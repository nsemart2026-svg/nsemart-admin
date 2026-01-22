"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function MetaInformationCard() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Meta Information</CardTitle>
                <p className="text-sm text-muted-foreground">
                   Configure global meta tags and site information
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input id="meta-title" placeholder="Your Site Title" />
                    <p className="text-xs text-muted-foreground">
                       60 characters recommended
                    </p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea id="meta-description" placeholder="Description your website" className="min-h-[80px]" />
                    <p className="text-xs text-muted-foreground">
                       160 characters recommended
                    </p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="meta-keywords">Meta Keywords</Label>
                    <Input id="meta-keywords" placeholder="keyword1.keyword2.keyword3" />
                    <p className="text-xs text-muted-foreground">
                        Separate keywords with commas
                    </p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="og-url">Canonical URL</Label>
                    <Input id="og-url" placeholder="Enter Open Graph URL (e.g., https://yourdomain.com/page)" />
                </div>
            </CardContent>
        </Card>
    )
}
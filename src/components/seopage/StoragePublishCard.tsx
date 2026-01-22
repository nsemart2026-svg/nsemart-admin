"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "../ui/textarea"

export function StoragePublishCard() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Sitemap & Robots</CardTitle>
                <p className="text-sm text-muted-foreground">Configure sitemap and robots.txt settings</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <Label>Auto-generate Sitemap</Label>
                        <p className="text-sm text-muted-foreground">Automatically create XML sitemap</p>
                    </div>
                    <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                    <Label>Sitemap URL</Label>
                    <Input 
                        placeholder="https://example.com/sitemap.xml" 
                        className="w-full max-w-md"
                    />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <Label>Submit to Search Engines</Label>
                        <p className="text-sm text-muted-foreground">Auto submit sitemap to search engines</p>
                    </div>
                    <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                    <Label>Robots.txt Content</Label>
                    <Textarea 
                        placeholder={`User-agent: *\nDisallow: /private/\nAllow: /`} 
                        className="min-h-[120px] w-full font-mono text-sm"
                    />
                    <p className="text-sm text-muted-foreground">
                        Configure how search engines crawl your site
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
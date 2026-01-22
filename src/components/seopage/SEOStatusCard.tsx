"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SEOStatusCard() {
    const items = [
        { title: "Meta Tags", subtitle: "Title & Description", status: "Configured", color: "bg-green-100 text-green-800" },
        { title: "Analytics", subtitle: "Google Analytics", status: "Pending", color: "bg-yellow-100 text-yellow-800" },
        { title: "Sitemap", subtitle: "XML Sitemap", status: "Active", color: "bg-green-100 text-green-800" },
        { title: "Social Media", subtitle: "Open Graph", status: "Not Set", color: "bg-gray-100 text-gray-800" },
    ]

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">SEO Status Overview</CardTitle>
                <p className="text-sm text-muted-foreground">Current SEO configuration status</p>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="w-full h-[64px] border border-gray-200 rounded-lg px-4 flex items-center justify-between hover:shadow-sm transition"
                        >
                            <div>
                                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                <p className="text-xs text-gray-500">{item.subtitle}</p>
                            </div>
                            <Badge
                                variant="secondary"
                                className={`${item.color} hover:opacity-90 rounded-full px-3 py-1 text-xs font-medium`}
                            >
                                {item.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

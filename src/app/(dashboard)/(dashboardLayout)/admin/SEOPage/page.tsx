"use client"

import { MetaInformationCard } from "@/components/seopage/MetaInformationCard"
import { SaveButton } from "@/components/seopage/SaveButton"
import { SEOStatusCard } from "@/components/seopage/SEOStatusCard"
import { SEOToolsCard } from "@/components/seopage/SEOToolsCard"
import { SocialMediaMetaCard } from "@/components/seopage/SocialMediaMetaCard"
import { StoragePublishCard } from "@/components/seopage/StoragePublishCard"
import { URLStructureCard } from "@/components/seopage/URLStructureCard"


export default function SEOPage() {
    return (
        <div className="w-full mx-auto p-6 space-y-6 w-full">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">SEO Settings</h2>
                <p className="text-sm text-muted-foreground">
                    Optimize your website for search engines
                </p>
            </div>
            <MetaInformationCard />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <SocialMediaMetaCard />
                <SEOToolsCard />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <StoragePublishCard />
                <URLStructureCard />
            </div>

            <SEOStatusCard />
            <SaveButton />
        </div>
    )
}
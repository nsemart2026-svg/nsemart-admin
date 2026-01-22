"use client"
import { Search, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchAndActions({
    searchQuery,
    setSearchQuery,
}: {
    searchQuery: string
    setSearchQuery: (value: string) => void
}) {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
            <div className="relative flex-1 w-full max-w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                    placeholder="Search your product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                />
            </div>
            <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto flex justify-center sm:justify-start"
            >
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </div>
    )
}

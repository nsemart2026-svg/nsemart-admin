
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  icon: LucideIcon
  color: string
}

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <Card className="bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
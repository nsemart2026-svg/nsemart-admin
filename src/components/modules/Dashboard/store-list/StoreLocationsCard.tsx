'use client'

import { Card } from '@/components/ui/card'
import { MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type StoreStatus = 'Active' | 'Maintenance'

type StoreLocationsCardProps = {
  name: string
  location: string
  phone: string
  manager: string
  items: number
  status: StoreStatus
  onViewDetails?: () => void
  onEdit?: () => void
}

export default function StoreLocationsCard({
  name,
  location,
  phone,
  manager,
  items,
  status,
  onViewDetails,
  onEdit,
}: StoreLocationsCardProps) {
  const badgeClasses = cn(
    'text-sm font-medium px-3 py-1 rounded-full',
    status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-900'
  )

  return (
    <Card className="p-8 rounded-xl border w-full max-w-full flex flex-col justify-between shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className={badgeClasses}>{status}</span>
      </div>

      <div className="text-sm text-muted-foreground space-y-1 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{phone}</span>
        </div>
      </div>

      <div className="flex justify-between text-sm text-muted-foreground mb-4">
        <div>
          <p className="text-[13px] text-black">Manager</p>
          <p className="font-medium text-[14px]">{manager}</p>
        </div>
        <div className="text-right">
          <p className="text-[13px] text-black">Items</p>
          <p className="text-2xl font-bold text-foreground">{items}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="rounded-md w-[120px] bg-[#F8F7FD] border-[#E2E2E9] text-sm"
          onClick={onViewDetails}
        >
          View Details
        </Button>
        <button
          onClick={onEdit}
          className="text-sm text-black hover:underline"
        >
          Edit
        </button>
      </div>
    </Card>
  )
}

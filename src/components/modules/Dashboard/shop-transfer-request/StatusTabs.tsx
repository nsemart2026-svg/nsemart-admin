'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export type StatusTabItem = {
  label: string
  count: number
}

type StatusTabsProps = {
  items: StatusTabItem[]
  defaultActive?: string
  onChange?: (status: string) => void
}

export default function StatusTabs({
  items,
  defaultActive,
  onChange,
}: StatusTabsProps) {
  const [active, setActive] = useState(defaultActive || items[0]?.label)

  const handleClick = (label: string) => {
    setActive(label)
    onChange?.(label)
  }

  return (
<div className="w-full overflow-x-auto">
  <div className="flex w-max gap-1 rounded-md border p-1 md:w-full">
    {items.map((item) => (
      <button
        key={item.label}
        onClick={() => handleClick(item.label)}
        className={cn(
          'whitespace-nowrap px-3 py-1.5 text-sm rounded-md transition-all',
          active === item.label
            ? 'bg-black text-white font-medium'
            : 'text-muted-foreground hover:bg-muted'
        )}
      >
        {item.label} ({item.count})
      </button>
    ))}
  </div>
</div>

  )
}

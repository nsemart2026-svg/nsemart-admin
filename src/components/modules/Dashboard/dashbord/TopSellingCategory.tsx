'use client'

import { MoreVertical } from 'lucide-react'

const data = [
  {
    label: 'Fashion',
    value: 4.567,
    color: 'bg-blue-100',
    size: 'w-[90px] h-[90px] sm:w-[130px] sm:h-[130px] md:w-[160px] md:h-[160px]',
    position: 'top-[12%] left-1/2 -translate-x-1/2 z-30',
  },
  {
    label: 'Electronics',
    value: 3.167,
    color: 'bg-green-100',
    size: 'w-[70px] h-[70px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px]',
    position: 'top-[50%] left-[60%] -translate-x-1/2 z-30',
  },
  {
    label: 'Make-up',
    value: 1.845,
    color: 'bg-yellow-100',
    size: 'w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px]',
    position: 'top-[55%] left-[43%] -translate-x-1/2 z-40',
  },
]

export default function TopSellingCategory() {
  return (
    <div className="bg-white dark:bg-card rounded-2xl shadow-md p-4 w-full max-w-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-black dark:text-white">Top Selling Category</h2>
          <p className="text-xs text-muted-foreground">Total 10.4k Visitors</p>
        </div>
        <MoreVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Bubble Chart */}
      <div className="relative h-[200px] sm:h-[260px] md:h-[300px]">
        {data.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.size} ${item.position} 
              rounded-full ${item.color} 
              flex flex-col items-center justify-center text-center 
              text-black dark:text-white transform`}
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-medium">{item.label}</span>
            <span className="text-sm sm:text-base md:text-lg font-bold">{item.value}</span>
            <span className="text-[10px] text-muted-foreground">Per Day</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button className="text-sm font-medium text-muted-foreground hover:underline self-start mt-4">
        View All Category
      </button>
    </div>
  )
}

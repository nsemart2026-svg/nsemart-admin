'use client'

import Image from 'next/image'

export default function Maps() {
  return (
    <div className="relative w-full max-w-full bg-[#0A2D13] rounded-[20px] overflow-hidden p-4 text-white">
      

      {/* World map image */}
      <div className="relative w-full h-[360px]">
        <Image
          src="https://i.ibb.co/mrX9kWWx/Frame-1000005007-1.png"
          alt="World map"
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
}
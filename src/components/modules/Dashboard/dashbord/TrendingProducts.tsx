'use client';

import Image from 'next/image';
import { MoreVertical } from 'lucide-react';

const products = [

  {
    name: 'Sony WH-1000XM5',
    code: '#FXZ-9485',
    image: 'https://i.ibb.co.com/xSDw0L4G/image-31.png',
    price: 1089,
  },
  {
    name: 'iPhone 14',
    code: '#FXZ-9485',
    image: 'https://i.ibb.co.com/BVN9Hhfr/Frame-1000004962.png',
    price: 1399,
  },
  {
    name: 'Levis 501 Jeans',
    code: '#FXZ-8957',
    image: 'https://i.ibb.co.com/kVbdz0CS/Frame-1000004963.png',
    price: 599,
  },
  {
    name: 'Nike Air Zoom Pegasus',
    code: '#FXZ-8959',
    image: 'https://i.ibb.co.com/jPxFVsgm/Frame-1000004992.png',
    price: 1289,
  },
  {
    name: 'Nike Air Zoom Pegasus',
    code: '#FXZ-8959',
    image: 'https://i.ibb.co.com/jPxFVsgm/Frame-1000004992.png',
    price: 1289,
  },
];





  
export default function TrendingProducts() {
  return (
    <div className="w-full  max-w-full bg-white dark:bg-card rounded-xl shadow-md p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold">Trending Products</h2>
          <p className="text-xs text-muted-foreground">Total 10.4k Visitors</p>
        </div>
        <MoreVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Product List */}
      <div className="flex-1 space-y-4 overflow-auto">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap"
          >
            <div className="flex items-center gap-3 min-w-0">
             
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            
              <div className="truncate">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground truncate">Item: {product.code}</p>
              </div>
            </div>
            <div className="text-sm font-medium whitespace-nowrap">৳ {product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ICategory } from "@/types/Category";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

// import required modules
import { Navigation, A11y, Grid } from "swiper/modules";

interface CategoryCardsProps {
  categories: ICategory[];
}

export function CategoryCards({ categories }: CategoryCardsProps) {
  const colors = [
    "bg-red-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
  ];

  function getColorFromId(id: string, colors: string[]) {
    if (!id) return colors[0];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, A11y, Grid]}
        slidesPerView={2}
        grid={{
          rows: 2,
          fill: "row",
        }}
        spaceBetween={16}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="!py-4"
        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        {categories?.map((item) => {
          const color = getColorFromId(item._id, colors);
          return (
            <SwiperSlide
              key={item._id}
              style={{ height: "auto", marginBottom: "16px" }}
            >
              <Card
                className={`w-full h-full cursor-pointer transition-all hover:shadow-md ${color}`}
              >
                <CardContent className="flex items-center gap-3 py-4 px-3">
                  <div className="text-2xl shrink-0">
                    <Image
                      width={50}
                      height={50}
                      src={
                        "https://ps.w.org/gazchaps-woocommerce-auto-category-product-thumbnails/assets/icon-256x256.png"
                      }
                      alt={item.name}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate w-full">
                    {item.name}
                  </span>
                </CardContent>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        aria-label="Previous slide"
        className="swiper-button-prev-custom absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>

      <button
        aria-label="Next slide"
        className="swiper-button-next-custom absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
}

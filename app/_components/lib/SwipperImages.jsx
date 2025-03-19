"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import "./swiperImages.css";

// import required modules
import { EffectCube, Pagination } from "swiper/modules";
import Image from "next/image";

export default function SwiperImages({ images, handleRemoveImages }) {
  return (
    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className="mySwiper "
      >
        {images.map((img, index) => (
          <>
            <SwiperSlide key={index}>
              <button
                onClick={() => handleRemoveImages(index)}
                className="absolute top-0 z-10 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
              <Image
                src={URL.createObjectURL(img)}
                alt={`Slide ${index + 1}`}
                fill
              />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Pagination } from "swiper/modules";
import Image from "next/image";

export default function SwiperImages({ images, handleRemoveImages }) {
  console.log(images);

  return (
    <Swiper
      effect="cube"
      grabCursor={true}
      
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      
      pagination={true}
      modules={[EffectCube, Pagination]}
      className="mySwiper"
    >
        {images.map((img, index) => {
        // تحويل المسار النسبي إلى رابط كامل
        const imgSrc = img.startsWith("uploads")
          ? `https://kinoasis.online/${img}`
          : img;

        console.log(`Image ${index}: ${imgSrc}`);
        return (
          <SwiperSlide key={index}>
            <button
              onClick={() => handleRemoveImages(index)}
              className="absolute top-0 z-10 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            >
              ✕
            </button>
            <Image src={imgSrc} alt={`Slide ${index + 1}`} width={500} height={500} className="mx-auto" unoptimized  style={{maxHeight:"350px",height:"100%"}}/>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

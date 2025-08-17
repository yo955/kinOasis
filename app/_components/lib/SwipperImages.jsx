"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Pagination } from "swiper/modules";

export default function SwiperImages({ images, handleRemoveImages }) {
  // حماية إضافية: إذا images سترينج فيه أكثر من صورة مفصولة بفاصلة أو مسافة
  let safeImages = [];
  if (Array.isArray(images)) {
    safeImages = images.filter(
      (img) => typeof img === "string" || img instanceof File
    );
  } else if (typeof images === "string") {
    // إذا سترينج فيه أكثر من صورة مفصولة بفاصلة أو مسافة
    if (images.includes(",")) {
      safeImages = images.split(",").map((img) => img.trim());
    } else if (images.includes(" ")) {
      safeImages = images.split(" ").map((img) => img.trim());
    } else {
      safeImages = [images];
    }
  }

  // فلترة أي عنصر ليس رابط صورة أو ملف
  safeImages = safeImages.filter(
    (img) =>
      (typeof img === "string" &&
        (img.endsWith(".jpg") ||
          img.endsWith(".jpeg") ||
          img.endsWith(".png") ||
          img.endsWith(".webp") ||
          img.startsWith("http") ||
          img.startsWith("uploads/"))) ||
      img instanceof File
  );

  console.log("Swiper images (safe):", safeImages);

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
      {safeImages.map((img, index) => {
        // ✅ معالجة الصور من السيرفر أو من File
        const imgSrc =
          typeof img === "string"
            ? img.startsWith("http")
              ? img
              : `https://kinoasis.online/${img}`
            : URL.createObjectURL(img);

        return (
          <SwiperSlide key={index}>
            {handleRemoveImages && (
              <button
                onClick={() => handleRemoveImages(index)}
                className="absolute top-0 z-10 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
            )}
            <img
              src={imgSrc}
              alt={`Slide ${index + 1}`}
              className="mx-auto object-cover"
              style={{ maxHeight: "350px", height: "100%" }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

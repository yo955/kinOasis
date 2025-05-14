// components/CustomSwiper.tsx
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// init Swiper:
const CustomSwiper = ({ images, apartment, handleRemoveImages }) => {
  images.map((image, index) => {
    console.log(image.src.startsWith("blob"));
  });
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      //   loop={true}
      spaceBetween={10}
      slidesPerView={1}
      className="w-[400px] flex justify-center items-center"
      //   centeredSlides={true}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          {handleRemoveImages && (
            <button
              onClick={() => handleRemoveImages(index)}
              className="absolute top-0 z-10 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            >
              ✕
            </button>
          )}
          <Image
            src={
              image.src.startsWith("blob")
                ? image.src
                : String(image.src).startsWith("uploads")
                ? `https://kinoasis.online/${image.src}`
                : `https://kinoasis.online/uploads/${
                    apartment.compound + "/" + apartment._id
                  }/images/${image.src}`
            }
            alt={image.alt || `Slide ${index + 1}`}
            width={300}
            height={300}
            className="mx-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;

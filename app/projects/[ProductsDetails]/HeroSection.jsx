"use client";
import useGetCompounds from "@/app/_components/hooks/useGetCompounds";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "./swiper.css";

const HeroSection = () => {
  const { ProductsDetails } = useParams();
  const { compound } = useGetCompounds(ProductsDetails);

  if (!compound) return null;

  const { mainImage, images } = compound || {};
  const hasImages = images && images.length > 0;

  return (
    <section className="relative md:h-screen mb-10 bg-cover bg-center bg-no-repeat border-b-4 border-[#324B71]/20">
      {hasImages ? (
        <Swiper
          navigation
          modules={[Navigation]}
          className="custom-swiper w-full"
        >
          {[mainImage, ...images].map(
            (img, index) =>
              img && (
                <SwiperSlide key={index}>
                  <img
                    src={`https://kinoasis.online/${img}`}
                    alt={`Compound Image ${index + 1}`}
                    className="image_main"
                    loading="lazy"
                  />
                </SwiperSlide>
              )
          )}
        </Swiper>
      ) : (
        <div className="image_main relative w-full h-full">
          <img
            src={`https://kinoasis.online/${compound.mainImage}`}
            alt={compound?.title}
            className="object-contain w-full h-full"
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;

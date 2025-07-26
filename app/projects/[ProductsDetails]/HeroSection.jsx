"use client";
import useGetCompounds from "@/app/_components/hooks/useGetCompounds";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "./swiper.css";
import Image from "next/image";
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
          className="custom-swiper  w-full "
        >
          {[mainImage, ...images].map(
            (img, index) =>
              img && (
                <SwiperSlide key={index}>
                  <Image
                    src={`https://kinoasis.online/${img}`}
                    alt={`Compound Image ${index + 1}`}
                    width={1000}
                    height={1000}
                    className="image_main"
                    priority
                  />
                </SwiperSlide>
              )
          )}
        </Swiper>
      ) : (
        <Image
          src={`https://kinoasis.online/${compound.mainImage}`}
          alt={compound?.title}
          width={1000}
          height={1000}
          className="object-contain"
          priority
        />
      )}
    </section>
  );
};

export default HeroSection;

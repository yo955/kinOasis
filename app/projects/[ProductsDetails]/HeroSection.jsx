"use client";
import useGetCompounds from "@/app/_components/hooks/useGetCompounds";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "./swiper.css"
const HeroSection = () => {
  const { ProductsDetails } = useParams();
  const { compound } = useGetCompounds(ProductsDetails);

  if (!compound) return null; 

  const { mainImage, images } = compound || {};
  const hasImages = images && images.length > 0;

  return (
    <section className="product-details  relative bg-cover bg-center bg-no-repeat">
      {hasImages ? (
        // ✅ إذا كانت هناك صور، يتم عرض السلايدر ويشمل mainImage أولًا ثم باقي الصور
        <Swiper navigation modules={[Navigation]} className="custom-swiper w-full md:h-screen h-[400px]">
          {[mainImage, ...images].map((img, index) => (
            img && ( // التحقق من أن `img` ليست null أو undefined
              <SwiperSlide key={index}>
                <div
                  className="h-screen w-full bg-cover bg-center image_main"
                  style={{ backgroundImage: `url(https://kinoasis.online/${img})`,ackgroundSize:"contain",width:"100%",height:"100%",backgroundRepeat:"no-repeat"
                }}
                />
              </SwiperSlide>
            )
          ))}
        </Swiper>
      ) : (
        // ✅ إذا لم تكن هناك صور داخل `images[]`، يتم عرض `mainImage` فقط
        <div
          className="h-screen w-full bg-cover bg-center image_main"
          style={{
            backgroundImage: mainImage ? `url(https://kinoasis.online/${mainImage})` : "none",
          }}
        />
      )}
    </section>
  );
};

export default HeroSection;

// components/CustomSwiper.tsx
import Image from "next/image";
import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// init Swiper:
const CustomSwiper = ({ images }) => {
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
          <Image
            src={image.src}
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

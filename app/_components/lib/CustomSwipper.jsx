// components/CustomSwiper.tsx
import Image from "next/image";
import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// init Swiper:
const CustomSwiper = ({ images,apartment }) => {
   images.map((image,index)=>{
    console.log(image.src.startsWith("blob"))
   })
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
          // src={
          //   image.src.startsWith("blob")
          //     ? image.src
          //     : `https://kinoasis.online/uploads/${apartment.compound}/${apartment._id}/images/${image.src}`
             
          // }
          src={
            image.src.startsWith("blob")
              ? image.src
              : `https://kinoasis.online/${image.src}`
             
          }
          alt={image.alt || `Slide ${index + 1}`}
          width={300}
          height={300}
          className="mx-auto"
        />
      </SwiperSlide>
        // <SwiperSlide key={index}>
        //   <Image
        //    //src= {`https://kinoasis.online/uploads/${apartment.compound}/${apartment._id}/images/${image.src}`}
        //     src= { image instanceof File ? URL.createObjectURL(image)
        //         : `https://kinoasis.online/uploads/${apartment.compound}/${apartment._id}/images/${image.src}`}
        //     alt={image.alt || `Slide ${index + 1}`}
        //     width={300}
        //     height={300}
        //     className="mx-auto"
        //   />
        // </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import Image from 'next/image';

// const CustomSwiper = ({ images, apartment }) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   return (
//     <Swiper spaceBetween={10} slidesPerView={1} navigation>
//       {images.map((image, index) => (
//         <SwiperSlide key={index}>
//           <Image
//             src={
//               image instanceof File
//                 ? URL.createObjectURL(image)
//                 : `${apiUrl}/uploads/${apartment.compound}/${apartment._id}/images/${image}`
//             }
//             alt={`Image ${index + 1}`}
//             width={600}
//             height={400}
//           />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default CustomSwiper;
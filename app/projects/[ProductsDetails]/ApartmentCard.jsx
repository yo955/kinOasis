"use client";
import { useState } from "react";
import { TbStairs } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { RxBorderTop } from "react-icons/rx";
import Image from "next/image";
import { MdOutlineBedroomParent } from "react-icons/md";
import { LiaCampgroundSolid } from "react-icons/lia";
import { MdOutlineHomeWork } from "react-icons/md";
import { MdOutlineBathroom } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ApartmentCard = ({ apartment }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={togglePopup}
        className="card hover:shadow-lg transition-all duration-150 w-full cursor-pointer font-arabic"
      >
        <div className="relative block rounded-3xl border border-maincolor overflow-hidden shadow-lg">
          <div className="relative w-full h-56">
            <Image
              src={`https://kinoasis.online/${apartment.mainImage}`}
              alt="مشروع عقاري"
              fill
              className="rounded-2xl p-2 bg-center bg-cover"
              sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
            />
          </div>
          <div className="p-1 bg-white">
            <div className="flex flex-col justify-between px-2 mb-4 gap-3">
              <h3 className="text-2xl font-bold text-blue-900">
                {apartment.identity}
              </h3>
              <div className="flex items-center text-blue-900">
                <h1 className="text-xl font-bold text-blue-900">
                  {apartment.floor}
                </h1>
                <TbStairs className="text-2xl text-blue-900" />
              </div>
              <div className="icon flex justify-between gap-5 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-900">{apartment.rooms}</span>
                  <IoBedOutline className="text-2xl text-blue-900" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-900">{apartment.bathrooms}</span>
                  <FaShower className="text-2xl text-blue-900" />
                </div>
                <div className="flex items-center gap-2 pl-2">
                  <span className="text-blue-900">{apartment.space}</span>
                  <RxBorderTop className="text-2xl text-blue-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden font-arabic"
          onClick={togglePopup}
        >
          <div
            className="bg-maincolor rounded-lg p-5 w-11/12 md:w-2/3 lg:w-1/2 relative overflow-x-hidden max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={togglePopup}
              className="absolute top-3 right-3 text-blue-900 hover:text-blue-950 text-2xl "
            >
              &times;
            </button>
            {apartment.images.length > 0 || apartment.video ? (
             <div className=" relative w-full sm:p-2 my-6 md:my-0">
               <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={10}
                slidesPerView={1}
                className="rounded-lg w-full h-auto"
              >
                {/* الصورة الأساسية */}
                <SwiperSlide>
                  <Image
                    src={`https://kinoasis.online/${apartment.mainImage}`}
                    alt="الصورة الرئيسية"
                    layout="responsive"
                    width={1920}
                    height={1080}
                    className="rounded-lg object-contain  w-full md:p-12  h-[300px] " 
                  />
                </SwiperSlide>

                {/* الصور الإضافية */}
                {apartment.images.map((image, index) => (
                  <SwiperSlide key={`image-${index}`}>
                    <Image
                      src={image}
                      alt={`صورة إضافية ${index + 1}`}
                      layout="responsive"
                      width={1920}
                      height={1080}
                      className="rounded-lg object-contain w-full md:p-14  h-[300px]"
                    />
                  </SwiperSlide>
                ))}

                {/* الفيديو الإضافي */}
                {apartment.video && (
                  <SwiperSlide>
                    <video
                      controls
                      className="rounded-lg object-contain md:p-14 md:py-[1.5rem] w-full h-[300px]"
                    >
                      <source src={`https://kinoasis.online/${apartment.video}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </SwiperSlide>
                )}
              </Swiper>
             </div>
            ) : (
              <Image
                src={`https://kinoasis.online/${apartment.mainImage}`}
                alt="الصورة الرئيسية"
                layout="responsive"
                width={1920}
                height={1080}
                className="rounded-lg object-contain w-full md:p-10 h-[300px]"
              />
            )}
            <div>
              <div class="flex items-center gap-2 text-black  justify-center flex-wrap">
                <button class="flex flex-col p-1 cursor-pointer bg-white relative text-center  items-center justify-center gap-2  text-medium font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#06B6D4]  rounded-md px-3">
                <MdOutlineBedroomParent color="#06B6D4" size={25}/>
                  {/* <svg
                    class="lucide lucide-rocket text-cyan-500 dark:text-cyan-400"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#06B6D4"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="22"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  </svg> */}
                  <div>الغرف:{apartment.rooms}</div>
                </button>
                <button class="flex flex-col p-1 cursor-pointer bg-white relative  items-center justify-center gap-2 rounded-md text-medium font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#de9b4e]  px-3">
                  {/* <svg
                    class="lucide lucide-newspaper text-blue-400 dark:text-blue-600"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#60A5FA"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="22"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8v4h-8V6Z"></path>
                  </svg> */}
                     <LiaCampgroundSolid color="#de9b4e"  size={25}/>
                  المساحه:{apartment.space}
                </button>
                <button class="flex flex-col p-1 cursor-pointer bg-white relative items-center justify-center gap-2 rounded-md text-medium font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#59c165]   px-3">
                  {/* <svg
                    class="lucide lucide-sticky-note text-yellow-400 dark:text-yellow-600"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#FACC14"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="22"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path>
                    <path d="M15 3v6h6"></path>
                  </svg> */}
                   <MdOutlineHomeWork color="#59c165"  size={25}/>
                  الطابق:{apartment.floor}
                </button>
                <button class="flex flex-col p-1 cursor-pointer bg-white relative  items-center justify-center gap-2  text-medium font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[rgb(82,80,188)]  rounded-md px-3">
                  {/* <svg
                    class="lucide lucide-star text-orange-400 dark:text-orange-600"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2"
                    stroke="#FB923C"
                    fill="#FB923C"
                    viewBox="0 0 24 24"
                    height="22"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg> */}
                 <MdOutlineBathroom color="rgb(82,80,188" size={25}/>

                  دورات المياه:{apartment.bathrooms}
                </button>
              </div>
            </div>
            <h1 className="text-2xl my-2 text-blue-900 text-center">
              التفاصيل الخاصة بالوحدة السكنية
            </h1>
            <p className="text-secondarycolor flex flex-wrap text-center bg-maincolor" style={{overflowWrap:"anywhere"}}>
              {apartment.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentCard;

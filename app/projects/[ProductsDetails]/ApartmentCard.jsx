"use client";
import { useState } from "react";
import { TbStairs } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { RxBorderTop } from "react-icons/rx";
import Image from "next/image";

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
              src={apartment.mainImage}
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
              className="absolute top-3 right-3 text-blue-900 hover:text-blue-950 text-3xl"
            >
              &times;
            </button>
            {apartment.images.length > 0 || apartment.video ? (
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
                    src={apartment.mainImage}
                    alt="الصورة الرئيسية"
                    layout="responsive"
                    width={1920}
                    height={1080}
                    className="rounded-lg object-contain w-full md:p-14 h-[300px]"
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
                      className="rounded-lg object-contain w-full md:p-14 h-[300px]"
                    />
                  </SwiperSlide>
                ))}

                {/* الفيديو الإضافي */}
                {apartment.video && (
                  <SwiperSlide>
                    <video
                      controls
                      className="rounded-lg object-contain md:p-14 w-full h-[300px]"
                    >
                      <source src={apartment.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </SwiperSlide>
                )}
              </Swiper>
            ) : (
              <Image
                src={apartment.mainImage}
                alt="الصورة الرئيسية"
                layout="responsive"
                width={1920}
                height={1080}
                className="rounded-lg object-contain w-full md:p-10 h-[300px]"
              />
            )}

            <h1 className="text-2xl my-2 text-blue-900">
              التفاصيل الخاصة بالوحدة السكنية
            </h1>
            <p className="text-secondarycolor flex flex-wrap text-center bg-maincolor">
              {apartment.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentCard;

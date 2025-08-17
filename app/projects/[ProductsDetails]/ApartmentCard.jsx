"use client";
import { useState } from "react";
import { TbStairs } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { RxBorderTop } from "react-icons/rx";
import { MdOutlineBedroomParent } from "react-icons/md";
import { LiaCampgroundSolid } from "react-icons/lia";
import { MdOutlineHomeWork, MdOutlineBathroom, MdPriceChange } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";

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

  const statusColors = {
    متاح: "bg-green-600 ",
    قريبا: "bg-blue-500",
    مباع: "bg-red-600",
    محجوز: "bg-orange-500",
    available: "bg-green-600 ",
    soon: "bg-blue-500",
    sold: "bg-red-600",
    booked: "bg-orange-500",
  };

  function translate(status) {
    switch (status) {
      case "available":
        return "متاح";
      case "soon":
        return "قريبا";
      case "sold":
        return "مباع";
      case "booked":
        return "محجوز";
      default:
        return status;
    }
  }

  return (
    <div>
      <div
        onClick={togglePopup}
        className="card hover:shadow-lg transition-all duration-150 w-full cursor-pointer font-arabic"
      >
        <div className="relative block rounded-3xl border border-maincolor overflow-hidden shadow-lg">
          <span
            className={`absolute w-1/4 text-center justify-center inline-table items-center top-6 left-0 z-10 rounded-r-lg px-4 py-1 text-xl uppercase tracking-wide text-maincolor ${
              statusColors[apartment.status]
            }`}
          >
            {translate(apartment.status.toLowerCase())}
          </span>
          <div className="relative w-full h-56">
            <img
              src={`https://kinoasis.online/${apartment.mainImage}`}
              alt="مشروع عقاري"
              className="rounded-2xl p-2 bg-center bg-cover w-full h-full object-cover"
            />
          </div>
          <div className="p-1 bg-white">
            <div className="flex flex-col justify-between px-2 mb-4 gap-3">
              <h3 className="text-2xl font-bold text-blue-900">
                {apartment.identity}
              </h3>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-blue-900">
                  <h1 className="text-xl font-bold text-blue-900">
                    {apartment.floor}
                  </h1>
                  <TbStairs className="text-2xl text-blue-900" />
                </div>
                <div className="flex items-center text-blue-900">
                  <h1 className="text-xl font-bold text-blue-900">
                    {apartment.price}
                  </h1>
                  <IoIosPricetags className="text-2xl text-blue-900" />
                </div>
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
              className="absolute top-3 right-3 text-blue-900 hover:text-blue-950 text-2xl"
            >
              &times;
            </button>
            {apartment.images.length > 0 || apartment.video ? (
              <div className="relative w-full sm:p-2 my-6 md:my-0">
                <Swiper
                  modules={[Navigation]}
                  navigation
                  spaceBetween={10}
                  slidesPerView={1}
                  className="rounded-lg w-full h-auto"
                >
                  {/* الصورة الأساسية */}
                  <SwiperSlide>
                    <img
                      src={`https://kinoasis.online/${apartment.mainImage}`}
                      alt="الصورة الرئيسية"
                      className="rounded-lg object-contain w-full md:p-12 h-[300px]"
                    />
                  </SwiperSlide>

                  {/* الصور الإضافية */}
                  {apartment.images.map((image, index) => (
                    <SwiperSlide key={`image-${index}`}>
                      <img
                        src={
                          String(image).startsWith("uploads")
                            ? `https://kinoasis.online/${image}`
                            : `https://kinoasis.online/uploads/${apartment.compound}/${apartment._id}/images/${image}`
                        }
                        alt={`صورة إضافية ${index + 1}`}
                        className="rounded-lg object-contain w-full md:p-14 h-[300px]"
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
                        <source
                          src={`https://kinoasis.online/${apartment.video}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
            ) : (
              <img
                src={`https://kinoasis.online/${apartment.mainImage}`}
                alt="الصورة الرئيسية"
                className="rounded-lg object-contain w-full md:p-10 h-[300px]"
              />
            )}

            {/* باقي التفاصيل */}
            <div>
              <div className="flex items-center gap-2 text-black justify-center flex-wrap">
                <button className="flex flex-col p-1 cursor-pointer bg-white relative text-center items-center justify-center gap-2 text-medium font-medium rounded-md px-3 hover:bg-[#F5F5F5]">
                  <MdOutlineBedroomParent color="#06B6D4" size={25} />
                  <div>الغرف: {apartment.rooms}</div>
                </button>
                <button className="flex flex-col p-1 cursor-pointer bg-white relative items-center justify-center gap-2 rounded-md px-3 hover:bg-[#F5F5F5]">
                  <LiaCampgroundSolid color="#de9b4e" size={25} />
                  المساحه: {apartment.space}
                </button>
                <button className="flex flex-col p-1 cursor-pointer bg-white relative items-center justify-center gap-2 rounded-md px-3 hover:bg-[#F5F5F5]">
                  <MdOutlineHomeWork color="#59c165" size={25} />
                  الطابق: {apartment.floor}
                </button>
                <button className="flex flex-col p-1 cursor-pointer bg-white relative items-center justify-center gap-2 rounded-md px-3 hover:bg-[#F5F5F5]">
                  <MdOutlineBathroom color="rgb(82,80,188)" size={25} />
                  دورات المياه: {apartment.bathrooms}
                </button>
                <button className="flex flex-col p-1 cursor-pointer bg-white relative items-center justify-center gap-2 rounded-md px-3 hover:bg-[#F5F5F5]">
                  <MdPriceChange color="rgb(82,80,188)" size={30} />
                  سعر الوحدة: {apartment.price}
                </button>
              </div>
            </div>

            <h1 className="text-2xl my-2 text-blue-900 text-center">
              التفاصيل الخاصة بالوحدة السكنية
            </h1>
            <p
              className="text-secondarycolor flex flex-wrap text-center bg-maincolor"
              style={{ overflowWrap: "anywhere" }}
            >
              {apartment.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentCard;

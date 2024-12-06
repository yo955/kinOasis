"use client";
import ApartmentCard from "./ApartmentCard";
import { useState, useEffect } from "react";

const ApartmentsSide = () => {
  const [apartments, setApartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [apartmentsPerPage] = useState(3); // عدد الشقق في كل صفحة

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // جلب البيانات مرة واحدة من الـ API عند تحميل المكون
  useEffect(() => {
    fetch(`${apiUrl}/apartment`)
      .then((res) => res.json())
      .then((data) => {
        setApartments(data);
      })
      .catch((error) => {
        console.error("Failed to fetch apartments:", error);
      });
  }, []);

  // حساب عدد الصفحات بناءً على عدد الشقق وعدد العناصر في الصفحة
  const totalPages = Math.ceil(apartments.length / apartmentsPerPage);

  // تحديد الشقق المعروضة بناءً على الصفحة الحالية
  const currentApartments = apartments.slice(
    (currentPage - 1) * apartmentsPerPage,
    currentPage * apartmentsPerPage
  );

  // التعامل مع الانتقال بين الصفحات
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-5">
        {currentApartments.length > 0 ? (
          currentApartments.map((apartment) => (
            <ApartmentCard key={apartment._id} apartment={apartment} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>

      {/* أزرار التصفح بين الصفحات */}
      <div className="flex justify-between mt-5">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ApartmentsSide;

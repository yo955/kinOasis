"use client";
import { PiBuildings } from "react-icons/pi";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import ApartmentCard from "./ApartmentCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import MapApi from "@/app/_components/lib/MapApi";
import ProjectBrochure from "@/app/_components/lib/BrochureApi";


const Apartments = () => {
  const { ProductsDetails } = useParams();
  const [apartments, setApartments] = useState([]);
  const [compound, setCompound] = useState([]);
  const [error, setError] = useState("");
  const [compoundError, setCompoundError] = useState("");
  const [loading, setLoading] = useState(true);
  const [compoundLoading, setCompoundLoading] = useState(true);

  // حالات pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // عدد العناصر المعروضة في كل صفحة

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  function getApartments() {
    setLoading(true);
    axios
      .get(`${apiUrl}/apartment/${ProductsDetails}`)
      .then((res) => {
        setApartments(res.data);
      })
      .catch(() => {
        setError("حدث خطأ أثناء جلب البيانات");
      })
      .finally(() => setLoading(false));
  }

  function getCompound() {
    setCompoundLoading(true);
    axios
      .get(`${apiUrl}/compound/find/${ProductsDetails}`)
      .then((res) => {
        setCompound(res.data);
      })
      .catch(() => {
        setCompoundError("حدث خطأ أثناء جلب بيانات المجمعات");
      })
      .finally(() => setCompoundLoading(false));
  }

  useEffect(() => {
    if (ProductsDetails) {
      getApartments();
      getCompound();
    }
  }, [ProductsDetails]);

  // تقسيم العناصر بناءً على الصفحة الحالية
  const indexOfLastApartment = currentPage * itemsPerPage;
  const indexOfFirstApartment = indexOfLastApartment - itemsPerPage;
  const currentApartments = apartments.slice(
    indexOfFirstApartment,
    indexOfLastApartment
  );

  // عدد الصفحات
  const totalPages = Math.ceil(apartments.length / itemsPerPage);

  // دوال التنقل بين الصفحات
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="apartments-section my-10">
      <div className="text flex flex-col justify-center mb-4 md:mb-0 items-center w-full px-2 md:px-0 gap-5 lg:gap-8 lg:w-1/2 mx-auto">
        <div className="icons lg:flex justify-center gap-8 block">
          <div className="right flex items-end gap-2 my-3 md:my-0 text-secondarycolor">
            <PiBuildings className="text-5xl " />
            <h1 className="font-light text-3xl flex items-center">
              المباني: <span className="text-3xl font-medium">1</span>
            </h1>
          </div>
          <div className="left flex items-end gap-2 text-secondarycolor">
            <PiBuildingApartmentDuotone className="text-5xl " />
            <h1 className="font-light text-3xl flex items-center">
              الوحدات:{" "}
              <span className="text-3xl font-medium">{apartments.length}</span>
            </h1>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-center text-blue-900">
          حياة الرفاهية في قلب شمال العاصمة
        </h1>
        <h2 className="text-2xl font-normal text-center leading-10 text-secondarycolor">
          استمتع بأسلوب حياة مترفة وفريدة من نوعها في مشروعنا السكني الفاخر،
          وحدات تمليك تجمع بين الرقي والراحة.
        </h2>
        <Link
          href="https://wa.me/966553810363"
          className="text-black transition hover:text-gray-500/75 text-xl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn bg-transparent font-bold border-[2px] flex justify-center items-center text-xl border-blue-900 hover:bg-blue-900 hover:text-maincolor p-4 rounded-full h-[40px] w-[300px] text-blue-900">
            تحدث مع مندوب المبيعات
          </button>
        </Link>
        <ProjectBrochure />
        <h1 className="text-4xl font-extrabold mb-5 text-blue-900">الوحدات</h1>
      </div>

      <div className="cards grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:max-w-screen-lg mx-auto">
        {loading ? (
          <div>جاري التحميل...</div>
        ) : error ? (
          <div>{error}</div>
        ) : currentApartments.length === 0 ? (
          <div>لا توجد وحدات حالياً</div>
        ) : (
          currentApartments.map((apartment) => (
            <ApartmentCard key={apartment._id} apartment={apartment} />
          ))
        )}
      </div>

      {/* أزرار التنقل بين الصفحات */}
      {totalPages > 1 && (
        <div className="pagination flex justify-between max-w-lg my-3 mx-auto gap-4 mt-5 text-secondarycolor">
          <button
            onClick={prevPage}
            disabled={currentPage === 1 || apartments.length === 0}
            className={`btn-pagination border border-maincolor p-2 rounded-md shadow-md ${
              currentPage === 1 || apartments.length === 0 ? "opacity-50" : ""
            }`}
          >
            السابق
          </button>
          <span className=" border border-maincolor p-2 rounded-md shadow-md">
            الصفحة {currentPage} من {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages || apartments.length === 0}
            className={`btn-pagination border border-maincolor p-2 rounded-md shadow-md ${
              currentPage === totalPages || apartments.length === 0
                ? "opacity-50"
                : ""
            }`}
          >
            التالي
          </button>
        </div>
      )}

      <div className="compound-description mt-10 font-arabic my-10">
        {compoundLoading ? (
          <div>جاري تحميل بيانات المجمعات...</div>
        ) : compoundError ? (
          <div>{compoundError}</div>
        ) : compound.length === 0 ? (
          <div></div>
        ) : (
          <div className="address-description ">
            <h1
              key={compound._id}
              className="text-3xl font-bold text-center my-2 w-1/2 mx-auto text-blue-900"
            >
              {compound.address}
            </h1>
            <p className="text-2xl font-normal text-center my-5 w-full px-2 lg:px-0 lg:w-1/2 mx-auto leading-8 text-secondarycolor">
              {compound.description}
            </p>
          </div>
        )}
      </div>

      <div className="h-[450px]">
        <MapApi
          className="w-full md:w-[70%] lg:w-[50%] mx-auto"
          radius="20px"
        />
      </div>
    </section>
  );
};

export default Apartments;

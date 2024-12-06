"use client";
import ProjectsCard from "../_components/Featured/FeaturedCard";
import { useState, useEffect } from "react";
import axios from "axios";
import AosWrapper from "../_components/lib/ScrollAnimation";
import Link from "next/link";

const FeatureProjects = () => {
  const [filter, setFilter] = useState("all");
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // عدد العناصر في كل صفحة
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/compound`);
        setProductsData(response.data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };

    fetchProducts();
  }, []);

  // فلترة المشاريع بناءً على الفلتر المحدد
  const filteredProducts = productsData.filter((product) => {
    if (filter === "all") return true;
    return product.status === filter;
  });

  // تحديد المنتجات للصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4 my-10">
      {/* Buttons section */}
      <div className="flex flex-wrap justify-center items-center text-center mb-5 text-lg font-bold gap-4 font-arabic">
        <button
          className={`px-4 py-2 rounded-md transition-all duration-300  ${
            filter === "all"
              ? "bg-blue-900"
              : "bg-gray-200 hover:bg-blue-900"
          }`}
          onClick={() => setFilter("all")}
        >
          الكل
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            filter === "sold"
              ? "bg-blue-900"
              : "bg-gray-200 hover:bg-blue-900"
          }`}
          onClick={() => setFilter("sold")}
        >
          مباع
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            filter === "soon"
              ? "bg-blue-900"
              : "bg-gray-200 hover:bg-blue-900"
          }`}
          onClick={() => setFilter("soon")}
        >
          قريبا
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            filter === "available"
              ? "bg-blue-900"
              : "bg-gray-200 hover:bg-blue-900"
          }`}
          onClick={() => setFilter("available")}
        >
          متاح
        </button>
      </div>

      {/* Cards grid */}
      <AosWrapper>
        <div data-aos="fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 font-arabic">
            {currentItems.map((product) => {
              let link = "";
              if (product.status === "available" || product.status === "sold") {
                link = `/projects/${product._id}?image=${product.mainImage}`;
              }

              return (
                <Link prefetch={true} href={link} key={product._id}>
                  <ProjectsCard
                    status={product.status}
                    imageUrl={product.mainImage}
                    location={product.location}
                    projectTitle={product.title}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </AosWrapper>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 rounded-md transition-all duration-300 ${
              currentPage === index + 1
                ? "bg-orange-300"
                : "bg-gray-200 hover:bg-orange-300"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeatureProjects;

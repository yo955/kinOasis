"use client";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import AosWrapper from "@/app/_components/lib/ScrollAnimation";
import Card from "./FeaturedCard";
import Link from "next/link";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/compound`);

        setProducts(response.data.slice(0, 3)); // Get only the first 3 products
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError("");
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchProducts();
  }, [apiUrl]);

  const CardJsx = products.map((item, index) => {
    const status = item.status;
    let link = "";
    if (status == "available" || status == "sold") {
      link = `/projects/${item._id}?image=${item.mainImage}`;
    }
    return (
      <AosWrapper key={index}>
        <div data-aos="zoom-in" key={item._id}>
          <Link prefetch={true} href={link}>
            <Card
              status={item.status}
              imageUrl={item.mainImage}
              location={item.location}
              projectTitle={item.title}
            />
          </Link>
        </div>
      </AosWrapper>
    );
  });

  return (
    <section className="mt-16 pb-12">
      <div className="header flex items-center justify-between container mb-10 font-arabic font-bold">
        <h1 className="text-blue-900 text-3xl ">
          مشاريعنا
        </h1>
        <Link prefetch={true} href="/projects">
          <h1 className="text-blue-900 font-bold text-2xl from-maincolor border-b-2 border-blue-900 cursor-pointer flex items-center">
            جميع المشاريع <FaArrowLeft className="m-1" />
          </h1>
        </Link>
      </div>

      {loading ? (
        <div className="loading text-center">
          <p>جارٍ التحميل...</p>
        </div>
      ) : error ? (
        <div className="error text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <div className="cards grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 container">
          {CardJsx}
        </div>
      )}
    </section>
  );
};

export default Featured;

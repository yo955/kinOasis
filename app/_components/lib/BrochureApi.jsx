"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
export default function ProjectBrochure() {
  const [brochures, setBrochures] = useState([]); // مصفوفة لتخزين الروابط
  const { ProductsDetails } = useParams();
  useEffect(() => {
    // استدعاء API لجلب روابط البروشور
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    axios
      .get(`${apiURL}/compound/find/${ProductsDetails}`)
      .then((response) => {
        setBrochures(response.data.pdf);
        // تأكد من أن البيانات مصفوفة
      })
      .catch((error) => {
        console.error("Error fetching brochure links:", error);
      });
  }, []);

  return (
    <div className="text-center mt-6">
      <Link
        href={brochures}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-900 w-40 h-10 font-arabic flex justify-center items-center hover:bg-blue-950 text-white font-bold py-2 px-4 rounded my-2 shadow-md shadow-blue-900"
      >
        عرض البروشور
      </Link>
    </div>
  );
}

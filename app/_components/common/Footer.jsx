import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import StaticBrochure from "@/app/_components/lib/StatickProfile";
const Footer = () => {
  return (
    <footer className="bg-[url('/cover.jpg')] bg-cover bg-center text-white py-20 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="flex flex-col items-center order-3 md:order-1">
          <h3 className="text-xl font-bold font-arabic mb-4">تابعنا</h3>
          <div className="flex justify-around items-center w-1/4">
            <FaFacebook className="text-2xl" />
            <FaInstagram className="text-2xl" />
            <FaTwitter className="text-2xl" />
          </div>
          <StaticBrochure className="bg-maincolor hover:bg-blue-950 hover:text-maincolor text-blue-900 font-arabic font-bold py-2 px-4 rounded shadow-md shadow-white hover:shadow-blue-900" />
        </div>
        <div className="flex flex-col items-center order-2 font-arabic font-bold">
          <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
          <ul>
            <li>
              <Link href="/" prefetch={true} className="hover:underline">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="projects" prefetch={true} className="hover:underline">
                مشاريعنا
              </Link>
            </li>
            <li>
              <Link href="about-us" prefetch={true} className="hover:underline">
                من نحن
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center order-1 md:order-3 font-arabic">
          <h3 className="text-xl  mb-4">تواصل معنا</h3>
          <Link
            href="https://wa.me/966553810363"
            className="text-white transition hover:text-gray-500/75 text-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-blue-500 font-bold text-4xl mb-5 hover:text-blue-700" />
          </Link>
          <Link
            href="https://wa.me/966553810363"
            className="text-white transition hover:text-gray-500/75 text-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p> 966553810363+</p>
          </Link>
          {/* <p>info@nomu.com.sa</p> */}
        </div>
      </div>
      <div className="text-center mt-8 font-arabic font-medium">
        <p>© 2024 Kin Oasis. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

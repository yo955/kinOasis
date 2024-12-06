import React from "react";
import AboutCard from "./AboutCard";
import { FaHouse } from "react-icons/fa6";
import AosWrapper from "../_components/lib/ScrollAnimation";
import Link from "next/link";
import Image from "next/image";
const FeatureAbout = () => {
  const CardContent = [
    {
      title: "تصاميم عصرية",
      description: "نقدم تصاميم تجمع بين الإبداع والوظائف العملية",
      Icon: <Image src="/1.png" alt="icon" width={80} height={80} />,
    },
    {
      title: "جودة استثنائية",
      description:
        "نلتزم بأعلى معايير الجودة في جميع جوانب مشاريعنا، من التصميم إلى التنفيذ",
      Icon: <Image src="/2.png" alt="icon" width={80} height={80} />,
    },
    {
      title: "بيئة متكاملة",
      description: "نبني مجتمعات متكاملة توفر المرافق والخدمات لحياة ميسرة",
      Icon: <Image src="/3.png" alt="icon" width={80} height={80} />,
    },
    {
      title: "تجربة سكن فريدة",
      description: "نسعى لتقديم تجربة سكن تجمع بين الاسترخاء والتميز",
      Icon: <Image src="/4.png" alt="icon" width={80} height={80} />,
    },
  ];

  const CardJsx = CardContent.map((item, index) => {
    return (
      <AboutCard
        key={index}
        title={item.title}
        description={item.description}
        Icon={item.Icon}
      />
    );
  });

  return (
    <section className="featured container mx-auto mb-20 px-4 font-arabic">
      <div className="grid lg:grid-cols-2 grid-cols-1 items-stretch gap-8">
        {/* النص والمحتوى على اليسار */}
        <AosWrapper>
          <div data-aos="fade-left">
            <div className="bg-maincolor text-center md:text-right gap-2 md:gap-0 w-full p-6 lg:p-8 rounded-xl flex flex-col justify-evenly h-full">
              <div>
                <h1 className="font-extrabold text-blue-900 text-2xl md:text-4xl mb-5 ">
                  مميزات مشاريعنا
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-secondarycolor font-bold">
                  مشاريعنا المميزة تجمع بين تصاميم مبتكرة ووظائف عملية، مع
                  التركيز على تقديم جودة عالية تلبي تطلعاتك. نحن نبني بيئات
                  متكاملة تتضمن المرافق والخدمات التي تضفي راحة ورفاهية على
                  حياتك. مواقعنا استراتيجية لضمان الوصول السهل إلى مختلف
                  المناطق، ونستخدم أحدث التقنيات لتعزيز راحتك وأمانك. بالإضافة
                  إلى فرص الاستثمار المجزية التي نقدمها، نسعى دائمًا لتقديم
                  تجربة سكن استثنائية تجمع بين الاسترخاء والتميز.
                </p>
              </div>
              <Link prefetch={true} href="/projects">
                <button className="text-maincolor bg-blue-900 rounded-xl py-2 px-4 mt-2 lg:w-40 md:py-3 md:px-4 border text-xl font-bold">
                 لرؤية مشاريعنا
                </button>
              </Link>
            </div>
          </div>
        </AosWrapper>

        {/* الكروت على اليمين */}
        <AosWrapper>
          <div data-aos="fade-right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full">
              {CardJsx}
            </div>
          </div>
        </AosWrapper>
      </div>
    </section>
  );
};

export default FeatureAbout;

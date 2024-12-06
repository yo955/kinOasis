"use client";
import { useSearchParams } from "next/navigation";
const HeroSection = () => {
  const searchParams = useSearchParams();
  const image = searchParams.get("image");
 

  return (
    <section
      className="product-details relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"></div>
    </section>
  );
};

export default HeroSection;

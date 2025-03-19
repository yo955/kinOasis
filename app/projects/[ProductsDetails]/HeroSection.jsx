"use client";
import useGetCompounds from "@/app/_components/hooks/useGetCompounds";
import { useSearchParams } from "next/navigation";
const HeroSection = () => {
  const searchParams = useSearchParams();
  const image = searchParams.get("image");
  const { compounds } = useGetCompounds();

  return (
    <section
      className="product-details relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${"https://kinoasis.online/" + image})`,
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

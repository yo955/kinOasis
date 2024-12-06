import Category from "./_components/Category/Category";
import Featured from "./_components/Featured/Featured";
import HeroSection from "./_components/Hero/HeroSection";
import Services from "./_components/Services/Services";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Featured/>
      <Services/>
      <Category/>
    </>
  );
}

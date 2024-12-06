import Link from "next/link";
import StaticBrochure from "../_components/lib/StatickProfile";
const HeroAbout = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(aboutus.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-[#1118278b] ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div
        className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:justify-center
       lg:px-8"
      >
        <div className="max-w-5xl text-center ltr:sm:text-left rtl:sm:text-center w-full">
          <h1 className="text-4xl font-black text-white sm:text-6xl ">
            عن كن أويسس
          </h1>

          <p className="mt-4 lg:w-full leading-loose text-[#e2ab95] sm:text-xl/relaxed font-medium">
            هي شركة سعودية متخصصة في التطوير والاستثمار العقاري، تقدم مشاريع
            متكاملة تجمع بين التصاميم العصرية <br />
            التخطيط الذكي، والجودة العالية، لتلبية احتياجات الناس وتحسين أسلوب
            حياتهم
          </p>

          <div className="mt-8 flex flex-wrap flex-col gap-4 text-center">
            <Link
              prefetch={true}
              href="/projects"
              className="block w-full rounded bg-transparent border border-white px-12 py-3 font-medium text-white shadow-md hover:bg-blue-950 focus:outline-none focus:ring text-xl active:bg-slate-700 sm:w-auto mx-auto shadow-blue-100  "
            >
              لرؤية مشاريعنا
            </Link>
            <StaticBrochure className="block w-full md:w-fit rounded bg-transparent border border-white px-12 py-3 font-medium text-white hover:bg-blue-950 focus:outline-none focus:ring text-xl active:bg-slate-700 sm:w-auto mx-auto shadow-md shadow-blue-300 " />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;

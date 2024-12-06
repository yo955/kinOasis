import Link from "next/link";
import AosWrapper from "@/app/_components/lib/ScrollAnimation";
import StaticBrochure from "@/app/_components/lib/StatickProfile";

const Category = () => {
  return (
    <AosWrapper>
      <div data-aos="fade-up">
        <section className="category container my-40 font-arabic font-bold ">
          <div className="w-full rounded-2xl py-8 bg-maincolor mx-auto flex flex-col items-center justify-around p-4 border shadow-md">
            <h1 className="text-2xl md:text-3xl text-center m-5 text-blue-900">
              مهتم بمشاريعنا القادمة؟
            </h1>
            <Link
              href="https://wa.me/966553810363"
              className="text-white transition hover:text-gray-500/75 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn block w-40 md:w-52 rounded-lg p-2 font-bold text-xl lg:text-2xl h-12 bg-secondarycolor border border-[#e2ab95] z-10 text-maincolor hover:bg-secondarycolor hover:text-maincolor transition duration-300 shadow-md shadow-secondarycolor  ">
                تواصل معنا
              </button>
            </Link>
            {/* Prochure */}
              <StaticBrochure className="bg-blue-900 hover:bg-blue-950 text-white font-arabic font-bold py-2 px-4 rounded shadow-md shadow-blue-900"/>
            {/* Prochure */}
          </div>
        </section>
      </div>
    </AosWrapper>
  );
};

export default Category;

import Image from "next/image";

const ApartmentCard = ({ apartment }) => {
  return (
    <div className="card hover:shadow-lg transition-all duration-150 my-3 ">
      <div className="relative block rounded-3xl border border-gray-100 overflow-hidden shadow-lg">
        <span
          className={`absolute w-1/4 text-center  justify-center inline-table items-center  top-6 left-1 z-10 rounded-r-lg px-4 py-1 text-xl font-medium uppercase tracking-wide text-white `}
        ></span>

        <div className="relative w-full h-56 ">
          <Image
            src={apartment.mainImage}
            alt="مشروع عقاري"
            fill
            className="rounded-2xl p-2 object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
          />
        </div>

        <div className="p-1 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 ">
              {apartment.title}
            </h3>
            <div className="flex items-center text-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;

import { IoLocationSharp } from "react-icons/io5";
import Image from "next/image";

const Card = ({ status, imageUrl, location, projectTitle }) => {
  const statusColors = {
    متاح: "bg-green-600 ",
    قريبا: "bg-yellow-500",
    مباع: "bg-red-600",
    available: "bg-green-600 ",
    soon: "bg-yellow-500",
    sold: "bg-red-600",
  };
  function translate(status) {
    switch (status) {
      case "available":
        status = "متاح";
        break;
      case "soon":
        status = "قريبا";
        break;
      case "sold":
        status = "مباع";
        break;

      default:
        break;
    }
    return status;
  }
  return (
    <div className="card transition-all duration-150 bg-transparent">
      <div className="relative rounded-3xl  block border border-maincolor overflow-hidden font-arabic font-bold">
        <span
          className={`absolute w-1/4 text-center  justify-center inline-table items-center top-6 left-0 z-10 rounded-r-lg px-4 py-1 text-xl uppercase tracking-wide text-maincolor  ${statusColors[status]}`}
        >
          {translate(status.toLowerCase())}
        </span>

        <div className="relative w-full h-56 bg-maincolor mx-auto">
          <Image
            src={imageUrl}
            alt="مشروع عقاري"
            fill
            className="rounded-t-2xl object-cover bg-center"
            priority
            sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
          />
        </div>

        <div className="py-2 px-2 bg-maincolor ">
          <div className="flex justify-between items-center mb-4 my-auto">
            <h3 className="text-xl font-black text-blue-900 ">
              {projectTitle}
            </h3>
            <div className="flex items-center font-black text-xl text-secondarycolor">
              <IoLocationSharp className="mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

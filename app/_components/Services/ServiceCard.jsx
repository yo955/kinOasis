import Image from "next/image";

const ServiceCard = ({ title, description, imageSrc }) => {
  return (
    <div className="w-full max-w-[300px] mx-auto bg-maincolor border border-maincolor rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out min-h-[230px] font-arabic">
      <div className="flex flex-col items-center">
        <div className=" overflow-hidden w-20 h-20  ">
          <Image
            src={imageSrc}
            alt={title}
            width={80} 
            height={80}
            className="object-cover w-full h-full" 
          />
        </div>

        <h2 className="mt-4 text-xl font-bold text-blue-900">{title}</h2>
        <p className="mt-2 text-secondarycolor font-bold text-center ">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;

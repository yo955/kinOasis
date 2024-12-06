const AboutCard = ({ title, description, Icon }) => {
  return (
    <div className="w-full max-w-[300px] mx-auto bg-transparent border rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out min-h-[230px] font-arabic ">
      <div className="flex flex-col items-center text-center">
        {/* الأيقونة داخل دائرة */}
        <div className="overflow-hidden flex items-center justify-center">
          {Icon}
        </div>

        {/* العنوان */}
        <h2 className="mt-4 text-xl font-bold text-blue-900 lg:text-2xl">
          {title}
        </h2>

        {/* الوصف */}
        <p className="mt-2 text-secondarycolor font-bold  w-full">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;

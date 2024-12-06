import ServiceCard from "./ServiceCard";
import AosWrapper from "@/app/_components/lib/ScrollAnimation";
const Services = () => {
  const services = [
    {
      title: "التطوير",
      description: "تحويل الأفكار العقارية إلى واقع ملموس.",
      imageSrc: "/service-1.png",
    },
    {
      title: "الاستثمار",
      description: "فرص استثمارية عقارية تناسب احتياجات السوق.",
      imageSrc: "/service-2.png",
    },
    {
      title: "التسويق",
      description: "نساعدك في تسويق العقارات لتحقيق أفضل المبيعات.",
      imageSrc: "/service-3.png",
    },
    {
      title: "إدارة الأملاك",
      description:
        "نقدم خدمات إدارة عقارية متكاملة لضمان أفضل عوائد استثمارية.",
      imageSrc: "/service-4.png",
    },
  ];

  return (
    <section className="services">
      <div className="title text-center mb-8 mt-20 font-arabic">
        <AosWrapper>
          <div data-aos="fade-up">
            <h1 className="font-bold text-blue-900  text-3xl">خدماتنا</h1>
          </div>
        </AosWrapper>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4 container mb-40">
        {services.map((service, index) => (
          <AosWrapper key={index}>
            <div data-aos="fade-right">
              <ServiceCard
                title={service.title}
                description={service.description}
                imageSrc={service.imageSrc}
              />
            </div>
          </AosWrapper>
        ))}
      </div>
    </section>
  );
};

export default Services;

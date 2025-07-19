import dynamic from "next/dynamic";
import Category from "../_components/Category/Category";
import FeatureProjects from "./FeatureProjects";
import Services from "../_components/Services/Services";
const MapComponent = dynamic(() => import("../_components/lib/MapComponent"), {
  ssr: false,
});

const Projects = () => {
  return (
    <div>
      <div className="h-[450px] font-arabic">
        <MapComponent width="100%" />
      </div>
      <FeatureProjects />
      <Services/>
      <Category />
    </div>
  );
};

export default Projects;

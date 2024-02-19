import { IAcademies } from "@/utils/type.dt";
import AcademyCard from "./AcademyCard2";

interface ComponentProps {
  data: IAcademies;
}

const AcademyLayer: React.FC<ComponentProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-stretch mt-10">
      {data.academies.map((academy) => (
        <AcademyCard key={academy._id} academy={academy} />
      ))}
    </div>
  );
};

export default AcademyLayer;

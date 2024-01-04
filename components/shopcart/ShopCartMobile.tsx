import Image from "next/image";
import { coursesData } from "../../data/courses";

const ShopCartMobile: React.FC = () => {
  const firstCourse = coursesData[0];

  return (
    <div className="px-5 mt-10">
      <div className="flex items-center w-full gap-5">
        <Image
          className="w-20 rounded-md"
          alt=""
          width={0}
          height={0}
          src={firstCourse.imageSrc}
        />
        <span className="text-[#321463] font-medium">{firstCourse.title}</span>
      </div>
      <div className="flex items-center justify-end gap-5">
        <h1 className="text-start text-[#4F547B] line-through">
          ${firstCourse.originalPrice}
        </h1>
        <p className="text-start text-[#321463] font-medium text-2xl">
          ${firstCourse.discountedPrice}
        </p>
      </div>
    </div>
  );
};

export default ShopCartMobile;

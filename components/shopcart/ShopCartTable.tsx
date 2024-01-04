import Image from "next/image";
import { LiaTimesSolid } from "react-icons/lia";

interface CourseData {
  imageSrc: string;
  title: string;
  originalPrice: number;
}

interface TableProps {
  coursesData: CourseData[];
}

const ShopCartTable: React.FC<TableProps> = ({ coursesData }) => {
  return (
    <div className="w-full flex justify-center">
      <table className="mt-14 w-5/6">
        <thead className="bg-[#F5F7FE] text-[#C5165D] font-medium h-20 rounded-md">
          <tr>
            <th className="text-start pl-10">Product</th>
            <th className="px-10 w-1/6 text-start">Price</th>
            <th className="px-10 w-1/6 text-start">Subtotal</th>
            <th className="px-10 w-1/6 text-start">Remove</th>
          </tr>
        </thead>
        <tbody>
          {coursesData.map((course, i) => (
            <tr key={i} className="border-b border-[#EDEDED]">
              <td className="flex items-center gap-5 pl-10 py-2 w-fit px-5">
                <Image
                  className="w-20 rounded-md"
                  alt=""
                  width={0}
                  height={0}
                  src={course.imageSrc}
                />
                <span className="text-[#321463] font-medium">
                  {course.title}
                </span>
              </td>
              <td className="w-1/6 px-10 text-start text-[#4F547B]">
                ${course.originalPrice}
              </td>
              <td className="w-1/6 px-10 text-start text-[#321463] font-medium">
                ${course.originalPrice}
              </td>
              <td className="w-1/6 px-16 text-base text-[#1A3454]">
                <LiaTimesSolid className="w-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopCartTable;

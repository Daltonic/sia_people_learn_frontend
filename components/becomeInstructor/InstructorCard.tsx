import Image from "next/image";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";

interface InstructorProps {
  data: any;
  index?: number;
}

const InstructorCard: React.FC<InstructorProps> = ({ data, index }) => {
  return (
    <div className="w-full sm:w-64 mb-10">
      <div className="relative">
        <div className="w-full h-72">
          <Image
            width={0}
            height={0}
            src={data.image}
            alt="image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {data.socialProfile?.map(
            (itm: { url: string; icon: string }, i: number) => (
              <Link key={i} href={itm.url ? itm.url : "#"}>
                <i className={`${itm.icon} text-white`}></i>
              </Link>
            )
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <h4 className="font-bold">
          <Link href={`/instructor/${data.id}`}>
            <p className="font-medium text-[#321463] text-lg">{data.name}</p>
          </Link>
        </h4>
        <p className="text-sm text-[#4F547B]">{data.role}</p>
        <div className="flex items-center text-xs gap-4">
          <div className="text-[#E59819] flex items-center gap-1">
            <div>
              <IoIosStar />
            </div>
            <p>{data.rating}</p>
          </div>
          <div className="flex items-center gap-1">
            <div>
              <Image
                width={10}
                height={10}
                src="/images/instructors/icons/students.svg"
                alt="icon"
              />
            </div>
            <p className="text-[#4F547B]">{data.students} Students</p>
          </div>
          <div className="flex items-center gap-1">
            <div>
              <Image
                width={10}
                height={10}
                src="/images/instructors/icons/play.svg"
                alt="icon"
              />
            </div>
            <p className="text-[#4F547B]">{data.courses} Course</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;

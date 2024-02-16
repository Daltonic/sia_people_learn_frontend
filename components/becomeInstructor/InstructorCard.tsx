import { IUser } from "@/utils/type.dt";
import Image from "next/image";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";

interface InstructorProps {
  user: any;
  index?: number;
}

const InstructorCard: React.FC<InstructorProps> = ({ user, index }) => {
  return (
    <div className="w-full sm:w-80 md:w-64 mb-10">
      <Link href={`/instructors/${user._id}`}>
        <div className="relative">
          <div className="w-full h-72">
            <Image
              width={100}
              height={100}
              src={user.imgUrl!}
              alt="image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {data.socialProfile?.map(
            (itm: { url: string; icon: string }, i: number) => (
              <Link key={i} href={itm.url ? itm.url : "#"}>
                <i className={`${itm.icon} text-white`}></i>
              </Link>
            )
          )}
        </div> */}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <h4 className="font-bold">
            <p className="font-medium text-[#321463] text-lg">
              {user.firstName}
            </p>
          </h4>
          <p className="md:text-sm text-[#4F547B]">{user.userType}</p>
          <div className="flex items-center md:text-xs gap-4">
            {/* <div className="text-[#E59819] flex items-center gap-1">
            <div>
              <IoIosStar />
            </div>
            <p>{data.rating}</p>
          </div> */}
            <div className="flex items-center gap-1">
              <div>
                <Image
                  width={10}
                  height={10}
                  src="/images/instructors/icons/students.svg"
                  alt="icon"
                />
              </div>
              <p className="text-[#4F547B]">{8} Students</p>
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
              <p className="text-[#4F547B]">{8} Course</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InstructorCard;

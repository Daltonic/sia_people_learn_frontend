import React from "react";
import Link from "next/link";
import Image from "next/image";

type Team = {
  image: string;
  id: number;
  name: string;
  reviews: number;
  courses: number;
  students: number;
};

type Props = {
  teamMembers: Team[];
};

const PopularInstructors: React.FC<Props> = ({ teamMembers }) => {
  return (
    <div className="w-full">
      <div className="rounded-lg bg-white shadow-lg  px-3 py-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h2 className="font-semibold text-[#321463] text-lg">Popular Instructor</h2>
          <Link
            href="/instructors-list-2"
            className="text-sm text-[#C5165D] underline"
          >
            View All
          </Link>
        </div>
        <div className="mt-3">
          <div className="">
            {teamMembers.slice(0, 5).map((elm, i) => (
              <div
                key={i}
                className={`flex ${i !== 0 ? "border-t border-gray-200 py-2" : ""}`}
              >
                <div className="shrink-0">
                  <Image
                    width={0}
                    height={0}
                    className="object-cover w-10 h-10 rounded-full"
                    src={elm.image}
                    alt="image"
                  />
                </div>
                <div className="ml-2 w-full ">
                  <h4 className="font-medium text-[#321463]">
                    <Link href={`/instructors/${elm.id}`}>{elm.name}</Link>
                  </h4>
                  <div className="flex items-center space-x-5 mt-2 text-[#4F547B]">
                    <div className="flex items-center gap-2">
                      <Image
                        width={16}
                        height={16}
                        src="/images/dashBoard/sideBarIcons/comment.svg"
                        alt="icon"
                      />
                      <p className="text-xs">{elm.reviews} Reviews</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        width={16}
                        height={16}
                        src="/images/instructors/icons/students.svg"
                        alt="icon"
                      />
                      <p className="text-xs">{elm.students} Students</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        width={14}
                        height={14}
                        src="/images/instructors/icons/play.svg"
                        alt="icon"
                      />
                      <p className="text-xs">{elm.courses} Course</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularInstructors;

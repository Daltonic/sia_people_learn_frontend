import React from "react";
import Link from "next/link";
import Image from "next/image";

type RecentCourse = {
  imageSrc: string;
  title: string;
  authorImg: string;
  author: string;
  lessonCount: number;
  duration: number; 
};

type Props = {
  resentCourses: RecentCourse[];
};

const RecentCourses: React.FC<Props> = ({ resentCourses }) => {
  return (
    <div className="w-full md:w-1/2">
      <div className="rounded-lg bg-white shadow-lg px-3 py-6">
        <div className="flex justify-between items-center border-b border-gray-200">
          <h2 className="font-semibold text-[#321463] text-lg pb-3">
            Recent Courses
          </h2>
          <Link href="#" className="text-sm text-[#C5165D] underline">
            View All
          </Link>
        </div>
        <div className="px-3 py-6 ">
          <div className="space-y-2">
            {resentCourses.map((elm, i) => (
              <div
                key={i}
                className={`flex ${
                  i !== 0 ? "border-t border-gray-200 py-2" : ""
                }`}
              >
                <div className="shrink-0">
                  <Image
                    width={90}
                    height={80}
                    className="object-cover rounded-lg"
                    src={elm.imageSrc}
                    alt="image"
                  />
                </div>
                <div className="ml-3 w-full">
                  <h4 className="font-medium text-[#321463]">{elm.title}</h4>
                  <div className="flex gap-1 justify-between md:gap-0 md:justify-start items-center md:space-x-5 mt-2 flex-wrap md:flex-nowrap">
                    <div className="flex items-center w-full md:w-fit">
                      <Image
                        width={0}
                        height={0}
                        className="object-cover mr-2 rounded-full w-5 h-5"
                        src={elm.authorImg}
                        alt="icon"
                      />
                      <p className="text-sm text-[#4F547B]">{elm.author}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Image
                        width={13}
                        height={13}
                        className="rounded-md w-4 h-4"
                        src="/images/dashBoard/dashBoardMain/document.svg"
                        alt="image"
                      />
                      <p className="text-sm text-[#4F547B]">
                        {elm.lessonCount} lessons
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Image
                        width={13}
                        height={13}
                        className="rounded-md w-4 h-4"
                        src="/images/dashBoard/dashBoardMain/wall-clock.svg"
                        alt="image"
                      />
                      <p className="text-sm text-[#4F547B]">{`${Math.floor(
                        elm.duration / 60
                      )}h ${Math.floor(elm.duration % 60)}m`}</p>
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

export default RecentCourses;

"use client";
import React, { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { coursesData } from "@/data/courses";
import Image from "next/image";

interface ComponentProps {
  data: any;
  index?: number;
}

const CourseHead: React.FC<ComponentProps> = ({ data }) => {
  const [rating, setRating] = React.useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data]);

  return (
    <div className="flex flex-col items-start w-full md:w-[60%]">
      <div className="flex items-center justify-between gap-5 max-md:justify-center">
        <div className="text-violet-950 text-xs font-medium whitespace-nowrap items-stretch bg-pink-700 self-stretch grow justify-center px-4 py-2 rounded-[60px]">
          BEST SELLER
        </div>
        <div className="text-white text-xs font-medium my-auto">NEW</div>
        <div className="text-white text-xs font-medium whitespace-nowrap items-stretch bg-pink-700 self-stretch grow justify-center px-4 py-2 rounded-[60px]">
          POPULAR
        </div>
      </div>
      {coursesData.slice(0, 1).map((data, i: number) => (
        <div key={i} className="flex flex-col gap-2.5 md:gap-5 mt-5 md:mt-0">
          <div className="text-violet-950 text-3xl font-medium leading-10 capitalize self-stretch w-full max-md:max-w-full border md:mt-4">
            {data.title}
          </div>
          <div className="text-slate-600 text-base leading-7 self-stretch w-full max-md:max-w-full md:mt-2 border">
            {data.desc}
          </div>

          <div className="flex flex-col md:flex-row md:items-center text-sm gap-3">
            <div className="flex items-center gap-2">
              <p className="text-[#E59819]">{data.rating}</p>
              <div className="flex items-center">
                {rating.map((itm, i: number) => (
                  <div key={i} className="text-[#E59819]">
                    <IoIosStar className="text-sm text-[#E59819] mx-0.5" />
                  </div>
                ))}
              </div>
            <div className="text-[#4F547B]">({data.ratingCount})</div>
            </div>
            <div className=" flex items-center gap-1">
              <Image
                width={14}
                height={14}
                src="/images/home/coursesCards/icons/4.svg"
                alt="icon"
              />
              <p className="text-sm text-[#4F547B]">
                {data.lessonCount} enrolled on this course
              </p>
            </div>

            <div className="flex items-center">
              <div className="mr-1">
                <Image
                  width={14}
                  height={14}
                  src="/images/home/coursesCards/icons/2.svg"
                  alt="icon"
                />
              </div>
              <div className="text-sm text-[#4F547B]">Last updated 11/2021</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 mt-2 md:mt-0">
            <Image
              width={0}
              height={0}
              src={data.authorImageSrc}
              alt="image"
              className="object-cover rounded-full w-10 h-10"
            />
            <p className="text-sm text-[#4F547B]">{data.authorName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseHead;

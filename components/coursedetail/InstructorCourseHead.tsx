"use client";
import React, { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import Image from "next/image";
import { ICourse } from "@/utils/type.dt";
import { FiEdit2 } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

interface ComponentProps {
  course: ICourse;
  index?: number;
}

const CourseHead: React.FC<ComponentProps> = ({ course }) => {
  const [rating, setRating] = React.useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [course]);

  return (
    <div className="flex flex-col items-start w-full md:w-[60%]">
      <div className="flex items-center justify-between gap-5 max-md:justify-center w-full">
        <div className="flex items-center justify-between gap-5 max-md:justify-center">
          <h1 className="text-violet-950 text-xs font-medium bg-pink-700 px-4 py-2 rounded-full">
            BEST SELLER
          </h1>
          <p className="text-white text-xs font-medium bg-pink-700 px-4 py-2 rounded-full">
            POPULAR
          </p>
        </div>
        <div className="flex items-center justify-between gap-5 max-md:justify-center">
          <button className="text-white flex gap-2 items-center text-xs font-medium bg-green-400 px-4 py-2 rounded-full">
            Edit
            <FiEdit2 />
          </button>
          <button className="text-white flex gap-2 items-center text-xs font-medium bg-pink-400 px-4 py-2 rounded-full">
            Submit
            <FaRegCheckCircle />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 md:gap-5 mt-3 md:mt-0">
        <div className="text-violet-950 text-2xl md:text-3xl font-medium md:leading-10 capitalize self-stretch w-full max-md:max-w-full md:mt-4">
          {course.description}
        </div>
        <div className="text-[#4F547B] text-base leading-7 self-stretch w-full max-md:max-w-full md:mt-2">
          {course.name}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:text-sm gap-3">
          <div className="flex items-center gap-2">
            <p className="text-[#E59819]">{course.rating}</p>
            <div className="flex items-center">
              {rating.map((itm, i: number) => (
                <div key={i} className="text-[#E59819]">
                  <IoIosStar className="md:text-sm text-[#E59819] mx-0.5" />
                </div>
              ))}
            </div>
            <div className="text-[#4F547B]">
              {course.reviews ? course?.reviews.length : 0}
            </div>
          </div>
          <div className=" flex items-center gap-1">
            <Image
              width={14}
              height={14}
              src="/images/home/coursesCards/icons/4.svg"
              alt="icon"
            />
            <p className="md:text-sm text-[#4F547B]">
              {course.lessons ? course.lessons.length : 0} lessons in this
              course
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
            <div className="md:text-sm text-[#4F547B]">
              Last updated 11/2021
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 mt-2 md:mt-0">
          <Image
            width={0}
            height={0}
            src={course.userId?.imgUrl || "/images/heroImage.svg"}
            alt="image"
            className="object-cover rounded-full w-10 h-10"
          />
          <p className="md:text-sm text-[#4F547B]">
            {course.userId?.firstName!}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseHead;

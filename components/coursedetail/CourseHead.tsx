"use client";
import React, { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import Image from "next/image";
import { ICourse } from "@/utils/type.dt";
import { convertStringToDate } from "@/utils";

interface ComponentProps {
  course: ICourse;
}

const CourseHead: React.FC<ComponentProps> = ({ course }) => {
  const [rating, setRating] = React.useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [course]);

  return (
    <div className="flex flex-col items-start w-full md:w-[60%]">
      <div className="flex items-center justify-between gap-5 max-md:justify-center">
        {course.tags &&
          course.tags.map((tag) => (
            <h1
              className="text-slate-500 text-xs font-medium bg-slate-100 p-2 rounded-md"
              key={tag._id}
            >
              {tag.name}
            </h1>
          ))}
      </div>
      <div className="flex flex-col gap-2.5 md:gap-5 mt-3 md:mt-0">
        <div className="text-violet-950 text-2xl md:text-3xl font-medium md:leading-10 capitalize self-stretch w-full max-md:max-w-full md:mt-4">
          {course.name}
        </div>
        <div className="text-[#4F547B] text-base leading-7 self-stretch w-full max-md:max-w-full md:mt-2">
          {course.overview}
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
            <div className="text-[#4F547B]">({course.reviewsCount})</div>
          </div>
          <div className=" flex items-center gap-1">
            <Image
              width={14}
              height={14}
              src="/images/home/coursesCards/icons/4.svg"
              alt="learningIcon"
            />
            <p className="md:text-sm text-[#4F547B]">
              {course.lessons?.length || 0} enrolled on this course
            </p>
          </div>

          <div className="flex items-center">
            <div className="mr-1">
              <Image
                width={14}
                height={14}
                src="/images/home/coursesCards/icons/2.svg"
                alt="Clockicon"
              />
            </div>
            <div className="md:text-sm text-[#4F547B]">
              {`Last updates: ${convertStringToDate(course.updatedAt)}`}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 mt-2 md:mt-0">
          {course.userId.imgUrl ? (
            <Image
              width={10}
              height={10}
              src={course.userId.imgUrl || "/images/courseCard/card1.svg"}
              alt="image"
              className="object-cover rounded-full w-8 h-8"
            />
          ) : (
            <div className="rounded-full w-8 h-8 text-white px-4 bg-[#C5165D] text-sm flex items-center justify-center">
              {course.userId.firstName[0]}
              {course.userId.lastName[0]}
            </div>
          )}
          <p className="md:text-sm text-[#4F547B]">
            {course.userId.firstName} {course.userId.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseHead;

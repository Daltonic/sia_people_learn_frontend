"use client";
import React from "react";
import Image from "next/image";
import { ILesson } from "@/utils/type.dt";
import Button from "../reusableComponents/Button";
import { FiEdit2 } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import InputField from "../reusableComponents/InputField";

interface ComponentProps {
  lesson: ILesson;
}

const LessonDetails: React.FC<ComponentProps> = ({ lesson }) => {
  return (
    <div className="flex justify-between">
      <div className=" md:w-[55%]">
        <div className="flex gap-5">
          <Link href={`/(dashboard)/products/courses/edit/${String(lesson._id)}`}>
            <button className="text-white flex gap-2 items-center text-xs font-medium bg-sky-400 p-2 rounded-md">
              Edit
              <FiEdit2 />
            </button>
          </Link>
          <button className="text-white flex gap-2 items-center text-xs font-medium bg-red-500 p-2 rounded-md">
            Delete
            <FaTimes />
          </button>
        </div>
        <h1 className="text-[#4F547B] text-base">{lesson.overview}</h1>
        <h1 className="text-[#4F547B] text-base">{lesson.description}</h1>
        {/* <h1 className="text-[#4F547B] text-base">{lesson.order}</h1> */}
        <div className="pr-10">
          <form>
            <InputField
              label="downloadableUrl?"
              name="requirements"
              placeholder="Enter downloadableUrl"
              required={false}
              inputType="text"
            />
          </form>
        </div>
      </div>
      <div className="w-full md:w-[55%]">
        <div className="w-full relative flex items-center justify-center">
          <Image
            width={100}
            height={100}
            className="rounded-md w-full object-cover"
            src={"/images/courseCard/card2.svg" || lesson.imageUrl}
            alt="image"
          />
          <div className="p-4 bg-[#ffffff] rounded-full absolute">
            {" "}
            <Image
              width={12}
              height={12}
              src="/images/instructors/icons/play.svg"
              alt="icon"
            />
          </div>
        </div>
        <div className="w-full relative flex items-center justify-center">
          {/* <Image
          width={100}
          height={100}
          className="rounded-md w-full object-cover"
          src={lesson.videoUrl || "/images/courseCard/card2.svg"}
          alt="image"
        /> */}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;

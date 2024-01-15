"use client";
import React from "react";
import Image from "next/image";
import { ILesson } from "@/utils/type.dt";
import { FiEdit2 } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import InputField from "@/components/reusableComponents/InputField";
import { useRouter } from "next/navigation";

interface ComponentProps {
  lesson: ILesson;
}

const LessonDetails: React.FC<ComponentProps> = ({ lesson }) => {
  const router = useRouter();

  const handleDelete = () => {
    const courseId = lesson.courseId;
    const deleteLesson = async () => {
      const requestDetails = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/lessons/delete/${lesson._id}`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        }

        const message = await response.text();
        alert(message);
        router.push(`/course/${courseId}`);
      } catch (e: any) {
        console.log(e.message);
      }
    };

    deleteLesson();
  };

  return (
    <div className="flex justify-between">
      <div className=" md:w-[55%]">
        <div className="flex gap-5">
          <Link href={`/course/lesson/edit/${String(lesson._id)}`}>
            <button className="text-white flex gap-2 items-center text-xs font-medium bg-sky-400 p-2 rounded-md">
              Edit
              <FiEdit2 />
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="text-white flex gap-2 items-center text-xs font-medium bg-red-500 p-2 rounded-md"
          >
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
            width={0}
            height={0}
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
          width={0}
          height={0}
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

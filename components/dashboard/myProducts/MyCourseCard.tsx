"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosStar, IoMdMore } from "react-icons/io";
import Dropdown from "@/components/reusableComponents/Dropdown";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { submitCourse } from "@/services/backend.services";
import { useDispatch } from "react-redux";
import { genericActions } from "@/store/slices/genericSlice";
import { ICourse } from "@/utils/type.dt";
import { ViewRating } from "@/components/reusableComponents/Rating";

interface ComponentProps {
  data: ICourse;
  type: "Book" | "Course";
}

const MyCourseCard: React.FC<ComponentProps> = ({ data, type }) => {
  const [rating, setRating] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { setDeleteModal, setData } = genericActions;

  const [course, setCourse] = useState<ICourse>(data);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [course.rating]);

  const handleSubmit = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await submitCourse({ submitted: true }, course._id)
          .then((res: any) => {
            setCourse(res);
            resolve(res);
          })
          .catch((error: any) => reject(error));
      }),
      {
        pending: `Submitting...`,
        success: `Course submitted successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  const onDelete = () => {
    dispatch(setData({ ...course, type: "course" }));
    dispatch(setDeleteModal("scale-100"));
  };

  return (
    <div
      className="bg-white rounded-lg w-full sm:w-80 md:w-52 h-54
    border-[#EDEDED] border-1 p-2 shadow-[#EDEDED] shadow"
    >
      <div className="">
        <div className="h-32 relative rounded-lg overflow-hidden hover:bg-black transition-opacity delay-1000 hover:ease-in">
          <Link href={`/course/${course.slug}`}>
            <Image
              width={100}
              height={100}
              className="rounded-lg object-cover h-full w-full  hover:opacity-70"
              src={course.imageUrl || "/images/general/cardimg.svg"}
              alt="image"
            />
          </Link>

          <div className="absolute top-1 right-2">
            <Dropdown>
              <Link
                href={`/course/edit/${String(course.slug)}`}
                className="p-1 hover:bg-gray-100 w-full text-left"
              >
                Edit
              </Link>
              <Link
                href={{
                  pathname: `/course/learn/${String(course.slug)}`,
                }}
                className="p-1 hover:bg-gray-100 w-full text-left"
              >
                Lessons
              </Link>
              <Link
                href={{
                  pathname: `/course/lesson/create`,
                  query: {
                    course: course.slug,
                  },
                }}
                className="p-1 hover:bg-gray-100 w-full text-left"
              >
                Add Lessons
              </Link>
              {!course.submitted && (
                <button
                  onClick={handleSubmit}
                  className="p-1 hover:bg-gray-100 w-full text-left"
                >
                  Submit
                </button>
              )}

              <button
                onClick={onDelete}
                className="p-1 hover:bg-gray-100 w-full text-left"
              >
                Delete
              </button>
            </Dropdown>
          </div>
        </div>
        <div className="my-2 p-2 space-y-2">
          <div className="flex items-center justify-between md:md:text-xs gap-4">
            <p className="text-[#4F547B]">{course.userId.firstName}</p>

            <div className="flex justify-start gap-[1px]">
              <ViewRating value={course.rating || 0} />
            </div>
          </div>

          <Link className="linkCustom" href={`/course/${course.slug}`}>
            <div className="md:text-sm font-medium text-[#321463] mt-2 line-clamp-2">
              {course.name}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;

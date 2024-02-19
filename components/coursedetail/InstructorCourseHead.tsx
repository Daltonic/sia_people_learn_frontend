"use client";
import React, { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import Image from "next/image";
import { ICourse } from "@/utils/type.dt";
import { FiEdit2, FiPlusCircle } from "react-icons/fi";
import { FaRegCheckCircle, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineRateReview } from "react-icons/md";
import { toast } from "react-toastify";
import { deleteCourse, submitCourse } from "@/services/backend.services";

interface ComponentProps {
  course: ICourse;
}

const CourseHead: React.FC<ComponentProps> = ({ course }) => {
  const router = useRouter();
  const [rating, setRating] = React.useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [course]);

  const handleSubmit = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await submitCourse(
          {
            submitted: true,
          },
          course._id
        );

        if (status === 200) {
          router.push("/(dashboard)/myProducts");

          resolve();
        } else {
          reject();
        }
      }),
      {
        pending: `Submitting...`,
        success: `Course submitted successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  const handleDelete = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await deleteCourse(course._id);

        if (status === 200) {
          router.push("/(dashboard)/myProducts");

          resolve();
        } else {
          reject();
        }
      }),
      {
        pending: `Deleting...`,
        success: `Course deleted successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  return (
    <div className="md:flex justify-between w-full">
      <div className="flex flex-col items-start w-full md:w-[57%]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center justify-between w-full">
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
          <div className="flex items-center justify-between gap-5 max-md:justify-center">
            <Link href={`/course/edit/${String(course._id)}`}>
              <button className="text-white flex gap-2 items-center text-xs font-medium bg-sky-400 p-2 rounded-md">
                Edit
                <FiEdit2 />
              </button>
            </Link>

            <Link
              href={{
                pathname: `/course/lesson/create`,
                query: {
                  courseId: course._id,
                },
              }}
            >
              <button className="text-white flex gap-2 items-center text-xs font-medium bg-green-400 p-2 rounded-md">
                Add Lesson
                <FiPlusCircle />
              </button>
            </Link>

            <button
              onClick={handleSubmit}
              className="text-white flex gap-2 items-center text-xs font-medium bg-pink-400 p-2 rounded-md"
            >
              Submit
              <FaRegCheckCircle />
            </button>
            <button
              onClick={handleDelete}
              className="text-white flex gap-2 items-center text-xs font-medium bg-red-500 p-2 rounded-md"
            >
              Delete
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 mt-3 w-full">
          <div className="flex items-center gap-2">
            <p className="text-[#E59819]">{course.rating}0</p>
            <div className="flex items-center">
              {rating.map((itm, i: number) => (
                <div key={i} className="text-[#E59819]">
                  <IoIosStar className="md:text-sm text-[#E59819] mx-0.5" />
                </div>
              ))}
            </div>
            <div className="text-[#4F547B]">
              ({course.reviews ? course?.reviews.length : 0})
            </div>
          </div>
          <h1 className="text-violet-950 text-2xl md:text-3xl font-medium md:leading-10 capitalize">
            {course.name}
          </h1>
          <div className="text-[#4F547B] text-base  md:mt-2">
            {course.overview}
          </div>

          <div className="block md:hidden md:w-[38%] mt-4 md:mt-0">
            <Image
              height={200}
              width={200}
              src={course.imageUrl || "/images/courseCard/card3.svg"}
              alt=""
              className="w-full h-full rounded-lg"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:text-sm gap-5">
            <div className=" flex items-center gap-1">
              <Image
                width={14}
                height={14}
                src="/images/home/coursesCards/icons/1.svg"
                alt="lessons"
              />
              <p className="md:text-sm text-[#4F547B]">
                {course.lessons ? course.lessons.length : 0} lessons
              </p>
            </div>

            <div className="flex items-center">
              <div className="mr-1">
                <Image
                  width={14}
                  height={14}
                  src="/images/home/coursesCards/icons/2.svg"
                  alt="duration"
                />
              </div>
              <div className="md:text-sm text-[#4F547B]">{course.duration}</div>
            </div>

            <div className="flex items-center">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/3.svg"
                  alt="difficulty"
                  className="w-5 h-5  md:w-3 md:h-3"
                />
              </div>
              <div className="md:text-sm text-[#4F547B]">
                {course.difficulty}
              </div>
            </div>
            <div className="flex gap-3 items-center text-[#4F547B]">
              <MdOutlineRateReview className="w-5" />
              <div className="md:text-sm ">{course.reviewsCount}</div>
            </div>
          </div>
          <div className="flex gap-5  items-center">
            <p className="md:text-sm text-[#4F547B]">
              Created At {course.createdAt}
            </p>

            <p className="md:text-sm text-[#4F547B]">
              Updated At {course.updatedAt}
            </p>
          </div>
          <div className="flex items-center gap-10 mt-2 md:mt-0">
            <div className="flex items-center gap-2.5">
              <Image
                width={100}
                height={100}
                src={
                  course.userId?.imgUrl || "/images/instructors/instructor3.svg"
                }
                alt="authorImg"
                className="object-cover rounded-full w-10 h-10"
              />
              <p className="md:text-sm text-[#4F547B]">
                {course.userId?.firstName!}
              </p>
            </div>
            <p className="text-2xl font-medium text-[#321463]">
              ${course.price}
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-[38%] h-96 mt-4 md:mt-0">
        <Image
          height={100}
          width={100}
          src={course.imageUrl || "/images/general/cardimg.svg"}
          alt="Course Image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default CourseHead;

"use client";
import React, { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import Image from "next/image";
import { IAcademy, RootState } from "@/utils/type.dt";
import { FiEdit2, FiPlusCircle } from "react-icons/fi";
import { FaRegCheckCircle, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineRateReview } from "react-icons/md";
import { useSelector } from "react-redux";
import { convertStringToDate } from "@/utils";
import { toast } from "react-toastify";
import { deleteAcademy, submitAcademy } from "@/services/backend.services";
import { ViewRating } from "../reusableComponents/Rating";

interface ComponentProps {
  academy: IAcademy;
}

const AcademyHead: React.FC<ComponentProps> = ({ academy }) => {
  const router = useRouter();
  const [rating, setRating] = React.useState<string[]>([]);

  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [academy]);

  const handleSubmit = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await submitAcademy(academy._id);

        if (status === 200) {
          router.push("/(dashboard)/products/personal");
          resolve();
        } else {
          reject();
        }
      }),
      {
        pending: `Submitting...`,
        success: `Academy submitted successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  const handleDelete = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await deleteAcademy(academy._id);

        if (status === 200) {
          router.push("/(dashboard)/products/personal");
          resolve();
        } else {
          reject();
        }
      }),
      {
        pending: `Deleting...`,
        success: `Academy deleted successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  return (
    <div className="flex flex-col items-start w-full md:w-[57%]">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center justify-between w-full">
        <div className="flex items-center justify-between gap-5 max-md:justify-center">
          {academy.tags &&
            academy.tags.map((tag) => (
              <h1
                className="text-slate-500 text-xs font-medium bg-slate-100 p-2 rounded-md"
                key={tag._id}
              >
                {tag.name}
              </h1>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 mt-3 w-full ">
        <div className="flex items-center gap-2">
        <div className="flex items-center justify-between w-full md:text-xs gap-4">
            <div className="flex items-center justify-start gap-[1px]">
              <ViewRating value={academy.rating || 0} />
              <p className="text-[#4F547B] pb-[1px]">
              ({academy.reviews ? academy?.reviews.length : 0})
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-violet-950 text-2xl md:text-3xl font-medium md:leading-10 capitalize">
          {academy.name}
        </h1>
        <div className="text-[#4F547B] text-base  md:mt-2">
          {academy.overview}
        </div>

        <div className="flex flex-col md:text-sm gap-1 sm:gap-3">
          {/* <div className="flex items-center flex-wrap justify-between sm:justify-start md:gap-10 flex-shrink-0">
            <div className="flex items-center gap-1">
              <div className="mr-1">
                <Image
                  width={14}
                  height={14}
                  src="/images/home/coursesCards/icons/2.svg"
                  alt="duration"
                />
              </div>
              <div className="md:text-sm text-[#4F547B]">
                {`${Math.floor(
                  academy.duration / 60
                )}h ${Math.floor(academy.duration % 60)}m`}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="mr-2 md:mr-1">
                <Image
                  width={14}
                  height={14}
                  src="/images/home/coursesCards/icons/3.svg"
                  alt="difficulty"
                />
              </div>
              <div className="md:text-sm text-[#4F547B]">
                {academy.difficulty}
              </div>
            </div>
            <div className="flex gap-1 items-center text-[#4F547B]">
              <MdOutlineRateReview className="w-5" />
              <div className="md:text-sm ">{academy.reviewsCount}</div>
            </div>
          </div> */}
          <div className="flex flex-wrap sm:gap-5 items-center">
            <p className="md:text-sm text-[#4F547B]">
              Created on {convertStringToDate(academy.createdAt)}
            </p>

            <p className="md:text-sm text-[#4F547B]">
              Updated on {convertStringToDate(academy.updatedAt)}
            </p>
          </div>
          <div className="flex items-center gap-10 mt-2 md:mt-0">
            <div className="flex items-center gap-2.5">
              <Image
                width={100}
                height={100}
                src={
                  academy.userId?.imgUrl ||
                  "/images/instructors/instructor3.svg"
                }
                alt="authorImg"
                className="object-cover rounded-full w-10 h-10"
              />
              <p className="md:text-sm text-[#4F547B]">
                {academy.userId?.firstName!}
              </p>
            </div>
            <p className="text-2xl font-medium text-[#321463]">
              ${academy.price}
            </p>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default AcademyHead;

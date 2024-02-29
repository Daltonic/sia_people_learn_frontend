"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosStar, IoMdMore } from "react-icons/io";
import Button from "@/components/reusableComponents/Button";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ICourse } from "@/utils/type.dt";
import { toast } from "react-toastify";
import { approveCourse } from "@/services/backend.services";

interface ComponentProps {
  data: ICourse;
  index?: number;
}

const Courses: React.FC<ComponentProps> = ({ data, index }) => {
  const [rating, setRating] = useState<string[]>([]);
  const [disable, setDisable] = useState<boolean>(data.approved);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data.rating]);

  const handleApprove = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await approveCourse(data._id);

        if (status === 200) {
          resolve();
          setDisable(true);
        } else {
          reject();
        }
      }),
      {
        pending: `Approving...`,
        success: `Academy approved successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };
  return (
    <div className="w-full sm:w-[47%] md:w-[48%] h-44 bg-white rounded-lg border-[#EDEDED] border p-2 shadow-[#EDEDED] shadow-md">
      <div className="md:flex items-center gap-4 w-full h-full">
        <div className="md:w-28 h-full">
          <Link className="linkCustom" href={`/coursedetail/${data.slug}`}>
            <Image
              width={100}
              height={100}
              className="rounded-lg object-cover w-full h-full"
              src={data.imageUrl || "/images/general/heroImage.svg"}
              alt="image"
            />
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Image
              width={16}
              height={16}
              src={
                data.userId?.imgUrl
                  ? data.userId.imgUrl
                  : "/images/general/user.png"
              }
              alt="image"
              className="object-cover rounded-full"
            />
            <p className="md:text-xs text-[#4F547B]">{`${data.userId?.firstName} ${data.userId?.lastName}`}</p>
          </div>

          <div className="md:text-sm font-medium text-[#321463] line-clamp-2 mt-2">
            {data.name}
          </div>
          <div className="flex justify-between items-center my-2 border-b border-[#EDEDED] pb-1">
            <div className="flex items-center">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/1.svg"
                  alt="icon"
                  className="w-5 h-5  md:w-3 md:h-3"
                />
              </div>
              <p className="md:text-xs">
                {data.lessons?.length}{" "}
                {data.lessons?.length > 0 ? "lessons" : "lesson"}
              </p>
            </div>

            <div className="flex items-center">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/2.svg"
                  alt="icon"
                  className="w-5 h-5 md:w-3 md:h-3"
                />
              </div>
              <div className="md:text-xs ">{`${Math.floor(
                data.duration / 60
              )}h ${Math.floor(data.duration % 60)}m`}</div>
            </div>

            <div className="flex items-start">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/3.svg"
                  alt="icon"
                  className="w-5 h-5  md:w-3 md:h-3"
                />
              </div>
              <div className="md:text-xs">{data.difficulty}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              disabled={data.approved || disable}
              onClick={handleApprove}
              className={`p-2 text-white rounded-md text-sm flex items-center gap-2 ${
                !disable
                  ? "bg-green-400 hover:bg-transparent hover:border hover:border-green-400 hover:text-green-400"
                  : "bg-green-200"
              }`}
            >
              {data.approved ? "Approved" : "Approve"}
              <FaCheck />
            </button>
            {!disable && (
              <button className="bg-red-500 hover:bg-transparent hover:border hover:border-red-500 hover:text-red-500  p-2 text-white rounded-md text-sm w-20 flex items-center gap-2">
                Reject
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

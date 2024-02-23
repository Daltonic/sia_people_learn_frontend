"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ICourse } from "@/utils/type.dt";
import { toast } from "react-toastify";
import { approveCourse } from "@/services/backend.services";

interface ComponentProps {
  data: ICourse;
  index?: number;
}

const Books: React.FC<ComponentProps> = ({ data }) => {
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
    <div
      className="w-full sm:w-[47%] md:w-[48%] h-44 bg-white rounded-lg border-[#EDEDED] border p-2 shadow-[#EDEDED] shadow-md"
    >
      <div className="md:flex items-start gap-4 w-full h-full">
        <div className="md:w-28 h-full">
          <Link className="linkCustom" href={`/coursedetail/${data._id}`}>
            <Image
              width={100}
              height={100}
              className="rounded-lg object-cover w-full h-full"
              src={data.imageUrl || "/images/general/heroImage.svg"}
              alt="image"
            />
          </Link>
        </div>
        <div className="flex-1 py-3">
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

          <div className="md:text-sm font-medium text-[#321463] my-2">
            {data.name}
          </div>
          <div className="flex items-center gap-4">
            <button
              disabled={data.approved || disable}
              onClick={handleApprove}
              className={`p-2 text-white rounded-md text-sm flex items-center gap-2 ${
                !disable
                  ? "bg-green-400 hover:bg-transparent hover:border hover:border-green-400 hover:text-green-400  "
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

export default Books;

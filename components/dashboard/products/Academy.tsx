"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosStar, IoMdMore } from "react-icons/io";
import Button from "@/components/reusableComponents/Button";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IAcademy } from "@/utils/type.dt";

interface ComponentProps {
  data: IAcademy;
  index?: number;
}

const Academy: React.FC<ComponentProps> = ({ data, index }) => {
  const [rating, setRating] = useState<string[]>([]);
  const [disable, setDisable] = useState<boolean>(data.approved);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data.rating]);

  const handleApprove = () => {
    const approve = async () => {
      const requestDetails = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/approve/${data._id}`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        }

        const message = await response.text();
        alert(message);
        setDisable(true);
      } catch (e: any) {
        alert(e.message);
        console.log(e.message);
      }
    };

    approve();
  };

  console.log(disable);

  return (
    <div
      className="w-full sm:w-[47%] md:w-[48%] bg-white rounded-lg border-[#EDEDED] border p-2 pb-0 shadow-[#EDEDED] shadow-md"
      style={{ height: "fit-content" }}
    >
      <div className="md:flex gap-4 w-full">
        <div className="md:w-1/3 py-2">
          <Link className="linkCustom" href={`/coursedetail/${data._id}`}>
            <Image
              width={0}
              height={0}
              style={{ height: "100%", width: "100%" }}
              className="rounded-lg object-cover"
              src={data.imageUrl || "/images/heroImage.svg"}
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
                  : "/images/instructor4.svg"
              }
              alt="image"
              className="object-cover rounded-full"
            />
            <p className="md:text-xs text-[#4F547B]">{`${data.userId?.firstName} ${data.userId?.lastName}`}</p>
          </div>

          <div className="md:text-sm font-medium text-[#321463] mt-2">
            {data.name}
          </div>
          <div className="flex justify-between items-center my-2 border-b border-[#EDEDED] pb-1">
            <div className="flex items-center">
              <div className="mr-2 md:mr-1">
                <Image
                  width={0}
                  height={0}
                  src="/images/home/coursesCards/icons/1.svg"
                  alt="icon"
                  className="w-5 h-5  md:w-3 md:h-3"
                />
              </div>
              <p className="md:text-xs">
                {data.courses?.length}{" "}
                {data.courses?.length === 1 ? "course" : "courses"}
              </p>
            </div>

            <div className="flex items-center">
              <div className="mr-2 md:mr-1">
                <Image
                  width={0}
                  height={0}
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
                  width={0}
                  height={0}
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
                  ? "bg-green-400 hover:bg-transparent hover:border hover:border-green-400 hover:text-green-400  "
                  : "bg-green-200"
              }`}
            >
              {data.approved ? "Approved" : "Approve"}
              <FaCheck />
            </button>
            {!data.approved && (
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

export default Academy;

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosStar, IoMdMore } from "react-icons/io";

interface ComponentProps {
  data: any;
  type: "Academy" | "Book" | "Course";
}

const MyCourseCard: React.FC<ComponentProps> = ({ data, type }) => {
  const [rating, setRating] = useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data.rating]);

  return (
    <div
      className="bg-white rounded-lg w-full sm:w-80 md:w-48 h-52 border-[#EDEDED] border-1 p-2 shadow-[#EDEDED] shadow"
    >
      <div className="">
        <Link
          className="linkCustom"
          href={
            type === "Academy" ? `/academy/${data._id}` : `/course/${data._id}`
          }
        >
          <div className="h-20 relative">
            <Image
              width={100}
              height={100}
              className="rounded-lg object-cover h-full w-full"
              src={data.imageUrl || "/images/general/cardimg.svg"}
              alt="image"
            />
          </div>
        <div className="my-2 p-2 space-y-2">
          <div className="flex items-center justify-between md:md:text-xs gap-4">
            <p className="text-[#4F547B]">{data.userId.firstName}</p>

            <div className="flex items-center gap-1">
              <p className="text-[#E59819]">{data.rating}</p>
              <div className="flex items-center">
                {rating.map((itm, i: number) => (
                  <div key={i} className="text-[#E59819]">
                    <IoIosStar />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:text-sm font-medium text-[#321463] mt-2">
            {data.name}
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default MyCourseCard;

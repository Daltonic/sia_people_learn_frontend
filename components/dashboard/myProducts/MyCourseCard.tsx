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
  console.log(data);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data.rating]);

  return (
    <div
      className=" bg-white rounded-lg w-full sm:w-[48%] md:w-[13rem] border-[#EDEDED] border-1 p-2 shadow-[#EDEDED] shadow-xl mb-4"
      style={{ height: "fit-content" }}
    >
      <div className="">
        <Link
          className="linkCustom"
          href={
            type === "Academy" ? `/academy/${data._id}` : `/course/${data._id}`
          }
        >
          <div className=" relative">
            <Image
              width={500}
              height={400}
              style={{ height: "100%", width: "100%" }}
              className="rounded-lg"
              src={data.imageUrl || "/images/heroImage.svg"}
              alt="image"
            />
          </div>
        </Link>

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

          <div className="md:text-sm font-medium text-[#321463] mt-2 h-14">
            {data.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
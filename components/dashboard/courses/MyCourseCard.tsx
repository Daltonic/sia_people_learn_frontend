"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosStar, IoMdMore } from "react-icons/io";

interface ComponentProps {
  data: any;
  index?: number;
}

const MyCourseCard: React.FC<ComponentProps> = ({ data, index }) => {
  const [rating, setRating] = useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data.rating]);

  return (
    <div
      className=" bg-white rounded-lg w-full md:w-56 border-[#EDEDED] border-1 p-2 shadow-[#EDEDED] shadow-xl"
      style={{ height: "fit-content" }}
    >
      <div className="">
        <div className=" relative">
          <Image
            width={500}
            height={400}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg"
            src={data.imageSrc}
            alt="image"
          />
          <div className="text-[#6A7A99] bg-white p-1 text-xl rounded-md absolute top-3 right-3">
          <IoMdMore />
          </div>
        </div>

        <div className="my-2 p-2 space-y-2">
          <div className="flex items-center justify-between md:md:text-xs gap-4">
            <p className="text-[#4F547B]">{data.authorName}</p>

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
            <Link className="linkCustom" href={`/courses/${data.id}`}>
              {data.title}
            </Link>
          </div>
          <div>
            <div className="w-full h-1 bg-[#F9F9F9] rounded-full">
              <div className="w-2/3 h-full text-center text-xs text-white bg-[#31F02D] rounded-full"></div>
            </div>
          </div>
          <p className="text-[#321463] text-sm">% 20 Completed</p>

        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;

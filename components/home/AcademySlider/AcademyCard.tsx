"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { IAcademy } from "@/utils/type.dt";

interface ComponentProps {
  data: IAcademy;
}

const AcademyCard: React.FC<ComponentProps> = ({ data }) => {
  const [rating, setRating] = useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data.rating]);

  return (
    <div
      className=" bg-white rounded-lg w-full sm:w-80 md:w-56 border-[#EDEDED] border-1 p-2 shadow-[#EDEDED] shadow-md"
      style={{ height: "fit-content" }}
    >
      <div className="">
        <div className="">
          <Image
            width={0}
            height={0}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg"
            src={data.imageUrl || "/images/courseCard/card1.svg"}
            alt="image"
          />
        </div>

        <div className="my-2 p-2">
          <div className="flex items-center md:md:text-xs gap-4">
            <div className="flex items-center gap-1">
              <p className="text-[#E59819]">{data.rating}</p>
              <div className="flex items-center">
                {rating.map((itm, i: number) => (
                  <div key={i} className="text-[#E59819]">
                    <IoIosStar />
                  </div>
                ))}
              </div>
              <p className="text-[#4F547B]">({data.reviews?.length || 0})</p>
            </div>
          </div>

          <div className="md:text-sm font-medium text-[#321463] mt-2">
            <Link className="linkCustom" href={`/academies/${data._id}`}>
              {data.name}
            </Link>
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
                {data.courses?.length} course
                {data.courses?.length !== 1 ? "s" : ""}
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

          <div className="flex justify-between items-center bottom-0 mb-0">
            <div className="flex items-center gap-2">
              <Image
                width={0}
                height={0}
                src={data.userId.imgUrl || "/images/courseCard/card1.svg"}
                alt="image"
                className="object-cover rounded-full w-10 h-10"
              />
              <p className="md:text-xs text-[#4F547B]">
                {data.userId.firstName} {data.userId.lastName}
              </p>
            </div>

            <div className="">
              {data.price ? (
                <div className="flex items-center gap-1">
                  <p className="md:text-xs text-[#4F547B] line-through">
                    ${data.price}
                  </p>
                  <p className="text-lg md:text-sm  text-[#321463]">
                    ${data.price}
                  </p>
                </div>
              ) : (
                <>
                  <div></div>
                  <div>Free</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyCard;

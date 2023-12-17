"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";

interface ComponentProps {
  data: any;
  index?: number;
}

const CourceCard
: React.FC<ComponentProps> = ({ data, index }) => {
  const [rating, setRating] = useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data.rating]);

  return (
    <div className="p-2 bg-white rounded-md" style={{ height: "fit-content" }}>
      <div className="h-68">
        <div className="">
          <Image
            width={500}
            height={500}
            style={{ height: "100%", width: "100%" }}
            className="rounded-md "
            src={data.imageSrc}
            alt="image"
          />
        </div>

        <div className="my-2">
          <div className="flex items-center text-xs gap-4">
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
            <div className="text-[#4F547B]">({data.ratingCount})</div>
          </div>

          <div className="text-xs font-medium text-[#321463] mt-2">
            <Link className="linkCustom" href={`/courses/${data.id}`}>
              {data.title}
            </Link>
          </div>

          <div className="flex justify-between items-center my-2 border-b border-[#EDEDED] pb-1">
            <div className="flex items-center">
              <div className="mr-1">
                <Image
                  width={9}
                  height={9}
                  src="/images/home/coursesCards/icons/1.svg"
                  alt="icon"
                />
              </div>
              <p className="text-xs">{data.lessonCount} lesson</p>
            </div>

            <div className="flex items-center">
              <div className="mr-1">
                <Image
                  width={9}
                  height={9}
                  src="/images/home/coursesCards/icons/2.svg"
                  alt="icon"
                />
              </div>
              <div className="text-xs ">{`${Math.floor(
                data.duration / 60
              )}h ${Math.floor(data.duration % 60)}m`}</div>
            </div>

            <div className="flex items-center">
              <div className="mr-1">
                <Image
                  width={9}
                  height={9}
                  src="/images/home/coursesCards/icons/3.svg"
                  alt="icon"
                />
              </div>
              <div className="text-xs">{data.level}</div>
            </div>
          </div>

          <div className="flex justify-between bottom-0">
            <div className="flex gap-2">
              <Image
                width={25}
                height={25}
                src={data.authorImageSrc}
                alt="image"
                className="object-cover"
              />
              <p className="text-xs text-[#4F547B]">{data.authorName}</p>
            </div>

            <div className="coursesCard-footer__price">
              {data.paid ? (
                <div className="flex items-center gap-1">
                  <p className="text-xs text-[#4F547B] line-through">
                    ${data.originalPrice}
                  </p>
                  <p className="text-sm  text-[#321463]">
                    ${data.discountedPrice}
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

export default CourceCard
;

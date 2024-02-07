"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosStar, IoMdMore } from "react-icons/io";
import { IUserSubscription } from "@/utils/type.dt";

interface ComponentProps {
  product: IUserSubscription;
  index?: number;
}

const MyCourseCard: React.FC<ComponentProps> = ({ product, index }) => {
  const [rating, setRating] = useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [product.productId.rating]);

  return (
    <div
      className=" bg-white rounded-lg w-full sm:w-[48%] md:w-48 h-fit p-2 border-[#EDEDED] border shadow-[#EDEDED] shadow-xl"
    >
      <div className="">
        <Link
          className="linkCustom"
          href={`/course/learn/${product.productId._id}`}
        >
          <div className="relative">
            <div className="h-28">
              <Image
                width={500}
                height={400}
                className="rounded-lg object-cover h-full w-full"
                src={product.productId.imageUrl || "/images/cardimg.svg"}
                alt="image"
              />
            </div>
            <div className="text-[#6A7A99] bg-white p-1 text-xl rounded-md absolute top-3 right-3">
              <IoMdMore />
            </div>
          </div>
       
        <div className="p-2 space-y-2">
          <div className="flex items-center justify-between md:md:text-xs gap-4">
            <p className="text-[#4F547B]">
              {product.productId.userId.firstName}{" "}
              {product.productId.userId.lastName}
            </p>

            <div className="flex items-center gap-1">
              <p className="text-[#E59819]">{product.productId.rating}</p>
              <div className="flex items-center">
                {rating.map((itm, i: number) => (
                  <div key={i} className="text-[#E59819]">
                    <IoIosStar />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:text-sm font-medium text-[#321463] mt-2 h-10">
            <p className="line-clamp-1 hover:overflow-visible"> {product.productId.name}</p>

          </div>
          <div className="">
            <div className="w-full h-1 bg-[#F9F9F9] rounded-full">
              <div className="w-2/3 h-full text-center text-xs text-white bg-[#31F02D] rounded-full" />
            </div>

            <p className="text-[#321463] text-xs">% 20 Completed</p>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default MyCourseCard;

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
      className=" bg-white rounded-lg w-full sm:w-[48%] md:w-[13rem] border-[#EDEDED] border-1 p-2 shadow-[#EDEDED] shadow-xl mb-4"
      style={{ height: "fit-content" }}
    >
      <div className="">
        <Link
          className="linkCustom"
          href={`/course/learn/${product.productId._id}`}
        >
          <div className=" relative">
            <Image
              width={500}
              height={400}
              style={{ height: "100%", width: "100%" }}
              className="rounded-lg"
              src={product.productId.imageUrl || "/images/courseCard/card1.svg"}
              alt="image"
            />
            <div className="text-[#6A7A99] bg-white p-1 text-xl rounded-md absolute top-3 right-3">
              <IoMdMore />
            </div>
          </div>
        </Link>
        <div className="my-2 p-2 space-y-2">
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

          <div className="md:text-sm font-medium text-[#321463] mt-2 h-14">
            {product.productId.name}
          </div>
          <div>
            <div className="w-full h-1 bg-[#F9F9F9] rounded-full">
              <div className="w-2/3 h-full text-center text-xs text-white bg-[#31F02D] rounded-full" />
            </div>
          </div>
          <p className="text-[#321463] text-sm">% 20 Completed</p>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;

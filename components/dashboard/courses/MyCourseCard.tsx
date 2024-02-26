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

const MyCourseCard: React.FC<ComponentProps> = ({ product }) => {
  const [rating, setRating] = useState<string[]>([]);
  

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [product.productId.rating]);

  return (
    <div className="bg-white rounded-lg w-full sm:w-[48%] md:w-48 h-60 p-2 border-[#EDEDED] border shadow-[#EDEDED] shadow-xl">
      <div className="">
        <div className="h-28">
          <Link
            className="linkCustom"
            href={`/course/learn/${product.productId._id}`}
          >
            <Image
              width={500}
              height={400}
              className="rounded-lg object-cover h-full w-full"
              src={product.productId.imageUrl || "/images/general/cardimg.svg"}
              alt="image"
            />
          </Link>
        </div>

        <div className="pt-2 space-y-2">
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
          <Link
            className="linkCustom"
            href={`/course/learn/${product.productId._id}`}
          >
            <p className="line-clamp-2 md:text-sm font-medium text-[#321463] mt-2">
              {" "}
              {product.productId.name}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;

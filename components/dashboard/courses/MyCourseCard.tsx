import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IUserSubscription } from "@/utils/type.dt";
import { ViewRating } from "@/components/reusableComponents/Rating";

interface ComponentProps {
  product: IUserSubscription;
  productType: "Course" | "Academy";
  index?: number;
}

const MyCourseCard: React.FC<ComponentProps> = ({ product, productType }) => {
  return (
    <div className="bg-white rounded-lg w-full sm:w-[48%] md:w-48 h-60 p-2 border-[#EDEDED] border shadow-[#EDEDED] shadow-xl">
      <div className="">
        <div className="h-28">
          <Link
            className="linkCustom"
            href={
              productType === "Course"
                ? `/course/learn/${product.productId._id}`
                : `/academy/learn/${product.productId._id}`
            }
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

            <div className="flex items-center justify-start gap-[1px]">
              <ViewRating value={product.productId.rating || 4} />
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

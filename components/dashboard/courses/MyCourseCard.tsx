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
    <div className="bg-white rounded-lg w-full sm:w-[48%] md:w-52 h-64 p-2 border-[#EDEDED] border shadow-[#EDEDED] shadow-xl flex flex-col justify-between">
        <div className="h-32 rounded-lg overflow-hidden hover:bg-black transition-opacity delay-1000 hover:ease-in">
          <Link
            className="linkCustom"
            href={{
              pathname:
                productType === "Course"
                  ? `/course/learn/${product.productId.slug}`
                  : `/academy/learn/${product.productId.slug}`,
              query: { sub: product._id },
            }}
          >
            <Image
              width={500}
              height={400}
              className="rounded-lg object-cover h-full w-full hover:opacity-75"
              src={product.productId.imageUrl || "/images/general/cardimg.svg"}
              alt="image"
            />
          </Link>
        </div>

        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between md:md:text-xs gap-4">
            <div className="flex items-center justify-start gap-[1px]">
              <ViewRating value={product.productId.rating || 0} />
              <p className="text-[#4F547B] pb-[1px]">
                ({product.productId.reviewsCount || 0})
              </p>
            </div>
          </div>
          <Link
            className="linkCustom"
            href={{
              pathname:
                productType === "Course"
                  ? `/course/learn/${product.productId.slug}`
                  : `/academy/learn/${product.productId.slug}`,
              query: { sub: product._id },
            }}
          >
            <p className="line-clamp-2 md:text-sm font-medium text-[#321463] my-1  bg-slate-50">
              {product.productId.name}
            </p>
          </Link>

          <div className="bottom flex items-center gap-2 pt-1.5 border-t border-[#EDEDED]">
            {product.productId.userId.imgUrl ? (
              <Image
                width={10}
                height={10}
                src={product.productId.userId.imgUrl || "/images/courseCard/card1.svg"}
                alt="image"
                className="object-cover rounded-full w-8 h-8"
              />
            ) : (
              <div className="rounded-full w-5 h-5 text-white p-4 bg-[#C5165D] text-sm flex items-center justify-center">
                {product.productId.userId.firstName[0]}
                {product.productId.userId.lastName[0]}
              </div>
            )}

            <p className="md:text-xs text-[#4F547B]">
              {product.productId.userId.firstName} {product.productId.userId.lastName}
            </p>
          </div>
        </div>
    </div>
  );
};

export default MyCourseCard;

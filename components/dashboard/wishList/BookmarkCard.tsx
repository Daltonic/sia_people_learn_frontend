import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";
import { IWishlist } from "@/utils/type.dt";

interface ComponentProps {
  data: IWishlist;
  type: "Course" | "Academy";
}

const BookmarkCard: React.FC<ComponentProps> = ({ data, type }) => {
  return (
    <div
      className="w-full sm:w-[47%] bg-white rounded-lg border-[#EDEDED] border p-2 pb-0 shadow-[#EDEDED] shadow-md"
      style={{ height: "fit-content" }}
    >
      <div className="md:flex gap-4 relative">
        <div className="md:w-1/3 py-2">
          <Image
            width={100}
            height={100}
            className="rounded-lg object-cover h-full w-full"
            src={data.productId?.imageUrl || "/images/general/cardimg.svg"}
            alt="image"
          />
        </div>

        <div className="my-2 p-2 space-y-3 flex-1">
          <div className="flex justify-between ">
            <div className="flex items-center md:md:text-xs gap-4">
              <div className="flex items-center gap-1">
                <p className="text-[#E59819]">{data.productId?.rating || 5}</p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="text-[#E59819]">
                      <IoIosStar />
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[#4F547B]">
                ({data.productId?.reviews?.length || 0})
              </p>
            </div>
            <div className="bg-white p-3 rounded-full shadow-md absolute right-0 top-0">
              <Image
                width={100}
                height={100}
                src="/images/dashBoard/dashBoardMain/bookmark.svg"
                alt="image"
                className="object-cover rounded-full w-4 h-4 "
              />
            </div>
          </div>

          <div className="md:text-sm font-medium text-[#321463] mt-2">
            <Link
              className="linkCustom"
              href={
                type === "Academy"
                  ? `/academies/${data.productId._id!}`
                  : `/courses/${data.productId._id!}`
              }
            >
              {data.productId.name}
            </Link>
          </div>
          <div className="flex justify-between items-center my-2 border-b border-[#EDEDED] pb-1">
            {/* <div className="flex items-center">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/1.svg"
                  alt="icon"
                  className="w-5 h-5  md:w-3 md:h-3"
                />
              </div>
              <p className="md:text-xs">{data.lessonCount} lesson</p>
            </div> */}

            <div className="flex items-center">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/2.svg"
                  alt="icon"
                  className="w-5 h-5 md:w-3 md:h-3"
                />
              </div>
              {/* <div className="md:text-xs ">{`${Math.floor(
                data.duration / 60
              )}h ${Math.floor(data.duration % 60)}m`}</div> */}
            </div>

            <div className="flex items-start">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/3.svg"
                  alt="icon"
                  className="w-5 h-5  md:w-3 md:h-3"
                />
              </div>
              <div className="md:text-xs">{data.productId.difficulty}</div>
            </div>
          </div>

          <div className="flex justify-between items-center bottom-0 mb-0">
            <div className="flex items-center gap-2">
              {data.productId.userId.imgUrl ? (
                <Image
                  width={10}
                  height={10}
                  src={data.productId.userId.imgUrl}
                  alt="image"
                  className="object-cover rounded-full w-8 h-8"
                />
              ) : (
                <div className="rounded-full w-8 h-8 text-white px-4 bg-[#C5165D] text-sm flex items-center justify-center">
                  {data.productId.userId.firstName[0]}
                  {data.productId.userId.lastName[0]}
                </div>
              )}
              <p className="md:text-xs text-[#4F547B]">
                {data.productId.userId.firstName}{" "}
                {data.productId.userId.lastName}
              </p>
            </div>

            <div className="flex items-center gap-1 font-medium">
              <p className="md:text-xs text-[#4F547B] line-through">
                ${data.productId.price}
              </p>
              {/* <p className="text-lg md:text-sm text-[#321463]">
                    ${data.discountedPrice}
                  </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;

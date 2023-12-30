import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";

interface ComponentProps {
  data: any;
  index?: number;
}

const BookmarkCard: React.FC<ComponentProps> = ({ data, index }) => {
  return (
    <div
      className="w-full md:w-[48%] bg-white rounded-lg border-[#EDEDED] border p-2 pb-0 shadow-[#EDEDED] shadow-md"
      style={{ height: "fit-content" }}
    >
      <div className="md:flex gap-4 relative">
        <div className="md:w-1/2">
          <Image
            width={300}
            height={400}
            style={{ height: "90%", width: "100%" }}
            className="rounded-lg object-cover"
            src={data.imageSrc}
            alt="image"
          />
        </div>

        <div className="my-2 p-2 space-y-3">
          <div className="flex justify-between ">
          <div className="flex items-center md:md:text-xs gap-4">
            <div className="flex items-center gap-1">
              <p className="text-[#E59819]">{data.rating}</p>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="text-[#E59819]">
                    <IoIosStar />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#4F547B]">({data.ratingCount})</p>
          </div>
          <div className="bg-white p-3 rounded-full shadow-md absolute right-0 top-0">
          <Image
                width={0}
                height={0}
                src="/images/dashBoard/dashBoardMain/bookmark.svg"
                alt="image"
                className="object-cover rounded-full w-4 h-4 "
              />
          </div>
          </div>

          <div className="md:text-sm font-medium text-[#321463] mt-2">
            <Link className="linkCustom" href={`/courses/${data.id}`}>
              {data.title}
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
              <p className="md:text-xs">{data.lessonCount} lesson</p>
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
              <div className="md:text-xs">{data.level}</div>
            </div>
          </div>

          <div className="flex justify-between items-center bottom-0 mb-0">
            <div className="flex items-center gap-2">
              <Image
                width={0}
                height={0}
                src={data.authorImageSrc}
                alt="image"
                className="object-cover rounded-full w-8 h-8"
              />
              <p className="md:text-xs text-[#4F547B]">{data.authorName}</p>
            </div>

            <div className="">
              {data.paid ? (
                <div className="flex items-center gap-1 font-medium">
                  <p className="md:text-xs text-[#4F547B] line-through">
                    ${data.originalPrice}
                  </p>
                  <p className="text-lg md:text-sm text-[#321463]">
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

export default BookmarkCard;

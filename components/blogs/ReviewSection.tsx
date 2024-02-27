import React from "react";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { IReviews } from "@/utils/type.dt";
import { getTimestamp } from "@/utils";
import { ViewRating } from "../reusableComponents/Rating";

interface Props {
  reviewsData?: IReviews;
}

const ReviewSection: React.FC<Props> = ({ reviewsData }) => {
  console.log(reviewsData);
  return (
    <div className="pt-6">
      <h1 className="text-[#321463] font-semibold text-lg md:text-base">
        {" "}
        Reviews
      </h1>
      {reviewsData && reviewsData.reviews?.length > 0 && (
        <div className="flex flex-col gap-2">
          {reviewsData!.reviews.map((review) => (
            <div
              className="border-b-2 border-[#EEEEEE] flex gap-5 items-start py-5"
              key={review._id}
            >
              {review.userId.imgUrl ? (
                <Image
                  width={100}
                  height={100}
                  src={review.userId.imgUrl}
                  alt="image"
                  className="w-12 h-12 object-cover rounded-full"
                />
              ) : (
                <div className="rounded-full w-10 h-10 text-white px-4 bg-[#C5165D] text-[16px] flex items-center justify-center">
                  {review.userId.firstName[0]}
                  {review.userId.lastName[0]}
                </div>
              )}

              <div className="space-y-2 md:space-y-3">
                <div className="flex gap-2 items-center">
                  <h1 className="text-[#321463] font-medium">
                    {review.userId.firstName} {review.userId.lastName}
                  </h1>
                  <p className="md:text-sm text-[#4F547B]">
                    {getTimestamp(review.createdAt)}
                  </p>
                </div>
                <ViewRating size="small" value={review.starRating} />

                <p className="text-[#4F547B]">{review.comment}</p>
                <div className="md:flex gap-5">
                  <p className="text-[#C5165D] text-sm md:text-md">
                    Was this review helpful?
                  </p>
                  <div className="flex items-center gap-5 mt-2 md:mt-0 font-medium">
                    <div>
                      <button className="bg-[#C5165D] p-1 px-4 rounded-md text-white">
                        Yes
                      </button>
                    </div>
                    <div>
                      <button className="bg-[#E5F0FD] p-1 px-4 rounded-md text-[#C5165D]">
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;

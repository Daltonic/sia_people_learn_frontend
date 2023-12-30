import React from "react";
import ReviewSection from "./ReviewSection";

const AllReviews: React.FC = () => {
  return (
    <div>
      <div className="mb-16 hidden md:block">
        <h1 className="font-bold text-[#321463] md:text-3xl">Reviews</h1>
        <p className="text-[#4F547B] text-lg">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>
      <div className="bg-white rounded-lg ">
        <h1 className="p-5 text-[#321463] font-medium border-b border-[#EDEDED] text-xl md:text-base">
          All Reviews
        </h1>
        <div className="p-5">
          {" "}
          {[...Array(5)].map((_, i) => (
            <ReviewSection key={i} />
          ))}
        </div>
        <div className="text-center pb-5">
          <p className="underline text-[#C5165D] text-sm">View All Reviews</p>
        </div>
      </div>
    </div>
  );
};

export default AllReviews;

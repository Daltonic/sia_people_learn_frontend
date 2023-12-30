import React from "react";
import BookmarkCard from "./BookmarkCard";
import { coursesData } from "@/data/courses";

const Bookmarks: React.FC = () => {
  return (
    <div>
      <div className="mb-16 hidden md:block">
        <h1 className="font-bold text-[#321463] md:text-3xl">Bookmarks</h1>
        <p className="text-[#4F547B] text-lg">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>
      <div className="bg-white rounded-lg">
        <h1 className="p-5 text-[#321463] font-medium border-b border-[#EDEDED] text-xl md:text-base">
          Bookmarked
        </h1>
        <div className="flex p-5 gap-8 md:gap-5 border w-full flex-wrap">
          {coursesData.map((elm, i: number) => (
            <BookmarkCard data={elm} index={i} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;

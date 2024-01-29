import React, { useEffect } from "react";
import BookmarkCard from "./BookmarkCard";
import { coursesData } from "@/data/courses";
import { _useContext } from "@/context/Context";

const Bookmarks: React.FC = () => {
  const { user, setUser } = _useContext();
  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
    if (!user) {
      setUser(sessionUser);
    }
  }, [setUser, user]);
  return (
    <div>
      <div className="mb-10 md:mb-16 px-5 sm:px-0">
        <h1 className="font-bold text-[#321463] text-3xl">Bookmarks</h1>
        <p className="text-[#4F547B] text-lg">
          Save your favorite courses for quick access later.
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

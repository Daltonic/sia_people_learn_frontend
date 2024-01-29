import React, { useEffect } from "react";
import BookmarkCard from "./BookmarkCard";
import { coursesData } from "@/data/courses";
import { _useContext } from "@/context/Context";
import DashboardHeading from "../dashboardLayout/DashboardHeading";

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
      <DashboardHeading
        title="Bookmarks"
        description=" Save your favorite courses for quick access later."
      />
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

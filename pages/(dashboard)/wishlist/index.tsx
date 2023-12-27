import DashBoardHeader from "@/components/dashboard/dashboardLayout/DashBoardHeader";
import DashBoardSidebar from "@/components/dashboard/dashboardLayout/DashBoardSidebar";
import React from "react";
import Bookmarks from "@/components/dashboard/wishList/Bookmarks";

const WishList: React.FC = () => {
  return (
    <div className="bg-white">
      <DashBoardHeader />
      <div className="flex justify-between md:pr-5">
        <DashBoardSidebar />
        <main className="flex-1 bg-[#F7F8FB] p-5 md:px-10 md:py-16 md:rounded-xl">
          <Bookmarks/>
        </main>
      </div>
    </div>
  );
};

export default WishList;

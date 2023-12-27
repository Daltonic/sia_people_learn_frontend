import DashBoardTop from "@/components/dashboard/dashboard/DashBoardTop";
import DashBoardHeader from "@/components/dashboard/dashboardLayout/DashBoardHeader";
import DashBoardSidebar from "@/components/dashboard/dashboardLayout/DashBoardSidebar";
import { states } from "@/data/dashBoard";
import React from "react";

const DashBoard: React.FC = () => {
  return (
    <div className="bg-white">
      <DashBoardHeader />
      <div className="flex justify-between pr-5">
      <DashBoardSidebar />
      <main className="flex-1 bg-[#F7F8FB] px-10 py-16 rounded-xl">
        <DashBoardTop states={states}/>
        
      </main>
    </div>
    </div>
  );
};

export default DashBoard;

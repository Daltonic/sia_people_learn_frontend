import DashBoardTop from "@/components/dashboard/dashboard/DashBoardTop";
import PopularInstructors from "@/components/dashboard/dashboard/PopularInstructors";
import RecentCourses from "@/components/dashboard/dashboard/RecentCourses";
import Statistics from "@/components/dashboard/dashboard/Statistics";
import Traffic from "@/components/dashboard/dashboard/Traffic";
import DashBoardHeader from "@/components/dashboard/dashboardLayout/DashBoardHeader";
import DashBoardSidebar from "@/components/dashboard/dashboardLayout/DashBoardSidebar";
import { states } from "@/data/dashBoard";
import { teamMembers } from "@/data/instructors";
import { resentCourses } from "@/data/courses";
import { notifications } from "@/data/notifications";
import React from "react";
import Notifications from "@/components/dashboard/dashboard/Notifications";

const DashBoard: React.FC = () => {
  return (
    <div className="bg-white">
      <DashBoardHeader />
      <div className="flex justify-between pr-5">
        <DashBoardSidebar />
        <main className="flex-1 bg-[#F7F8FB] px-10 py-16 rounded-xl">
          <DashBoardTop states={states} />
          <div className="flex justify-between mt-10">
            <Statistics />
            <Traffic />
          </div>
          <div className="flex gap-8 mt-10">
            <div className="space-y-8">
              <PopularInstructors teamMembers={teamMembers} />
              <Notifications notifications={notifications} />
            </div>
            <RecentCourses resentCourses={resentCourses} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;

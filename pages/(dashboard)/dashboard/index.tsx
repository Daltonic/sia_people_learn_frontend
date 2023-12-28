import DashBoardTop from "@/components/dashboard/dashboard/DashBoardTop";
import PopularInstructors from "@/components/dashboard/dashboard/PopularInstructors";
import RecentCourses from "@/components/dashboard/dashboard/RecentCourses";
import Statistics from "@/components/dashboard/dashboard/Statistics";
import Traffic from "@/components/dashboard/dashboard/Traffic";
import { states } from "@/data/dashBoard";
import { teamMembers } from "@/data/instructors";
import { resentCourses } from "@/data/courses";
import { notifications } from "@/data/notifications";
import React from "react";
import Notifications from "@/components/dashboard/dashboard/Notifications";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";

const DashBoard: React.FC = () => {
  return (
    <DashboardLayout>
      <DashBoardTop states={states} />
      <div className="flex flex-col md:flex-row justify-between mt-10 gap-8 md:gap-0">
        <Statistics />
        <Traffic />
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-10">
        <div className="space-y-8">
          <PopularInstructors teamMembers={teamMembers} />
          <Notifications notifications={notifications} />
        </div>
        <RecentCourses resentCourses={resentCourses} />
      </div>
    </DashboardLayout>
  );
};

export default DashBoard;

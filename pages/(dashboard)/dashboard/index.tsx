import DashBoardTop from "@/components/dashboard/dashboard/DashBoardTop";
import PopularInstructors from "@/components/dashboard/dashboard/PopularInstructors";
import RecentCourses from "@/components/dashboard/dashboard/RecentCourses";
import Statistics from "@/components/dashboard/dashboard/Statistics";
import Traffic from "@/components/dashboard/dashboard/Traffic";
import { states } from "@/data/dashBoard";
import { teamMembers } from "@/data/instructors";
import { resentCourses } from "@/data/courses";
import { notifications } from "@/data/notifications";
import React, { useEffect } from "react";
import Notifications from "@/components/dashboard/dashboard/Notifications";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { _useContext } from "@/context/Context";
import { useRouter } from "next/navigation";

const DashBoard: React.FC = () => {
  const { user, setUser } = _useContext();
  const router = useRouter();

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
    if (!user) {
      setUser(sessionUser);
    }
  }, [setUser, user]);

  if (user?.userType === "user") {
    router.push("/(dashboard)/myCourses");
  }
  if (user?.userType === "instructor") {
    router.push("/(dashboard)/myProducts");
  }

  return (
    user?.userType === "admin" && (
      <DashboardLayout>
        <div className="px-5">
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
        </div>
      </DashboardLayout>
    )
  );
};

export default DashBoard;

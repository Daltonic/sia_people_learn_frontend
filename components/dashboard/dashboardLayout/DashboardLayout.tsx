import React, { useState } from "react";
import DashBoardHeader from "@/components/dashboard/dashboardLayout/DashBoardHeader";
import DashBoardSidebar from "@/components/dashboard/dashboardLayout/DashBoardSidebar";
import DashBoardFooter from "./DashBoardFooter";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  ...props
}) => {
  const [sidebarOpen] = useState(false);

  return (
    <div className="bg-white">
      <DashBoardHeader />
      <div className="flex justify-between md:pr-5">
        <div className=" md:sticky md:top-6 md:h-full">
          <DashBoardSidebar isOpen={sidebarOpen} />
        </div>
        <main className="flex-1 bg-[#F7F8FB] px-0 py-5 sm:px-10 md:py-12 md:rounded-xl">
          {children}
        </main>
      </div>
      <DashBoardFooter />
    </div>
  );
};

export default DashboardLayout;

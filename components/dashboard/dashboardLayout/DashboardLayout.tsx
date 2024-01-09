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
        <DashBoardSidebar isOpen={sidebarOpen} />
        <main className="flex-1 bg-[#F7F8FB] p-5 md:px-10 md:py-16 md:rounded-xl">
          {children}
        </main>
      </div>
      <DashBoardFooter />
    </div>
  );
};

export default DashboardLayout;

import React from "react";

type SidebarProps = {};

const DashBoardFooter: React.FC<SidebarProps> = () => {
  return (
    <div className="flex justify-end bg-white px-5 md:px-8 py-5">
      <div className="w-full md:w-4/5 sm:text-sm text-[#4F547B] md:px-10">
        <p>© 2023 Dapp Mentors. All Right Reserved.</p>
      </div>
    </div>
  );
};

export default DashBoardFooter;

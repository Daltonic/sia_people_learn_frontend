import React from "react";

type SidebarProps = {};

const DashBoardFooter: React.FC<SidebarProps> = () => {
  return (
   <div className="flex justify-end bg-white px-8 py-5">
    <div className="w-4/5 flex justify-between text-sm text-[#4F547B] px-10">
        <p>© 2023 Dapp Mentors. All Right Reserved.</p>
        <p>Supported by a Sia Foundation grant.</p>
    </div>
    
   </div>
  );
};

export default DashBoardFooter;

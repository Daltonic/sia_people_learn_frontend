// components/DashboardSidebar.tsx
import React from "react";
import Link from "next/link";
import { sidebarItems } from "@/data/dashBoardSidebar";
import { useRouter } from "next/router";

interface DashboardSidebarProps {
  isOpen: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen }) => {
  const router = useRouter();

  return (
    <div
      className={`px-6 pt-14 space-y-3 fixed top-0 left-0 h-full overflow-auto transform ease-in-out transition-all duration-300 bg-white ${
        isOpen ? "translate-x-0" : "-translate-x-full "
      } md:translate-x-0 md:static md:block z-10 w-4/5 md:w-fit`}
    >
      {sidebarItems.map((elm, i) => (
        <div
          key={i}
          className={`py-2 pl-4 w-56 md:w-48 pr-5 font-medium rounded-xl border ${
            router.pathname === elm.href
              ? "text-white bg-[#C5165D]"
              : "text-[#4F547B]"
          }`}
        >
          <Link href={elm.href}>
            <div className="flex items-center gap-2 text-xl md:text-base ">
              <div>
                {elm.iconClass &&
                  React.cloneElement(elm.iconClass, {
                    color: router.pathname === elm.href ? "#FFFFFF" : "#6A7A99",
                  })}
              </div>
              <div>{elm.text}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardSidebar;

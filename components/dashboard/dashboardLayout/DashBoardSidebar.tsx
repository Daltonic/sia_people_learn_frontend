// @flow
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { sidebarItems } from "@/data/dashBoardSidebar";
import Image from "next/image";

type SidebarProps = {};

const DashBoardSidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();

  return (
    <div className="px-6 pt-14 space-y-3">
      {sidebarItems.map((elm, i) => (
        <div key={i}   className={ `py-2 pl-4 w-48 pr-5 font-medium rounded-xl ${router.pathname === elm.href ?  'text-white bg-[#C5165D]' : 'text-[#4F547B]' } `}>
          <Link href={elm.href}>
            <div className="flex gap-2">
            <Image
                width={18}
                height={18}
                src={elm.iconClass}
                alt="logo"
              />
              {elm.text}
              </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashBoardSidebar;

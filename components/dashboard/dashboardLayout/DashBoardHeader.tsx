import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegMoon } from "react-icons/fa";
import { CiMaximize2 } from "react-icons/ci";
import { HiOutlineBell, HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import DashBoardSidebar from "./DashBoardSidebar";
import { _useContext } from "@/context/Context";

type SidebarProps = {};

const DashBoardHeader: React.FC<SidebarProps> = () => {
  const { user } = _useContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="flex justify-between items-center p-5 sm:px-10 sticky h-20 top-0 w-full z-50 bg-white"
      onClick={isOpen ? closeSidebar : undefined}
    >
      <div className="flex gap-4 items-center">
        <div
          className="block md:hidden text-[#321463] text-3xl"
          onClick={toggleSidebar}
        >
          <FaBarsStaggered />
        </div>
        <div>
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                width={35}
                height={35}
                src="/images/logoImg.svg"
                alt="logo"
              />
              <p className="text-[#321463] text-lg md:text-md font-medium">
                Dapp Mentors
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex items-center text-[#6A7A99] text-lg">
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <FaRegMoon />
        </div>
        <Link href="/blogs">
          <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
            <CiMaximize2 />
          </div>
        </Link>

        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <HiOutlineShoppingBag />
        </div>
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <HiOutlineMail />
        </div>
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <HiOutlineBell />
        </div>
        {user && (
          <>
            {user.imgUrl ? (
              <Image
                width={28}
                height={28}
                src={user.imgUrl}
                alt="profile"
                className="rounded-full"
              />
            ) : (
              <div className="text-white bg-[#C5165D] text-[16px] flex items-center justify-center h-8 w-8 p-1 rounded-full">{`${user?.firstName[0].toUpperCase()}${user?.lastName[0].toUpperCase()}`}</div>
            )}
          </>
        )}
        <div></div>
      </div>
      <div className="md:hidden">
        <DashBoardSidebar isOpen={isOpen} />
      </div>
    </div>
  );
};

export default DashBoardHeader;

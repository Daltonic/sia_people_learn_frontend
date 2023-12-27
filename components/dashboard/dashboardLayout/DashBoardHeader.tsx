import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegMoon } from "react-icons/fa";
import { CiMaximize2 } from "react-icons/ci";
import { HiOutlineBell, HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";

type SidebarProps = {};

const DashBoardHeader: React.FC<SidebarProps> = () => {
  return (
    <div className="flex justify-between items-center p-5 px-10">
      <div>
        <div>
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                width={35}
                height={35}
                src="/images/logoImg.svg"
                alt="logo"
              />
              <p className="text-[#321463] text-md font-medium">Dapp Mentors</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex items-center text-[#6A7A99] text-lg">
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <FaRegMoon />
        </div>
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <CiMaximize2 />
        </div>
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <HiOutlineShoppingBag />
        </div>
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <HiOutlineMail />
        </div>
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <HiOutlineBell />
        </div>
        <div >
              <Image
                width={45}
                height={45}
                src="/images/testimonials/testimonial1.svg"
                alt="profile"
                className="rounded-xl"
              />
            </div>
      </div>

    </div>
  );
};

export default DashBoardHeader;

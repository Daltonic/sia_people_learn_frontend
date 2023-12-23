"use client";
import React from "react";
import { IoIosStar } from "react-icons/io";
import Image from "next/image";
import { teamMembers } from "../../data/instructors";

import Button from "@/components/ReusableComponents/Button";

const Profile: React.FC = () => {
  const data = teamMembers[0];
  return (
    <div
      className="bg-[#C5165D] w-full py-10 md:py-20 pl-5 md:pl-40 rounded-md mb-10"
      style={{
        backgroundImage: `url(/images//instructors/instructorbg.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "start",
        width: "100%",
      }}
    >
      <div className="flex flex-col gap-1 md:gap-2">
        <Image
          width={0}
          height={0}
          src={data.image}
          alt="image"
          className="w-20 h-20 md:w-14 md:h-14 object-cover rounded-full"
        />
        <h4 className="font-bold">
          <p className="font-medium text-white text-xl md:text-md">{data.name}</p>
        </h4>
        <p className="md:text-sm text-white">{data.role}</p>
        <div className=" flex items-center gap-4">
          <div className="text-[#E59819] flex items-center gap-1 md:text-sm">
            <div>
              <IoIosStar />
            </div>
            <p>{data.rating}</p>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <Image
                width={10}
                height={10}
                src="/images/instructors/icons/playwhite.svg"
                alt="icon"
              />
            </div>
            <p className="text-white text-sm">{data.courses} Course</p>
          </div>
        </div>
        <div>
          <Button variant="whiteoutline"> Send Message</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

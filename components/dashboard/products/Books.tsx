"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaTimes } from "react-icons/fa";

interface ComponentProps {
  data: any;
  index?: number;
}

const Books: React.FC<ComponentProps> = ({ data }) => {
  return (
    <div
      className="w-full sm:w-64 rounded-lg border-[#EDEDED] border p-2 pb-0 shadow-[#EDEDED] shadow-md h-96"
      style={{ height: "fit-content" }}
    >
      <Link className="linkCustom" href={`/coursedetail/${data.id}`}>
        <Image
          width={0}
          height={0}
          style={{ height: "50%", width: "100%" }}
          className="rounded-lg object-cover"
          src={data.imageSrc}
          alt="image"
        />
      </Link>
      <div className="py-2 space-y-2">
        <div className="md:text-sm font-medium text-[#321463] mt-2">
          {data.title}
        </div>

        <div className="flex items-center gap-2">
          <Image
            width={0}
            height={0}
            src={data.authorImageSrc}
            alt="image"
            className="object-cover rounded-full w-8 h-8"
          />
          <p className="md:text-xs text-[#4F547B]">{data.authorName}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-green-400 hover:bg-transparent hover:border hover:border-green-400 hover:text-green-400  p-2 text-white rounded-md text-sm flex items-center gap-2">
            Approve
            <FaCheck />
          </button>
          <button className="bg-red-500 hover:bg-transparent hover:border hover:border-red-500 hover:text-red-500  p-2 text-white rounded-md text-sm w-20 flex items-center gap-2">
            Reject
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Books;

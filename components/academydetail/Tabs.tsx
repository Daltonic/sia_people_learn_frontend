"use client";
import React, { useState } from "react";
import { FaCheck, FaCircle } from "react-icons/fa";
import { IAcademy } from "@/utils/type.dt";
import Link from "next/link";
import Image from "next/image";

interface ComponentProps {
  academy: IAcademy;
  data: any;
  type: "Academy" | "Book" | "Course";
}

const Tabs: React.FC<ComponentProps> = ({ academy, type, data }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [showMore, setShowMore] = useState(false);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex justify-center mt-10 md:w-[57%]">
      <div className=" w-full">
        <div className="flex space-x-5 border-b text-lg md:text-md">
          <button
            onClick={() => handleTabClick(1)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 1
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Description
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 2
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Highlights
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 3
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Requirements
          </button>
          <button
            onClick={() => handleTabClick(4)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 4
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Courses
          </button>
        </div>

        <div className="py-4 md:mt-4">
          {activeTab === 1 && (
            <div>
              <p
                className={
                  showMore ? "text-[#4F547B]" : "line-clamp-3 text-[#4F547B] "
                }
              >
                {academy.description}
              </p>
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-2  text-[#C5165D] "
              >
                View More
              </button>
            </div>
          )}
          {activeTab === 2 && (
            <div className="">
              <h4 className="text-xl md:text-lg text-[#321463] font-medium mb-3 md:mb-5">
                What you will learn
              </h4>
              <div className="w-5/6">
                <div className="space-y-5">
                  {academy.requirements.map((requirement, index) => (
                    <div
                      key={index}
                      className="flex items-center text-[#4F547B]"
                    >
                      <div className="flex justify-center items-center border border-gray-300 rounded-full h-5 w-5 mr-3 p-1 ">
                        <FaCheck className="text-[10px]" />
                      </div>
                      <span key={index}>{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div className="mt-15">
              <h4 className="text-xl md:text-lg text-[#321463] font-medium mb-3 md:mb-5">
                Requirements
              </h4>
              <ul className="space-y-5 md:pt-15">
                {academy.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2 md:gap-5">
                    <div>
                      <FaCircle className="text-[10px] text-[#4F547B]" />
                    </div>

                    <span key={index}>{requirement}</span>
                  </div>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 4 && (
            <div>
              {academy.courses.map((course) => (
                <div key={course._id} className="flex gap-2 items-center mb-2">
                  <div>
                    <Image
                      height={0}
                      width={0}
                      src={course.imageUrl || "/images/courseCard/card4.svg"}
                      alt=""
                      className="w-20 h-12 overflow-hidden object-cover rounded-md"
                    />
                  </div>
                  <h2 className="text-[#4F547B] md:text-sm">{course.name}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

"use client";
import React, { useState } from "react";
import { coursesData } from "@/data/courses";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import Courses from "./Courses";
import Academy from "./Academy";
import Books from "./Books";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="">
        <SearchAndFilterBar />
        <div className="flex space-x-5 border-b">
          <button
            onClick={() => handleTabClick(1)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 1
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Courses
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
            Books
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
            Academy
          </button>
        </div>

        <div className="py-4 text-[#4F547B]">
          {activeTab === 1 && (
            <div className="flex p-5 gap-8 border w-full flex-wrap">
              {coursesData.map((elm, i: number) => (
                <Courses data={elm} index={i} key={i} />
              ))}
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex p-5 gap-5 border w-full flex-wrap">
              {coursesData.map((elm, i: number) => (
                <Books data={elm} index={i} key={i} />
              ))}
            </div>
          )}
          {activeTab === 3 && (
            <div className="flex p-5 gap-8 border w-full flex-wrap">
              {coursesData.map((elm, i: number) => (
                <Academy data={elm} index={i} key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

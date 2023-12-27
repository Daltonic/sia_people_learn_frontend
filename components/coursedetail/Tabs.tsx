"use client";
import React, { useState } from "react";
import { learnList, requirements } from "@/data/aboutcourses";
import { FaCheck, FaCircle } from "react-icons/fa";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [showMore, setShowMore] = useState(false);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full">
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
            Overview
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
            Course Content
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
        </div>

        <div className="py-4 md:mt-8">
          {activeTab === 1 && (
            <div>
              <h4 className="text-xl md:text-lg text-[#321463] font-medium mb-2 md:mb-5">
                Description
              </h4>
              <p
                className={
                  showMore ? "text-[#4F547B]" : "line-clamp-3 text-[#4F547B] "
                }
              >
                Phasellus enim magna, varius et commodo ut, ultricies vitae
                velit. Ut nulla tellus, eleifend euismod pellentesque vel,
                sagittis vel justo. In libero urna, venenatis sit amet ornare
                non, suscipit nec risus. Sed consequat justo non mauris pretium
                at tempor justo sodales. Quisque tincidunt laoreet malesuada.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur. This course is aimed at people interested in UI/UX
                Design. We'll start from the very beginning and work all the way
                through, step by step. If you already have some UI/UX Design
                experience but want to get up to speed using Adobe XD then this
                course is perfect for you too! First, we will go over the
                differences between UX and UI Design. We will look at what our
                brief for this real-world project is, then we will learn about
                low-fidelity wireframes and how to make use of existing UI
                design kits.
              </p>{" "}
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
                <div className="md:w-1/2">
                  <div className="space-y-5">
                    {learnList.slice(0, 6).map((elm, i: number) => (
                      <div key={i} className="flex items-center">
                        <div className="flex justify-center items-center border border-gray-300 rounded-full h-5 w-5 mr-3  text-[#4F547B]">
                          <FaCheck className="text-[10px]" />
                        </div>
                        <p className="text-[#4F547B]">{elm}</p>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          )}
          {activeTab === 3 && (
            <div className="mt-15">
              <h4 className="text-xl md:text-lg text-[#321463] font-medium mb-3 md:mb-5">Requirements</h4>
              <ul className="space-y-5 md:pt-15">
                {requirements.map((elm, i: number) => (
                  <div key={i} className="flex items-center gap-2 md:gap-5">
                    <div>
                      <FaCircle className="text-[10px] text-[#4F547B]" />
                    </div>
                    <p className="text-[#4F547B]">{elm}</p>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

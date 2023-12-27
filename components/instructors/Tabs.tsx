"use client";
import React, { useState } from "react";
import { coursesData } from "@/data/courses";
import CourseCard from "../../components/home/CoursesSlider/CourseCard";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [showMore, setShowMore] = useState(false);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex justify-center px-5 md:px-0">
      <div className="md:w-[85%]">
        <div className="flex space-x-3 border-b">
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
            Courses
          </button>
        </div>

        <div className="py-4">
          {activeTab === 1 && (
            <div>
              <p className={showMore ? "text-[#4F547B]" : "line-clamp-3 text-[#4F547B] "}>
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
            <div className="flex flex-wrap gap-8 md:gap-0 justify-between">
              {coursesData.slice(0, 4).map((elm, i: number) => (
                <CourseCard data={elm} index={i} key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

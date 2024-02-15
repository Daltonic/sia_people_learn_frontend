"use client";
import React, { useState } from "react";
import { coursesData } from "@/data/courses";
import CourseCard from "../courses/CourseCard";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [showMore, setShowMore] = useState(false);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex justify-center px-5 sm:px-10 md:px-0">
      <div className="md:w-[85%]">
        <div className="flex space-x-3 sm:space-x-5 border-b">
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
              <p
                className={
                  showMore ? "text-[#4F547B]" : "line-clamp-3 text-[#4F547B] "
                }
              >
                As an instructor for Dapp Mentors Academy, I bring a wealth of
                experience and knowledge in the realm of Web3 and Blockchain
                technologies. My background includes extensive research and
                hands-on experience in developing decentralized applications
                (DApps), smart contracts, and interacting with various
                blockchain networks. My teaching methodology is interactive and
                engaging, ensuring students grasp the concepts quickly and
                effectively. I utilize a variety of teaching strategies,
                including live demonstrations, practical exercises, and
                real-world case studies. My aim is to make learning fun and
                exciting, while equipping students with the practical skills
                needed to navigate the rapidly evolving landscape of Web3 and
                Blockchain. I am committed to keeping up with the latest
                developments in the field and incorporating them into my
                courses. My teaching approach is constantly evolving, guided by
                feedback from students and changes in the industry. I believe in
                fostering a supportive and collaborative learning environment. I
                encourage students to ask questions, share ideas, and learn from
                each other. My ultimate goal is to equip students with the
                knowledge and skills they need to excel in the world of Web3 and
                Blockchain.
              </p>{" "}
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-2  text-[#C5165D] "
              >
                View More
              </button>
            </div>
          )}
          {/* {activeTab === 2 && (
            <div className="flex flex-wrap gap-8 md:gap-0 justify-between">
              {coursesData.slice(0, 4).map((elm, i: number) => (
                <CourseCard data={elm} index={i} key={i} />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

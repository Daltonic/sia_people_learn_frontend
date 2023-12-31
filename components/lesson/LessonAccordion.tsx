import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { coursesData } from "@/data/courses";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const LessonAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleTitleClick = (index: number) => {
    setActiveIndex((prevIndex) => prevIndex === index ? -1 : index);
   };
   

  return (
    <div className="space-y-4 w-[33%] pr-10">
      {coursesData.map((lesson, index) => (
        <div
          key={index}
          className="border border-[#EDEDED] rounded-md bg-[#F7F8FB]"
        >
          <div
            className="cursor-pointer flex items-center gap-2 px-4 py-2"
            onClick={() => handleTitleClick(index)}
          >
            <div className=" text-sm text-[#321463]">
              {activeIndex === index ? (
                <IoIosArrowUp size={24} />
              ) : (
                <IoIosArrowDown size={24} />
              )}
            </div>
            <h2 className="font-medium text-[#321463]">{lesson.title}</h2>
          </div>
          {activeIndex === index && (
            <div className="mt-4">
              <div className="flex justify-between items-center bg-white p-4">
                <div className="p-2 rounded-full bg-[#FBEFF4]">
                  <FaPlay size={10} color="#C5165D" />
                </div>

                <div className="text-[#4F547B] text-sm flex justify-between">
                  <p>{lesson.duration}</p>
                  <p> {lesson.duration}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LessonAccordion;

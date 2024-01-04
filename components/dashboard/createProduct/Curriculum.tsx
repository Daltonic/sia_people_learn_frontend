import React, { useState } from "react";
import { lessonItems } from "@/data/aboutcourses";
import { IoIosArrowDown, IoIosArrowUp, IoMdMenu } from "react-icons/io";
import { SlPencil } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "@/components/reusableComponents/Button";

const Curriculum: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleTitleClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="bg-white rounded-lg mt-10">
      <div>
        <h1 className="p-5 text-[#321463] font-medium border-b border-[#EDEDED] text-xl md:text-base">
          Curriculum
        </h1>
      </div>
      <div className="p-5">
        {lessonItems.map((lesson, index) => (
          <div className="" key={index}>
            <h2 className="font-medium text-[#321463] mb-2 mt-5">
              {lesson.title}
            </h2>
            <div  className="border border-[#EDEDED] rounded-md">
              <div
                className="cursor-pointer flex items-center justify-between px-4 py-2 bg-[#F7F8FB]"
                onClick={() => handleTitleClick(index)}
              >
                <div className="flex items-center gap-2 text-[#321463]">
                  <IoMdMenu />
                  <h2 className="font-medium ">{lesson.title}</h2>
                </div>
                <div className="flex items-center gap-4">
                  <SlPencil className="text-[#6A7A99]" />
                  <RiDeleteBinLine className="text-[#6A7A99]" />
                  <div className=" text-sm text-[#321463]">
                    {activeIndex === index ? (
                      <IoIosArrowUp size={20} />
                    ) : (
                      <IoIosArrowDown size={20} />
                    )}
                  </div>
                </div>
              </div>
              {activeIndex === index && (
                <div className="flex gap-5 p-4">
                    <Button variant="lightpurple" className="text-[#C5165D]">Add Article +</Button>
                    <Button variant="lightpurple" className="text-[#C5165D]">Add Description</Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;

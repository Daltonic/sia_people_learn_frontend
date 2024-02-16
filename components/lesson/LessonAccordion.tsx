"use client";

import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { lessonItems } from "@/data/aboutcourses";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Image from "next/image";
import { ICourse, RootState } from "@/utils/type.dt";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/userSlice";

interface Props {
  course: ICourse;
}

const LessonAccordion: React.FC<Props> = ({ course }) => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleTitleClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  console.log(course);
  return (
    <div className="space-y-4 w-full border md:p-5 rounded-md">
      {lessonItems.map((lesson, index) => (
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
              {course.lessons.length > 0 &&
                course.lessons.map((lesson) => (
                  <div key={lesson._id} className=" bg-white py-2 px-4">
                    <div className="text-[#4F547B] md:text-sm">
                      <div className="flex item-center gap-2">
                        <div>
                          <Image
                            height={100}
                            width={100}
                            src={
                              lesson.imageUrl || "/images/courseCard/card3.svg"
                            }
                            alt="Course Image"
                            className="w-14 h-10 object-cover rounded-md"
                          />
                        </div>
                        <div className="w-64">
                          <h3 className="font-medium">{lesson.title}</h3>
                          <p className="underline">{lesson.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LessonAccordion;

"use client";
import React, { useState } from "react";
import { learnList, requirements } from "@/data/aboutcourses";
import { FaCheck, FaCircle } from "react-icons/fa";
import Image from "next/image";
import ReviewSection from "../blogDetail/ReviewSection";
import ReviewForm from "../blogDetail/ReviewForm";

const LessonDetails: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="md:pl-20 p-5 md:w-[65%]">
      <div className="w-full relative flex items-center justify-center">
        <Image
          width={0}
          height={0}
          className="rounded-md w-full h-[20rem] object-cover"
          src="/images/courseCard/card2.svg"
          alt="image"
        />
          <div className="p-4 bg-[#ffffff] rounded-full absolute">
          {" "}
          <Image
            width={12}
            height={12}
            src="/images/instructors/icons/play.svg"
            alt="icon"
          />
        </div>
      </div>
      <div className="md:px-4 mt-6 space-y-6">
        <div>
          <h4 className="text-xl md:text-lg text-[#321463] font-semibold mb-2 md:mb-5">
            Description
          </h4>
          <p className="text-[#4F547B]">
            Phasellus enim magna, varius et commodo ut, ultricies vitae velit.
            Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel
            justo. In libero urna, venenatis sit amet ornare non, suscipit nec
            risus. Sed consequat justo non mauris pretium at tempor justo
            sodales. Quisque tincidunt laoreet malesuada. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur. This course is
            aimed at people interested in UI/UX Design. We will start from the
            very beginning and work all the way through, step by step. If you
            already have some UI/UX Design experience but want to get up to
            speed using Adobe XD then this course is perfect for you too! First,
            we will go over the differences between UX and UI Design. We will
            look at what our brief for this real-world project is, then we will
            learn about low-fidelity wireframes and how to make use of existing
            UI design kits.
          </p>
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-2  text-[#C5165D] "
          >
            View More
          </button>
        </div>
        <div className="">
          <h4 className="text-xl md:text-lg text-[#321463] font-semibold mb-3 md:mb-5">
            What you will learn
          </h4>
          <div className="md:w-1/2">
            <div className="space-y-5">
              {learnList.slice(0, 6).map((elm, i: number) => (
                <div key={i} className="flex items-start">
                  <div className="flex justify-center items-center border border-gray-300 rounded-full h-5 w-5 mr-3  text-[#4F547B]">
                    <FaCheck className="text-[10px]" />
                  </div>
                  <p className="text-[#4F547B]">{elm}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-15">
          <h4 className="text-xl md:text-lg text-[#321463] font-semibold mb-3 md:mb-5">
            Requirements
          </h4>
          <ul className="space-y-5">
            {requirements.map((elm, i: number) => (
              <div key={i} className="flex items-start gap-2 md:gap-5">
                <div>
                  <FaCircle className="text-[10px] text-[#4F547B]" />
                </div>
                <p className="text-[#4F547B]">{elm}</p>
              </div>
            ))}
          </ul>
        </div>
        <ReviewSection/>
        <ReviewForm/>
      </div>
    </div>
  );
};

export default LessonDetails;

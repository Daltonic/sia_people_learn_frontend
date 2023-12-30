import React from "react";
import Tabs from "./Tabs";

const MyCourses: React.FC = () => {
  return (
    <div className="">
      <div className="mb-10 md:mb-16">
        <h1 className="font-bold text-[#321463] text-3xl">My Courses</h1>
        <p className="text-[#4F547B] text-lg">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>
      <Tabs />
    </div>
  );
};

export default MyCourses;

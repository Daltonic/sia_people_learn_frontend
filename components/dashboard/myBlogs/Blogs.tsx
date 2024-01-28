"use client";

import { _useContext } from "@/context/Context";
import Tabs from "./Tabs";

const Blogs: React.FC = () => {
  return (
    <div className="">
      <div className="mb-10 md:mb-16  px-5 sm:px-0">
        <h1 className="font-bold text-[#321463] text-3xl">Blogs</h1>
        <p className="text-[#4F547B] text-lg">
          Access your blogs, create new blogs, and view all blogs
        </p>
      </div>
      <Tabs />
    </div>
  );
};

export default Blogs;

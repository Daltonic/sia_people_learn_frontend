import React from "react";
import BlogCard from "../blog/BlogCard";
import { blogs } from "@/data/blogs";

const RelatedPosts: React.FC = () => {
  return (
    <div className="bg-[#F7F8FB] p-20 flex flex-col items-center sm:mt-10">
      <div className="text-center">
        <h4 className="font-bold text-[#321463] text-xl md:text-2xl">
          Related Posts
        </h4>
        <p className=" text-[#4F547B]">
          Read our related posts for more Solidity and Blockchain insights.
        </p>
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row gap-9 sm:gap-4 mt-14">
        {/* {blogs.slice(0, 4).map((blog, i: number) => (
          <BlogCard i={i} key={i} blog={blog} />
        ))} */}
      </div>
    </div>
  );
};

export default RelatedPosts;

import React from "react";
import { blogs } from "@/data/blogs";
import Link from "next/link";
import Button from "@/components/reusableComponents/Button";
import { GoArrowUpRight } from "react-icons/go";
import BlogCard from "../blog/BlogCard";

const BlogList: React.FC = () => {
  return (
    <section className="my-16 flex flex-col items-center justify-center px-5 md:px-10 lg:px-36">
      <div className="md:w-4/5">
      <div className="md:flex justify-between items-center w-full">
        <div className=" ">
          <h2 className="text-[#321463] font-bold text-3xl md:text-3xl">
            Blog
          </h2>
          <p className="text-[#4F547B] text-sm">
            Browse through our recent blog posts
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <Link
            href="/blog"
            className="font-medium text-sm text-center px-3 flex items-center rounded-md bg-[#6440FB12] text-[#1A064F]  hover:text-[#C5165D] border-2 border-transparent hover:border-[#C5165D] hover:bg-transparent w-fit"
          >
            <Button className=""> All Courses </Button>
            <GoArrowUpRight className="md:-ml-4 text-lg font-bold" />
            <i className="icon-arrow-top-right text-13 ml-10"></i>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-16 mt-16">
        {blogs.slice(0, 4).map((blog, i: number) => (
          <BlogCard i={i} key={i} blog={blog} />
        ))}
      </div>
      </div>
    </section>
  );
};

export default BlogList;

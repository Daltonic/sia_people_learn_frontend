import React from "react";
import Link from "next/link";
import Button from "@/components/reusableComponents/Button";
import { GoArrowUpRight } from "react-icons/go";
import BlogCard from "../blogs/BlogCard";
import { IPosts } from "@/utils/type.dt";
import AllButton from "../reusableComponents/AllButton";

interface Props {
  postsObj: IPosts;
}

const BlogList: React.FC<Props> = ({ postsObj }) => {
  return (
    <section className="my-16 flex flex-col items-center justify-center px-5 sm:px-10 lg:px-36">
      <div className="w-full md:w-5/6">
        <div className="sm:flex justify-between items-center w-full">
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
              href="/blogs"
            >
              <AllButton> All Blogs</AllButton>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between lg:gap-16 mt-12">
          {postsObj.posts &&
            postsObj.posts.map((blog, i: number) => (
              <BlogCard i={i} key={i} blog={blog} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;

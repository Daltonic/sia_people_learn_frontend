import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { IPost } from "@/utils/type.dt";
import { convertStringToDate } from "@/utils";

interface BlogCardProps {
  blog: IPost;
  i: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, i }) => {
  return (
    <div
      className="w-full sm:w-[48%] md:w-56 mb-6"
      data-aos="fade-left"
      data-aos-duration={(i + 1) * 500}
    >
      <div className="w-full ">
        <Image
          width={0}
          height={0}
          src={blog.imageUrl || "/images/blog-list/1.svg"}
          alt="image"
          className="rounded-lg w-full h-full object-cover"
        />
      </div>
      <div className="mt-3 pr-2">
        <h1 className="text-[#C5165D] text-sm uppercase font-medium">
          {blog.userId.firstName}
        </h1>
        <h4 className="text-[#321463] font-medium md:text-sm">
          <Link className="linkCustom" href={`/blogs/${blog._id}`}>
            {blog.name}
          </Link>
        </h4>
        <p className="mt-1 text-[#4F547B] text-sm md:text-xs">
          {convertStringToDate(blog.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;

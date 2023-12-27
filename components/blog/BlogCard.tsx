import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blogs";

interface BlogCardProps {
  blog: (typeof blogs)[number];
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, i}) => {
  return (
    <div
      key={i}
      className=""
      data-aos="fade-left"
      data-aos-duration={(i + 1) * 500}
    >
      <div className="" data-aos="fade-left" data-aos-duration={(i + 1) * 400}>
        <div className="w-full md:w-64">
          <Image
            width={550}
            height={465}
            src={blog.imageSrc}
            alt="image"
            className="rounded;md"
          />
        </div>
        <div className="mt-3 pr-2">
          <h1 className="text-[#C5165D] text-sm uppercase">
            {blog.category.toUpperCase()}
          </h1>
          <h4 className="text-[#321463] font-bold md:text-sm">
            <Link className="linkCustom" href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </h4>
          <p className="mt-1 text-[#4F547B] text-sm md:text-xs">{blog.date}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IPost } from "@/utils/type.dt";
import { convertStringToDate } from "@/utils";

interface BlogCardProps {
  blog: IPost;
  i: number;
  enablePublishing?: boolean;
  handlePublish?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  i,
  enablePublishing,
  handlePublish,
}) => {
  const [showHoverText, setShowHoverText] = useState<boolean>(false);
  return (
    <div
      className="w-full sm:w-[48%] md:w-56 mb-6"
      data-aos="fade-left"
      data-aos-duration={(i + 1) * 500}
    >
      <div className="w-full relative">
        {enablePublishing && (
          <div
            className="absolute bg-slate-200 h-5 w-5 rounded-full top-0.5 left-0.5 cursor-pointer"
            onMouseEnter={() => setShowHoverText(true)}
            onMouseLeave={() => setShowHoverText(false)}
            onClick={handlePublish}
          />
        )}

        {showHoverText && (
          <p className="absolute bg-slate-200 text-gray-700 px-1 py-0.5 rounded-sm top-6 left-1.5 text-sm">
            Publish
          </p>
        )}
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
          {blog.category}
        </h1>
        <h4 className="text-[#321463] font-medium md:text-sm">
          <Link className="linkCustom" href={`/blogs/${blog._id}`}>
            {blog.title}
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
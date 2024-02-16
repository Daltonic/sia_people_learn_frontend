"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IPost, RootState } from "@/utils/type.dt";
import { convertStringToDate } from "@/utils";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";

interface BlogCardProps {
  blog: IPost;
  i: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, i }) => {
  const { userData } = useSelector((states: RootState) => states.userStates);
  const [showButton, setShowButton] = useState<boolean>(
    userData?.userType === "admin" && !blog.published
  );
  const [showHoverText, setShowHoverText] = useState<boolean>(false);
  const handlePublish = () => {
    const publishPost = async () => {
      const requestDetails = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts/publish/${blog._id}`,
          requestDetails
        );

        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const message = await response.text();
          alert(message);
          setShowButton(false);
          setShowHoverText(false);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };

    publishPost();
  };

  return (
    <div
      className="w-full sm:w-[48%] md:w-52 mb-6"
      data-aos="fade-left"
      data-aos-duration={(i + 1) * 500}
    >
      <div className="w-full relative">
        {showButton && (
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
        <Link className="linkCustom" href={`/blogs/${blog._id}`}>
          <div className="h-48">
            <Image
              width={100}
              height={100}
              src={blog.imageUrl || "/images/cardimg.svg"}
              alt="image"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </Link>

      </div>
      <div className="mt-3 pr-2">
        <h1 className="text-[#C5165D] text-sm uppercase font-medium">
          {blog.category}
        </h1>
        <Link className="linkCustom" href={`/blogs/${blog._id}`}>
          <h4 className="text-[#321463] font-medium md:text-sm">
            {blog.title}
          </h4>
        </Link>

        <p className="mt-1 text-[#4F547B] text-sm md:text-xs">
          {convertStringToDate(blog.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;

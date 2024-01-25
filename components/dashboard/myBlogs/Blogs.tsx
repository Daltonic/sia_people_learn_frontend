"use client";

import BlogCard from "@/components/blogs/BlogCard";
import { _useContext } from "@/context/Context";
import { IPost, IPosts } from "@/utils/type.dt";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Blogs: React.FC = () => {
  const router = useRouter();
  const { user } = _useContext();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [numOfPages, setNumberOfPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (!user) {
    router.push("/login");
  }

  useEffect(() => {
    if (!user) return;
    const fetchBlogs = async () => {
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts/user/posts`,
          requestDetails
        );
        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const result = (await response.json()) as IPost[];
          setPosts(result);
        }
      } catch (e: any) {
        console.log(e.message);
      } finally {
        setSearchQuery("");
      }
    };
    fetchBlogs();
  }, [searchQuery, user]);

  return (
    <div className="">
      <div className="mb-10 md:mb-16  px-5 sm:px-0">
        <h1 className="font-bold text-[#321463] text-3xl">Blogs</h1>
        <div className="w-full flex items-center justify-between">
          <p className="text-[#4F547B] text-lg">My Blogs</p>
          <Link
            href="/blogs/create"
            className="rounded-lg bg-blue-500 text-white sm:mx-10 md:mx-20 px-4 py-2 max-w-[200px]"
          >
            Create New Blog
          </Link>
        </div>
      </div>
      <div className="flex justify-between  w-full flex-wrap">
        {posts &&
          posts.map((post, index) => (
            <BlogCard key={post._id} blog={post} i={index} />
          ))}
      </div>
    </div>
  );
};

export default Blogs;

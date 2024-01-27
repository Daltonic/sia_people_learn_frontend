"use client";

import BlogCard from "@/components/blogs/BlogCard";
import { _useContext } from "@/context/Context";
import { IPost, IPosts } from "@/utils/type.dt";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Tabs from "./Tabs";

const Blogs: React.FC = () => {
  const router = useRouter();
  const { user } = _useContext();
  if (!user) {
    router.push("/login");
  }
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [numOfPages, setNumberOfPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
        <p className="text-[#4F547B] text-lg">
          Access your blogs, create new blogs, and view all blogs
        </p>
      </div>
      <Tabs />
    </div>
  );
};

export default Blogs;

"use client";
import React, { useState, useEffect } from "react";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import { _useContext } from "@/context/Context";
import { IPost, IPosts } from "@/utils/type.dt";
import BlogCard from "@/components/blogs/BlogCard";

const Tabs: React.FC = () => {
  const { user, setUser } = _useContext();

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
    if (!user) {
      setUser(sessionUser);
    }
  }, [setUser, user]);

  const [activeTab, setActiveTab] = useState<number>(1);
  const [publishedPosts, setPublishedPosts] = useState<IPost[]>([]);
  const [unpublishedPosts, setUnpublishedPosts] = useState<IPost[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [pagePagesCount, setPagesCount] = useState<number>(0);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    if (!user) return;
    const fetchPublishedBlogs = async () => {
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts/user/posts?published=true`,
          requestDetails
        );
        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const { posts, isNext, numofPages } =
            (await response.json()) as IPosts;
          setPublishedPosts(posts);
          setPagesCount(numofPages);
          setHasNext(isNext);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchPublishedBlogs();
  }, [user]);

  useEffect(() => {
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
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts/user/posts?published=false`,
          requestDetails
        );
        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const { posts, isNext, numofPages } =
            (await response.json()) as IPosts;
          setUnpublishedPosts(posts);
          setPagesCount(numofPages);
          setHasNext(isNext);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="">
        <SearchAndFilterBar />
        <div className="flex space-x-5 border-b">
          <button
            onClick={() => handleTabClick(1)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 1
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Published Blogs
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 2
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Unpublished Blogs
          </button>
        </div>

        <div className="py-4 text-[#4F547B]">
          {activeTab === 1 && (
            <div className="flex p-5 gap-8 border w-full flex-wrap">
              {publishedPosts.map((post, index) => (
                <BlogCard blog={post} key={post._id} i={index} />
              ))}
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex p-5 gap-8 border w-full flex-wrap">
              {unpublishedPosts.map((post, index) => (
                <BlogCard blog={post} key={post._id} i={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

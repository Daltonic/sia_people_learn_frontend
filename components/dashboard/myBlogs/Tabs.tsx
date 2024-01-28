"use client";
import React, { useState, useEffect } from "react";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import { _useContext } from "@/context/Context";
import { IPost, IPosts } from "@/utils/type.dt";
import { useRouter } from "next/navigation";
import academies from "@/pages/academies";
import courses from "@/pages/courses";
import Academy from "../products/Academy";
import Books from "../products/Books";
import Courses from "../products/Courses";
import BlogCard from "@/components/blogs/BlogCard";

const Tabs: React.FC = () => {
  const { user } = _useContext();
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }
  const [activeTab, setActiveTab] = useState<number>(1);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [myPosts, setMyPosts] = useState<IPost[]>([]);
  const [tabData, setTabData] = useState<IPost[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [pagePagesCount, setPagesCount] = useState<number>(0);
  const [type, setType] = useState<"MyPosts" | "AllPosts">("MyPosts");

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
    if (tabNumber === 1) {
      setTabData(myPosts);
      setType("MyPosts");
    }
    if (tabNumber === 2) {
      setTabData(allPosts);
      setType("AllPosts");
    }
  };

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
          const { posts, isNext, numofPages } =
            (await response.json()) as IPosts;
          setMyPosts(posts);
          setPagesCount(numofPages);
          setHasNext(isNext);
          setTabData(posts);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchBlogs();
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
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts?parentsOnly=true`,
          requestDetails
        );
        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const { posts, isNext, numofPages } =
            (await response.json()) as IPosts;
          setAllPosts(posts);
          setPagesCount(numofPages);
          setHasNext(isNext);
          setTabData(posts);
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
            My Blogs
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
            All Blogs
          </button>
        </div>

        <div className="py-4 text-[#4F547B]">
          {activeTab === 1 && (
            <div className="flex p-5 gap-8 border w-full flex-wrap">
              {myPosts.map((post, index) => (
                <BlogCard blog={post} key={post._id} i={index} />
              ))}
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex p-5 gap-8 border w-full flex-wrap">
              {allPosts.map((post, index) => (
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

"use client";

import BlogCard from "@/components/blogs/BlogCard";
import Button from "@/components/reusableComponents/Button";
import { _useContext } from "@/context/Context";
import { IPost, IPosts } from "@/utils/type.dt";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

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
      <div className="mb-10 md:mb-16 px-5 sm:px-0">
        <div className="w-full flex items-start justify-between">
          <div>
            <h1 className="font-bold text-[#321463] text-3xl">Blogs</h1>
            <p className="text-[#4F547B] text-lg">
              Manage your blog entries efficiently on this page. Create, edit,
              and publish with ease.
            </p>
          </div>
          <div className="">
            <Link
              href="/blogs"
              className="font-medium text-sm text-center pr-4 flex items-center rounded-md bg-[#6440FB12] text-[#1A064F]  hover:text-[#C5165D] border-2 border-transparent hover:border-[#C5165D] hover:bg-transparent w-fit"
            >
              <Button className=""> All Blogs </Button>
              <GoArrowUpRight className="md:-ml-4 text-lg font-bold" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full flex-wrap">
        {posts &&
          posts.map((post, index) => (
            <BlogCard key={post._id} blog={post} i={index} />
          ))}
      </div>
      <Link
        href="/blogs/create"
        className="rounded-lg bg-[#C5165D] text-white px-4 py-2 font-medium text-sm "
      >
        Create New Blog
      </Link>
    </div>
  );
};

export default Blogs;

import BlogCard from "@/components/blogs/BlogCard";
import { _useContext } from "@/context/Context";
import { IPost, IPosts } from "@/utils/type.dt";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Blogs: React.FC = () => {
  const { user, setUser } = _useContext();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [numOfPages, setNumberOfPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
    if (!user) {
      setUser(sessionUser);
    }
  }, [setUser, user]);

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

      const query = new URLSearchParams({
        parentsOnly: "true",
        searchQuery: searchQuery,
      });

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts?${query}`,
          requestDetails
        );
        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const result = (await response.json()) as IPosts;
          setPosts(result.posts);
          setNumberOfPages(result.numofPages);
          setHasNext(result.isNext);
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
        <p className="text-[#4F547B] text-lg">View and Manage all Blogs</p>
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

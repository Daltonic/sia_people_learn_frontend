"use client";
import React, { useState, useEffect, useRef } from "react";
import { FetchPostsParams, IPosts, RootState } from "@/utils/type.dt";
import BlogCard from "@/components/blogs/BlogCard";
import EmptyComponent from "@/components/reusableComponents/EmptyComponent";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import { CiSearch } from "react-icons/ci";
import LocalFilters from "@/components/reusableComponents/LocalFilter";
import LocalPagination from "@/components/reusableComponents/LocalPagination";
import { fetchUserPosts } from "@/services/backend.services";
import { categories } from "@/data/blogs";

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

const postCategories = categories.map((category) => ({
  name: category,
  value: category,
}));

interface Props {
  publishedPostsData: IPosts;
  unpublishedPostsData: IPosts;
}

const Tabs: React.FC<Props> = ({
  publishedPostsData,
  unpublishedPostsData,
}) => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

  const firstRender = useRef(true);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [publishedPosts, setPublishedPosts] =
    useState<IPosts>(publishedPostsData);
  const [unpublishedPosts, setUnpublishedPosts] =
    useState<IPosts>(unpublishedPostsData);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState(publishedPosts.numOfPages);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("newest");
  const [category, setCategory] = useState<string>("All Categories");
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>(
    "Search Published Posts Here..."
  );

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
    if (tabNumber === 1) {
      setSearchPlaceholder("Search Published Posts Here...");
      setPageNumbers(publishedPosts.numOfPages);
      setCurrentPage(1);
    } else {
      setSearchPlaceholder("Search Unpublished Posts Here...");
      setPageNumbers(unpublishedPosts.numOfPages);
      setCurrentPage(1);
    }
  };

  const updateSearch = async () => {
    const token = sessionStorage.getItem("accessToken") as string;
    const published = activeTab === 1 ? "true" : "false";

    try {
      const result = await fetchUserPosts(
        {
          searchQuery: search !== "" ? search : null,
          filter: sort as FetchPostsParams["filter"],
          published,
          page: Number(currentPage) || 1,
          category: category !== "All Categories" ? category : null,
        },
        token
      );

      if (activeTab === 1) {
        setPublishedPosts(result);
      } else {
        setUnpublishedPosts(result);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      console.log("Initial");
      return;
    }

    if (search) {
      const delaydebounceFn = setTimeout(() => {
        updateSearch();
      }, 300);

      return () => clearTimeout(delaydebounceFn);
    } else {
      updateSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, currentPage, sort, category]);

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex gap-5 items-center border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2 w-full mb-5 md:mb-0 md:w-96">
            <CiSearch className="text-[#4F547B] text-xl" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <LocalFilters
              label="Filter by Difficulty"
              options={postCategories}
              currFilter={category}
              setCurrFilter={setCategory}
            />
          </div>
          <div className="max-w-[400px]">
            <LocalFilters
              label="Order By"
              options={sortOptions}
              currFilter={sort}
              setCurrFilter={setSort}
            />
          </div>
        </div>
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
              {publishedPosts.posts.length > 0 ? (
                publishedPosts.posts.map((post, index) => (
                  <BlogCard blog={post} key={post._id} i={index} option />
                ))
              ) : (
                <>
                  <EmptyComponent
                    title="No Blogs Available"
                    buttonText="Create One Now"
                  />
                </>
              )}
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex p-5 gap-8 border w-full flex-wrap">
              {unpublishedPosts.posts.length > 0 ? (
                unpublishedPosts.posts.map((post, index) => (
                  <BlogCard blog={post} key={post._id} i={index} option />
                ))
              ) : (
                <>
                  <EmptyComponent
                    title="No Blogs Available"
                    buttonText="Create One Now"
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {pageNumbers > 1 && (
        <LocalPagination
          totalPages={pageNumbers}
          activePage={currentPage}
          setActivePage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Tabs;

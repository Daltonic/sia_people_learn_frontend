"use client";
import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { blogs, categories } from "@/data/blogs";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FetchPostsParams, IPosts } from "@/utils/type.dt";
import { convertStringToDate } from "@/utils";
import console from "console";
import Pagination from "@/components/reusableComponents/Pagination";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import CategoryFilters from "@/components/reusableComponents/CategoryFilter";
import { fetchPosts } from "@/services/backend.services";

type Blog = {
  id: number;
  imageSrc: string;
  category: string;
  title: string;
  date: string;
  desc: string;
};

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

const Page: NextPage<{ postsData: IPosts }> = ({ postsData }) => {
  const [pageItems, setPageItems] = useState<Blog[]>([]);
  const [currentCategory, setCurrentCategory] = useState("All Categories");
  useEffect(() => {
    if (currentCategory == "All Categories") {
      setPageItems(blogs);
    } else {
      let filtered = blogs.filter((elm) => elm.category == currentCategory);
      setPageItems(filtered);
    }
  }, [currentCategory]);

  return (
    <Layout>
      <div className="flex flex-col items-center px-5 mt-10">
        <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
          Latest News
        </h1>
        <p className="text-slate-600 text-center text-md mt-3 capitalize w-full">
          Stay tuned for the latest updates on Blockchain and Web3 Development.
        </p>
      </div>

      <section className="mt-5">
        <div className="px-5 sm:px-10 md:px-20 font-medium">
          <CategoryFilters />

          <SearchAndFilterBar
            searchPlaceholder="Search Blog Posts Here..."
            route="/blogs"
            sortLabel="Order By:"
            sortOptions={sortOptions}
          />

          <div className="relative pt-10">
            <div className="top-0 is-active">
              <div className="flex justify-between gap-6 flex-wrap w-full">
                {postsData &&
                  postsData.posts.map((post, i: number) => (
                    <div key={i} className="w-full sm:w-80 md:w-56 mb-4 ">
                      <div className="w-full">
                        <Link
                          className="linkCustom"
<<<<<<< HEAD
                          href={`/blogs/${post.title}`}
=======
                          href={`/blogs/${post.slug}`}
>>>>>>> 1a92bc3baae2064580427604a0bed0fee7f7b8c2
                        >
                          <div className="">
                            <Image
                              width={530}
                              height={450}
                              className="rounded-md"
                              src={post.imageUrl || "/images/blog-list/3.svg"}
                              alt="image"
                            />
                          </div>
                          <div className="mt-3">
                            <h1 className="text-[#C5165D] text-sm uppercase">
                              {post.category}
                            </h1>
                            <h4 className="text-[#242239] text-base font-medium md:mt-1">
                              {post.title}
                            </h4>
                            <div className="text-xs text-[#4F547B] mt-2 md:mt-3">
                              {convertStringToDate(post.createdAt)}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>

              <Pagination totalPages={postsData.numOfPages} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const searchQuery = context.query.q || "";
  const page = context.query.page;
  const filter = context.query.filter || "newest";
  const category = context.query.category;

  try {
    const posts = await fetchPosts({
      searchQuery: searchQuery as string,
      page: Number(page),
      filter: filter as FetchPostsParams["filter"],
      category: category as string,
      parentsOnly: "true",
    });

    return {
      props: {
        postsData: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        postsData: {},
      },
    };
  }
};

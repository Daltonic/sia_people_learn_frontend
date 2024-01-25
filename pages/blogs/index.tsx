"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import { blogs, categories } from "@/data/blogs";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IPosts } from "@/utils/type.dt";
import { convertStringToDate } from "@/utils";
import console from "console";

type Blog = {
  id: number;
  imageSrc: string;
  category: string;
  title: string;
  date: string;
  desc: string;
};

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
      <div className="flex flex-col items-center md:px-5 mt-10">
        <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
          Latest News
        </h1>
        <p className="text-slate-600 text-center text-md mt-3 capitalize w-full">
          Stay tuned for the latest updates on Blockchain and Web3 Development.
        </p>
      </div>

      <section className="mt-14">
        <div className="px-5 sm:px-10 md:px-20">
          <div className="font-medium">
            <div className="flex md:justify-center flex-wrap md:gap-3">
              {categories.map((elm, i: number) => (
                <div key={i} onClick={() => setCurrentCategory(elm)}>
                  <button
                    className={`rounded-md p-3 md:p-4 text-[#4F547B] ${
                      currentCategory == elm
                        ? "bg-[#6440FB12] is-active text-[#C5165D]"
                        : ""
                    }`}
                    data-tab-target=".-tab-item-1"
                    type="button"
                  >
                    {elm}
                  </button>
                </div>
              ))}
            </div>

            <div className="relative pt-10">
              <div className="top-0 is-active">
                <div className="flex justify-between gap-6 flex-wrap w-full">
                  {postsData &&
                    postsData.posts.map((post, i: number) => (
                      <div
                        key={i}
                        className="w-full sm:w-[48%] md:w-[31%] mb-4 "
                      >
                        <div className="w-full">
                          <Link
                            className="linkCustom"
                            href={`/blogs/${post._id}`}
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
                              <h4 className="text-[#242239] text-lg font-medium md:mt-1">
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

                <div className="flex justify-between pt-10">
                  <div className="">
                    <div className="flex items-center">
                      <button className="pagination__button -prev">
                        <i className="icon icon-chevron-left"></i>
                      </button>

                      <div className="pagination__count">
                        <a href="#">1</a>
                        <a className="-count-is-active" href="#">
                          2
                        </a>
                        <a href="#">3</a>
                        <span>...</span>
                        <a href="#">67</a>
                      </div>

                      <button className="pagination__button -next">
                        <i className="icon icon-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async () => {
  const requestDetails = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts?parentsOnly=true`,
      requestDetails
    );

    const posts = await response.json();

    return {
      props: {
        postsData: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};

import React from 'react'
import { blogs } from '@/data/blog'
import Image from 'next/image'
import Link from 'next/link'
import Button from "@/components/ReusableComponents/Button";
import { GoArrowUpRight } from "react-icons/go";

const BlogList: React.FC = () => {
  return (
    <section className="my-16 flex flex-col items-center justify-center px-36">
        <div className="flex justify-between items-center w-full">
            <div className="sectionTitle ">
              <h2  className="text-[#321463] font-bold text-2xl">Blog</h2>

              <p className="text-[#4F547B] text-sm">
              Browse through our recent blog posts
              </p>
            </div>

          <div className="">
            <Link
              href="/blog-list-1"
              className="font-medium text-sm text-center px-3 flex items-center rounded-md bg-[#6440FB12] text-[#1A064F]  hover:text-[#C5165D] border-2 border-transparent hover:border-[#C5165D] hover:bg-transparent "
            >
              <Button className=""> All Courses </Button>
              <GoArrowUpRight className="-ml-4 text-lg font-bold" />
              <i className="icon-arrow-top-right text-13 ml-10"></i>
            </Link>
          </div>
        </div>

        <div className="flex gap-4 mt-14">
          {blogs.slice(0, 4).map((elm, i) => (
            <div
              key={i}
              className=""
              data-aos="fade-left"
              data-aos-duration={(i + 1) * 500}
            >
              <div
                className=""
                data-aos="fade-left"
                data-aos-duration={(i + 1) * 400}
              >
                <div className="rounded-md overflow-hidden h-[10rem]">
                  <Image
                    width={550}
                    height={465}
                    src={elm.imageSrc}
                    alt="image"
                  />
                </div>
                <div className="mt-3 pr-2">
                  <h4 className="text-[#321463] font-bold text-sm">
                    <Link className="linkCustom" href={`/blogs/${elm.id}`}>
                      {elm.title}{' '}
                    </Link>
                  </h4>
                  <p className="mt-1 text-[#4F547B] text-xs">{elm.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default BlogList

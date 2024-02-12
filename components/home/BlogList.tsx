import React, { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "../blogs/BlogCard";
import { IPosts } from "@/utils/type.dt";
import { Autoplay } from "swiper";
import AllButton from "../reusableComponents/AllButton";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  postsObj: IPosts;
}

const BlogList: React.FC<Props> = ({ postsObj }) => {
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <section className="my-16 flex flex-col items-center justify-center px-5 sm:px-10 lg:px-36">
      <div className="w-full md:w-5/6">
        <div className="sm:flex justify-between items-center w-full">
          <div className=" ">
            <h2 className="text-[#321463] font-bold text-3xl md:text-3xl">
              Blog
            </h2>
            <p className="text-[#4F547B] text-sm">
              Browse through our recent blog posts
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/blogs"
            >
              <AllButton> All Blogs</AllButton>
            </Link>
          </div>
        </div>

        <div
          className="overflow-hidden mt-12"
          data-aos="fade-left"
          data-aos-offset="80"
          data-aos-duration={800}
        >
          <div className="p-0">
            {showSlider && (
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  450: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                  1536: {
                    slidesPerView: 5,
                  },
                }}
              >

                {postsObj.posts &&
                  postsObj.posts.map((blog, i: number) => (
                    <SwiperSlide >
                      <BlogCard i={i} blog={blog} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogList;

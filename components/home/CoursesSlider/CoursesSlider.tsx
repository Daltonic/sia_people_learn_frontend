"use client";

import React, { useEffect, useState } from "react";

import CourseCard from "../../courses/CourseCard";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ICourses } from "@/utils/type.dt";
import AllButton from "@/components/reusableComponents/AllButton";

const CoursesSlider: React.FC<{ coursesObj: ICourses }> = ({ coursesObj }) => {
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <section className="relative z-10 md:mx-10 lg:mx-20">
      <div className="px-5 sm:px-10 md:px-28 py-12 md:py-10 bg-[#F9F9F9] relative md:rounded-2xl">
        <div className="flex flex-col sm:flex-row gap-4 md:gap-0 justify-between md:items-center">
          <div>
            <h2 className="text-[#321463] font-bold text-2xl">
              Trending courses
            </h2>

            <p className="text-[#4F547B] text-xs">
              Choose from our popular collections
            </p>
          </div>

          <div className="">
            <Link
              href="/courses"
            >
              <AllButton> All Courses</AllButton>
            </Link>
          </div>

        </div>

        <div className="mt-14">
          <div
            className="overflow-hidden"
            data-aos="fade-left"
            data-aos-offset="80"
            data-aos-duration={800}
          >
            <div className="p-0">
              {showSlider && (
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation={{
                    nextEl: ".icon-arrow-right",
                    prevEl: ".icon-arrow-left",
                  }}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 3000,
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
                  {coursesObj.courses &&
                    coursesObj.courses.map((elm, i: number) => (
                      <SwiperSlide key={i}>
                        <CourseCard data={elm} index={i} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              )}
            </div>
          </div>

          <div className="hidden md:flex">
            {/* Left button */}
            <button className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-[#1A064F] hover:bg-[#C5165D] text-white w-10 h-10 p-2 flex justify-center items-center rounded-full z-10">
              <FaArrowLeft className="icon-arrow-left " />
            </button>

            {/* Right button */}
            <button className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-[#1A064F] hover:bg-[#C5165D] text-white w-10 h-10 p-2 flex justify-center items-center rounded-full z-10">
              <FaArrowRight className="icon-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSlider;

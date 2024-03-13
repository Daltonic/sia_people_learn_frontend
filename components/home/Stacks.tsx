"use client";

import { useState, useEffect } from "react";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import { skillsOne } from "@/data/skills";
import Image from "next/image";

const Stacks: React.FC = () => {
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    <section className=" bg-[#F9F9F9] py-10 md:py-16 px-5 md:px-32 md:mx-10 md:rounded-2xl">
      <div className="">
        <div className="flex flex-col justify-center text-center mb-10">
          <h2 className="text-[#321463] font-bold text-3xl md:text-2xl">
            What will you learn
          </h2>
          <p className="text-[#4F547B] text-sm">
            Learn from our in-demand blockchain stacks
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="">
            {showSlider && (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: ".pagination-skils",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".arrow-right-one",
                  prevEl: ".arrow-left-one",
                }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  450: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                  1536: {
                    slidesPerView: 5,
                  },
                }}
                loop={true}
              >
                {skillsOne.map((elm, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="bg-white overflow-visible p-4 rounded-md py-5 h-40 sm:h-32 mx-auto sm:mx-0 w-60 sm:w-36 border border-[#EDEDED] shadow-md shadow-[#EDEDED] flex items-center justify-center">
                      <div
                        className="flex flex-col items-center"
                        data-aos="fade-left"
                        data-aos-duration={(i + 1) * 300}
                      >
                        <div className="h-10 mb-4">
                          <Image
                            width={50}
                            height={30}
                            src={elm.imageSrc}
                            alt="image"
                            className=" h-full w-full"
                          />
                        </div>
                        <h5 className="text-[#4F547B] font-medium">
                          {elm.skill}
                        </h5>
                      </div>
                    </div>
                  </SwiperSlide>
                  // 140,90
                ))}
              </Swiper>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <div>
              <div className="pagination-skils -arrows js-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stacks;

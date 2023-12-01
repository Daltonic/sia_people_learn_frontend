"use client";

import { useState, useEffect } from "react";

import { Navigation, Pagination } from "swiper";
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
    <section className=" bg-[#F9F9F9] py-16 px-32 mx-10 rounded-2xl">
      <div className="">
        <div className="flex flex-col justify-center text-center mb-10">
            <h2 className="text-[#321463] font-bold text-2xl">What will you learn</h2>
            <p className="text-[#4F547B] text-sm">
              Learn from our in-demand blockchain stacks
            </p>
        </div>

        <div className="overflow-hidden">
          <div className="">
            {showSlider && (
              <Swiper
                // {...setting}

                modules={[Navigation, Pagination]}
                pagination={{
                  el: ".pagination-skils",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".arrow-right-one",
                  prevEl: ".arrow-left-one",
                }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  // when window width is >= 576px
                  450: {
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 4,
                  },
                  1200: {
                    // when window width is >= 992px
                    slidesPerView: 6,
                  },
                }}
                loop={true}
              >
                {skillsOne.map((elm, i) => (
                  <SwiperSlide key={i}>
                    <div className="bg-white overflow-visible flex flex-col items-center p-4 rounded-md py-5 "
                    >
                      <div
                        className="flex flex-col items-center"
                        data-aos="fade-left"
                        data-aos-duration={(i + 1) * 300}
                      >
                        <div className="h-10 mb-6">
                          <Image
                             width={50}
                             height={30}
                            src={elm.imageSrc}
                            alt="image"
                            className=""
                          />
                        </div>
                        <h5 className="text-[#321463] text-md font-medium">{elm.skill}</h5>
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

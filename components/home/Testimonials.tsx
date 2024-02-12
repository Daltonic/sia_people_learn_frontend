"use client";
import React, { MutableRefObject } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonialsTwo } from "@/data/tesimonials";
import { paginationImages } from "@/data/tesimonials";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper as SwiperProp } from "swiper/types";

const Testimonials: React.FC<{ backgroundComponent?: boolean }> = ({
}) => {
  const swiperRef = useRef<SwiperProp>(null) as MutableRefObject<SwiperProp>;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // Set the initial slide to index 0
    }
  }, []);

  const handlePaginationClick = (index: number) => {
    setCurrentSlideIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleSlideChange = (swiper: SwiperProp) => {
    setCurrentSlideIndex(swiper.activeIndex);

    if (swiper.activeIndex >= 5) {
      setCurrentSlideIndex(swiper.activeIndex - 5);
    }
  };

  return (
    <section className="flex justify-center relative z-10 mx-10 py-16">

      <div className="w-[99%] md:w-1/2 ">
        <div className="text-center ">
          <h2 className="text-[#321463] font-bold text-2xl">Testimonials</h2>
          <p className="text-[#4F547B] text-sm">See what people are saying about Dapp Mentors.</p>
        </div>

        <div className="mt-5 ">
          <div className="overflow-hidden">
            {showSlider && (
              <Swiper
                className="overflow-visible"
                // {...setting}
                modules={[Navigation, Pagination]}
                loop={true}
                spaceBetween={4}
                speed={1000}
                slidesPerView={1}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper; // Store the Swiper instance in the ref
                }}
                onSlideChange={handleSlideChange}
              >
                {testimonialsTwo.map((elm, i: number) => (
                  <SwiperSlide key={i} className="">
                    <div className="swiper-slide h-100">
                      <div
                        className="testimonials -type-2 text-center"
                        data-aos="fade-up"
                        data-aos-duration={600}
                      >
                        <div className="flex md:justify-center">
                          <Image
                            width={40}
                            height={35}
                            src="/images/home/quotes.svg"
                            alt="quote"
                          />
                        </div>
                        <div className="text-[#321463] font-medium md:px-10">
                          {elm.text}
                        </div>
                        <div className="mt-5">
                          <h5 className="text-[#321463] font-medium text-md md:text-xs">
                            {elm.author}
                          </h5>
                          <p className="text-[#4F547B] text-md md:text-xs">{elm.position}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <div className="flex justify-between flex-wrap gap-5 sm:justify-center mt-5 h-14">
              {paginationImages.map((elm, i: number) => (
                <div
                  key={i}
                  onClick={() => handlePaginationClick(i)}
                  className=" "
                >
                  <div
                    className={`pagination__item ${currentSlideIndex == i ? "is-active" : ""}`}
                  >
                    <Image
                      width={40}
                      height={40}
                      className="rounded-full w-16 h-16 md:w-12 md:h-12 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-[#C5165D] hover:shadow"
                      src={elm}
                      alt="author"
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

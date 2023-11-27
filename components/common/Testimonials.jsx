"use client";
import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonialsTwo } from "../../data/tesimonials";
import { paginationImages } from "../../data/tesimonials";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
export default function Testimonials({ backgroundComponent }) {
  const swiperRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setShowSlider(true);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // Set the initial slide to index 0
    }
  }, []);

  const handlePaginationClick = (index) => {
    setCurrentSlideIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.activeIndex);

    if (swiper.activeIndex >= 5) {
      setCurrentSlideIndex(swiper.activeIndex - 5);
    }
  };

  return (
    <section className="layout-pt-lg layout-pb-lg section-bg">
      <div
        className={`section-bg__item  ${
          backgroundComponent ? "bg-white-two" : "bg-light-6"
        }`}
      ></div>

      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Testimonials</h2>

              <p className="sectionTitle__text ">
                10,000+ unique online course list designs
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-center pt-60">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="overflow-hidden js-testimonials-slider">
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
                  {testimonialsTwo.map((elm, i) => (
                    <SwiperSlide key={i} className="swiper-slide">
                      <div className="swiper-slide h-100">
                        <div
                          className="testimonials -type-2 text-center"
                          data-aos="fade-up"
                          data-aos-duration={600}
                        >
                          <div className="testimonials__icon">
                            <Image
                              width={60}
                              height={43}
                              src="/assets/img/misc/quote.svg"
                              alt="quote"
                            />
                          </div>
                          <div className="testimonials__text md:text-20 fw-500 text-dark-1">
                            {elm.text}
                          </div>
                          <div className="testimonials__author">
                            <h5 className="text-17 lh-15 fw-500">
                              {elm.author}
                            </h5>
                            <div className="mt-5">{elm.position}</div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              <div className="pt-60 lg:pt-40">
                <div className="pagination -avatars row x-gap-40 y-gap-20 justify-center js-testimonials-pagination">
                  {paginationImages.map((elm, i) => (
                    <div
                      key={i}
                      onClick={() => handlePaginationClick(i)}
                      className="col-auto "
                    >
                      <div
                        className={`pagination__item ${
                          currentSlideIndex == i ? "is-active" : ""
                        }`}
                      >
                        <Image width={70} height={70} src={elm} alt="image" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

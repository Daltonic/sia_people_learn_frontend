"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
// import 'swiper/swiper.min.css';
import { testimonials } from "../../data/tesimonials";
import { counters } from "../../data/count";
// SwiperCore.use([Pagination]);

export default function TestimonialsOne() {
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    <section className="layout-pt-lg mt-80 layout-pb-lg bg-purple-1">
      <div className="container ">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title text-green-1">
                What People Say
              </h2>

              <p className="sectionTitle__text text-white">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>
          </div>
        </div>

        <div className="js-section-slider pt-50">
          {showSlider && (
            <Swiper
              className="overflow-visible"
              // {...setting}
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: ".icon-arrow-right",
                prevEl: ".icon-arrow-left",
              }}
              loop={true}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                // when window width is >= 576px
                450: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  // when window width is >= 992px
                  slidesPerView: 3,
                },
              }}
            >
              {testimonials.map((elm, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <div
                    className="testimonials -type-1"
                    data-aos="fade-left"
                    data-aos-duration={(i + 1) * 550}
                  >
                    <div className="testimonials__content">
                      <h4 className="testimonials__title">{elm.comment}</h4>
                      <p className="testimonials__text">
                        {`“${elm.description}”`}
                      </p>

                      <div className="testimonials-footer">
                        <div className="testimonials-footer__image">
                          <Image
                            width={60}
                            height={60}
                            src={elm.imageSrc}
                            alt="image"
                          />
                        </div>

                        <div className="testimonials-footer__content">
                          <div className="testimonials-footer__title">
                            {elm.name}
                          </div>
                          <div className="testimonials-footer__text">
                            {elm.position}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="d-flex x-gap-20 items-center justify-end pt-60 lg:pt-40">
            <div className="col-auto">
              <button className="button -outline-white text-white size-50 rounded-full d-flex justify-center items-center js-prev">
                <i className="icon icon-arrow-left text-24"></i>
              </button>
            </div>
            <div className="col-auto">
              <button className="button -outline-white text-white size-50 rounded-full d-flex justify-center items-center js-next">
                <i className="icon icon-arrow-right text-24"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="row y-gap-30  counter__row">
          {counters.map((elm, i) => (
            <div
              key={i}
              className="col-lg-3 col-sm-6"
              data-aos="fade-left"
              data-aos-duration={(i + 1) * 350}
            >
              <div className="counter -type-1">
                <div className="counter__number">{elm.number}</div>
                <div className="counter__title">{elm.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

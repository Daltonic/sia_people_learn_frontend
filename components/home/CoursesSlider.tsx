'use client'

import React, { useEffect, useState } from 'react'

import CourceCardSlider from './CourseCardSlider'
import { coursesData } from '@/data/courses'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'

const CoursesSlider: React.FC = () => {
  const [showSlider, setShowSlider] = useState(false)
  useEffect(() => {
    setShowSlider(true)
  }, [])
  return (
    <section className="layout-pt-lg layout-pb-lg section-bg">
      <div className="section-bg__item bg-light-6"></div>

      <div className="container">
        <div className="row y-gap-15 justify-between items-center">
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Top courses</h2>

              <p className="sectionTitle__text ">
                10,000+ unique online course list designs
              </p>
            </div>
          </div>

          <div className="col-lg-auto">
            <div className="d-inline-block">
              <Link
                href="/courses-list-1"
                className="button -icon -light-11 -purple-3 text-purple-1 "
              >
                All Courses
                <i className="icon-arrow-top-right text-13 ml-10"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden pt-60 lg:pt-50 js-section-slider"
            data-aos="fade-left"
            data-aos-offset="80"
            data-aos-duration={800}
          >
            <div className="swiper-wrapper">
              {showSlider && (
                <Swiper
                  // {...setting}
                  modules={[Navigation, Pagination]}
                  navigation={{
                    nextEl: '.icon-arrow-right',
                    prevEl: '.icon-arrow-left',
                  }}
                  // loop={true}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={true}
                  breakpoints={{
                    // when window width is >= 576px
                    450: {
                      slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    768: {
                      slidesPerView: 3,
                    },
                    1200: {
                      // when window width is >= 992px
                      slidesPerView: 4,
                    },
                  }}
                >
                  {coursesData.slice(0, 12).map((elm, i) => (
                    <SwiperSlide key={i}>
                      <CourceCardSlider data={elm} index={i} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>

          <button className="section-slider-nav -prev -dark-bg-dark-2 -outline-dark-1 -absolute-out size-50 rounded-full xl:d-none js-courses-prev">
            <i className="icon icon-arrow-left text-24"></i>
          </button>

          <button className="section-slider-nav -next -dark-bg-dark-2 -outline-dark-1 -absolute-out size-50 rounded-full xl:d-none js-courses-next">
            <i className="icon icon-arrow-right text-24"></i>
          </button>
        </div>
      </div>
    </section>
  )
}

export default CoursesSlider

'use client'

import Link from 'next/link'
import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="masthead -type-2">
      <div className="masthead__bg">
        <div
          style={{ backgroundImage: 'url(/assets/images/heroImage.svg)' }}
          className="bg-image js-lazy"
          data-bg="/assets/images/heroImage.svg"
        ></div>
      </div>

      <div className="container">
        <div className="flex ml-64 items-center">
          <div className="col-xl-6 col-lg-11">
            <div className="masthead__content">
              <div className="masthead__subtitle fw-500 text-white text-lg ">
              Innovate with Web3.
              </div>
              <h1 className="masthead__title text-white mt-10">
              Start Your Blockchain Learning Odyssey Free & Premium.
              </h1>
              <div className="flex gap-4  mt-20">
              <div className="masthead__button ">
                <Link
                  href="/courses-list-1"
                  className="button -md bg-[#C5165D] text-white hover:border-[#C5165D] hover:border-2 hover:text-[#C5165D] hover:bg-transparent"
                >
                  Explore Courses
                </Link>
              </div>
              
              <div className="masthead__button">
                <Link
                  href="/courses-list-1"
                  className="button -md text-white border-white border-2 hover:text-black hover:bg-white "
                >
                  Hire Us
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

'use client'

import Link from 'next/link'
import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="masthead -type-2">
      <div className="masthead__bg">
        <div
          style={{ backgroundImage: 'url(/assets/img/home-3/masthead/bg.png)' }}
          className="bg-image js-lazy"
          data-bg="/assets/img/home-3/masthead/bg.png"
        ></div>
      </div>

      <div className="container">
        <div className="row y-gap-50 justify-center items-center">
          <div className="col-xl-6 col-lg-11">
            <div className="masthead__content">
              <div className="masthead__subtitle fw-500 text-green-1 text-17 lh-15">
                Start learning for free
              </div>
              <h1 className="masthead__title text-white mt-10">
                Explore your creativity with thousands of online classes.
              </h1>
              <div className="masthead__button mt-20">
                <Link
                  href="/courses-list-1"
                  className="button -md -white text-dark-1"
                >
                  Find Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

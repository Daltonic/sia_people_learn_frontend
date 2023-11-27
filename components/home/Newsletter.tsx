'use client'

import React, { FormEvent } from 'react'
import Image from 'next/image'

const Newsletter: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <section className="layout-pt-lg layout-pb-lg mb-90 section-bg">
      <div className="section-bg__item">
        <Image
          width={1200}
          height={1200}
          className="img-full rounded-16"
          src="/assets/img/home-3/cta/bg.png"
          alt="image"
        />
      </div>

      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-xl-5 col-lg-6 col-md-11">
            <div className="sectionTitle -light">
              <h2 className="sectionTitle__title ">
                Subscribe our Newsletter &
              </h2>

              <p className="sectionTitle__text ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="row mt-30 justify-center">
          <div className="col-lg-6">
            <form
              className="form-single-field -help"
              action="post"
              onSubmit={handleSubmit}
            >
              <input required type="text" placeholder="Your Email..." />
              <button className="button -purple-1 text-white" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

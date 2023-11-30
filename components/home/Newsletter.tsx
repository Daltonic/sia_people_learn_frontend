'use client'

import React, { FormEvent } from 'react'
import Image from 'next/image'

const Newsletter: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <section className="layout-pt-lg layout-pb-lg mb-90 section-bg bg-[#F9F9F9]">

      <div className="container">
        <div className="flex justify-center text-center">
            <div className="w-1/2">
              <h2 className="sectionTitle__title ">
                Subscribe our Newsletter &
              </h2>

              <p className="sectionTitle__text text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
        </div>

        <div className="flex mt-30 justify-center">
          <div className="col-lg-6">
            <form
              className="form-single-field -help"
              action="post"
              onSubmit={handleSubmit}
            >
              <input required type="text" placeholder="Your Email..." />
              <button className="button -md bg-[#C5165D] text-white font-medium" type="submit">
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

'use client'

import React, { FormEvent } from 'react'

const Newsletter: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <section className="bg-[#F9F9F9] md:mx-10 rounded-2xl px-5 py-10 md:p-24 flex justify-center">

      <div >
        <div className="flex justify-center text-center">
            <div className="md:w-2/3">
              <h2 className="text-[#1A064F] font-bold text-2xl">
                Subscribe our Newsletter &
              </h2>

              <p className="text-sm text-[#1A064F] mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
        </div>

        <div className="flex mt-10 justify-center ">
            <form
              className="relative h-14 flex"
              action="post"
              onSubmit={handleSubmit}
            >
              <input required type="text" placeholder="Your Email..." className='w-96 rounded-lg h-full border border-[#EDEDED] px-4'/>
              <button className="absolute right-2 top-1.5 rounded-md bg-[#C5165D] text-white font-medium h-[80%] px-4" type="submit">
                Submit
              </button>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

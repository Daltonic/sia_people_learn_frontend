import Image from 'next/image'
import React from 'react'

const Newsletter = () => {
  return (
    <div className="bg-stone-50 flex flex-col justify-center items-stretch rounded-2xl">
      <div className="flex-col overflow-hidden relative flex min-h-[475px] w-full justify-center items-center px-16 py-12 max-md:max-w-full max-md:px-5">
        <Image
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7b64bef7be643ff14fea50342e2f3b88fc76ba2e6bea6658cbf0ac96af0ba68?"
          alt="Newsletter Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute"
        />
        <div className="relative flex w-[630px] max-w-full flex-col items-stretch mt-24 mb-14 max-md:my-10">
          <div className="text-indigo-950 text-center text-3xl font-bold leading-10 self-center max-w-[532px]">
            Subscribe our Newsletter &
          </div>
          <div className="text-indigo-950 text-center text-base leading-7 self-center max-w-[495px] mt-8 max-md:max-w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="border border-[color:var(--border-1,#EDEDED)] shadow-2xl bg-white flex items-center justify-between gap-5 mt-10 pl-10 pr-2 py-2.5 rounded-lg border-solid max-md:max-w-full max-md:flex-wrap max-md:pl-5">
            <input
              className="text-slate-600 text-sm grow whitespace-nowrap my-auto"
              placeholder="Your Email..."
            />
            <div className="text-white text-base font-medium bg-pink-700 self-stretch grow justify-center items-stretch pl-11 pr-6 py-5 rounded-lg max-md:px-5">
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter

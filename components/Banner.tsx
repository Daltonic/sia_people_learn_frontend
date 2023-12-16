import Image from 'next/image'
import React from 'react'

const Banner: React.FC = () => {
  return (
    <div className="flex-col overflow-hidden relative flex min-h-[690px] justify-center px-16 py-12 items-start max-md:px-5">
      <Image
        alt="banner"
        loading="lazy"
        src="https://cdn.pixabay.com/photo/2015/10/09/20/37/library-979896_1280.jpg"
        className="absolute h-full w-full object-cover object-center inset-0"
        layout="fill"
        quality={100}
      />

      <div className="relative flex w-[548px] max-w-full flex-col ml-64 mt-20 mb-16 items-start max-md:my-10">
        <div className="text-white text-lg font-bold leading-9 capitalize self-stretch max-md:max-w-full">
          Innovate with Web3.
        </div>
        <div className="text-white text-6xl font-bold leading-[66px] capitalize self-stretch mt-16 max-md:max-w-full max-md:text-4xl max-md:leading-10 max-md:mt-10">
          Start Your Blockchain Learning Odyssey Free & Premium
        </div>
        <div className="flex items-stretch justify-between gap-5 mt-12 max-md:mt-10">
          <div className="text-white text-base font-bold leading-7 whitespace-nowrap bg-pink-700 grow justify-center items-stretch px-7 py-5 rounded-lg max-md:px-5">
            Explore Courses
          </div>
          <div className="text-white text-base font-bold leading-7 whitespace-nowrap border-[color:var(--color-5,#FFF)] grow justify-center items-stretch pl-8 pr-10 py-5 rounded-lg border-2 border-solid max-md:px-5">
            Hire Us
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner

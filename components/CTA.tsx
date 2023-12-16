import React from 'react'

const CTA = () => {
  return (
    <div className="bg-black flex flex-col justify-center items-center px-16 py-12 max-md:px-5">
      <div className="flex w-[1284px] max-w-full items-stretch justify-between gap-5 mt-8 mb-6 max-md:flex-wrap">
        <div className="text-pink-700 text-3xl font-bold leading-10 grow shrink basis-auto max-md:max-w-full">
          <span className="text-white">
            Become a part of the global learning community at
            <br />
          </span>
          <span className="text-pink-700">Dapp Mentors Academy</span>
        </div>
        <div className="text-white text-center text-base font-bold leading-7 whitespace-nowrap bg-pink-700 self-center justify-center items-stretch my-auto p-5 rounded-lg">
          Subscribe & Learn
        </div>
      </div>
    </div>
  )
}

export default CTA

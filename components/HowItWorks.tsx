import React from 'react'
import { HiOutlineCreditCard } from 'react-icons/hi2'
import uparrow from '@/public/arrowdown.png'

const HowItWorks: React.FC = () => {
  return (
    <div className="flex items-start justify-between gap-5 px-5 max-md:flex-wrap max-md:justify-center">
      <div className="flex grow basis-[0%] flex-col items-center mt-28 self-end max-md:mt-10">
        <HiOutlineCreditCard size={30} />
        <div className="text-violet-950 text-center text-lg font-medium leading-7 capitalize self-stretch mt-9">
          Browse courses from our expert contributors.
        </div>
      </div>
      <div className="self-stretch flex grow basis-[0%] flex-col">
        <div className="text-violet-950 text-center text-3xl font-bold self-stretch whitespace-nowrap">
          How it works?
        </div>
        <div className="text-slate-600 text-center text-base leading-7 self-center mt-5">
          Follow this simple steps
        </div>
        <HiOutlineCreditCard size={30} />
        <div className="text-violet-950 text-center text-lg font-medium leading-7 capitalize self-center mt-9">
          Purchase quickly <br />
          and securely.
        </div>
      </div>
      <div className="flex grow basis-[0%] flex-col items-center mt-28 self-end max-md:mt-10">
        <HiOutlineCreditCard size={30} />
        <div className="text-violet-950 text-center text-lg font-medium leading-7 capitalize self-stretch mt-9">
          That’s it! Start learning <br />
          right away.
        </div>
      </div>
    </div>
  )
}

export default HowItWorks

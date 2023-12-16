import React from 'react'
import { PiMonitorPlayBold, PiUsersBold } from 'react-icons/pi'
import { FiUnlock } from "react-icons/fi";

const Stats: React.FC = () => {
  return (
    <div
      className="flex items-stretch justify-between gap-5 px-5
    max-md:flex-wrap max-md:justify-center lg:w-2/3 w-full mx-auto"
    >
      <div className="flex items-center justify-between gap-5">
        <PiMonitorPlayBold size={50} />
        <div className="flex grow basis-[0%] flex-col items-stretch">
          <div className="text-violet-950 text-xl font-bold leading-9 capitalize whitespace-nowrap">
            100hrs online courses
          </div>
          <div className="text-indigo-950 text-base leading-7 whitespace-nowrap">
            Explore a variety of fresh topics
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5">
        <PiUsersBold size={50} />
        <div className="flex grow basis-[0%] flex-col items-stretch">
          <div className="text-violet-950 text-xl font-bold leading-9 capitalize whitespace-nowrap">
            Expert instruction
          </div>
          <div className="text-indigo-950 text-base leading-7 whitespace-nowrap">
            Find the right instructor for you
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5">
        <FiUnlock size={50} />
        <div className="flex grow basis-[0%] flex-col items-stretch">
          <div className="text-violet-950 text-xl font-bold leading-9 capitalize whitespace-nowrap">
            Lifetime access
          </div>
          <div className="text-indigo-950 text-base leading-7 whitespace-nowrap">
            Learn at your pace
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats

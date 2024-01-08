import React from 'react'
import { featureTwo } from '@/data/features'
import Image from 'next/image'

const Features: React.FC = () => {
  return (
    <section className="sm:py-10 flex md:justify-center p-6 sm:px-10 md:px-0">
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-evenly flex-1">
          {featureTwo.map((elm, i: number) => (
            <div key={i} className="">
              <div className="flex items-center md:items-start">
                <div className="mr-4">
                  <Image width={40} height={35} src={elm.imgSrc} alt="icon" />
                </div>
                <div className='text-[#321463]'>
                  <h1 className="md:text-sm font-semibold md:mb-0.5">{elm.title}</h1>
                  <p className="text-sm md:text-xs">{elm.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default Features

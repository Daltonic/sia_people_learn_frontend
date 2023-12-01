import React from 'react'
import { featureTwo } from '@/data/features'
import Image from 'next/image'

const Features: React.FC = () => {
  return (
    <section className="py-10 flex justify-center">
        <div className="flex justify-evenly flex-1">
          {featureTwo.map((elm, i) => (
            <div key={i} className="">
              <div className="flex items-start">
                <div className="mr-4">
                  <Image width={40} height={35} src={elm.imgSrc} alt="icon" />
                </div>
                <div className='text-[#321463]'>
                  <h1 className="text-sm font-semibold mb-0.5">{elm.title}</h1>
                  <p className="text-xs">{elm.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default Features

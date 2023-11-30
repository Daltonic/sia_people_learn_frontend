import React from 'react'
import { featureTwo } from '@/data/features'
import Image from 'next/image'

const Features: React.FC = () => {
  return (
    <section className="layout-pt-sm layout-pb-sm border-bottom-light">
      <div className="container">
        <div className="flex justify-evenly">
          {featureTwo.map((elm, i) => (
            <div key={i} className="">
              <div className="flex items-center">
                <div className="mr-10">
                  <Image width={40} height={35} src={elm.imgSrc} alt="icon" />
                </div>

                <div className='text-[#321463]'>
                  <h1 className="text-md text-[#321463]">{elm.title}</h1>
                  <p className="text-sm">{elm.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

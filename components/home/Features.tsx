import React from 'react'
import { featureTwo } from '@/data/features'
import Image from 'next/image'

const Features: React.FC = () => {
  return (
    <section className="layout-pt-sm layout-pb-sm border-bottom-light">
      <div className="container">
        <div className="row y-gap-30 justify-between">
          {featureTwo.map((elm, i) => (
            <div key={i} className="col-xl-3 col-md-6">
              <div className="d-flex items-center">
                <div className="mr-20">
                  <Image width={50} height={50} src={elm.imgSrc} alt="icon" />
                </div>

                <div>
                  <h4 className="text-20 fw-500">{elm.title}</h4>
                  <div className="text-dark-1">{elm.description}</div>
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

import React from 'react'
import Button from '../ReusableComponents/Button'

const CTA: React.FC = () => {
  return (
    <div className="bg-black px-5 md:px-10 py-16 flex md:justify-center">
      <div className="flex justify-between md:w-4/5 items-center">
        <div className="font-medium">
          <h4 className="text-white text-2xl">
            Become a part of the global learning community at
          </h4>
          <p className="text-[#C5165D] text-xl">Dapp Mentors Academy</p>
        </div>
        <Button variant='pink'>  Subscribe & Learn</Button>
      </div>
    </div>
  )
}

export default CTA

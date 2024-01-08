import React from 'react'
import Button from '../reusableComponents/Button'
import Link from 'next/link'

const CTA: React.FC = () => {
  return (
    <div className="bg-black px-5 sm:px-10 py-16 flex md:justify-center">
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between md:w-4/5 md:items-center">
        <div className="font-medium">
          <h4 className="text-white text-2xl">
            Become a part of the global learning community at
          </h4>
          <p className="text-[#C5165D] text-xl">Dapp Mentors Academy</p>
        </div>
        <Link href="/courses">
        <Button variant='pink'>  Subscribe & Learn</Button></Link>
      </div>
    </div>
  )
}

export default CTA

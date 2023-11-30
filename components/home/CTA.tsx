import React from 'react'

const CTA: React.FC = () => {
  return (
    <div className="bg-black px-36 py-60  ">
      <div className="container flex justify-between items-center">
        <div className="font-medium">
          <h4 className="text-white text-2xl">
            Become a part of the global learning community at
          </h4>
          <p className="text-[#C5165D] text-xl">Dapp Mentors Academy</p>
        </div>
        <button className="button -md bg-[#C5165D] text-white hover:border-[#C5165D] hover:border-2 hover:text-[#C5165D] hover:bg-transparent">
          Subscribe & Learn
        </button>
      </div>
    </div>
  )
}

export default CTA

import React from 'react'

const CTA: React.FC = () => {
  return (
    <div className="bg-black py-60">
      <div className="container flex justify-between items-center">
        <div className="font-medium">
          <h4 className="text-white text-2xl">
            Become a part of the global learning community at
          </h4>
          <p className="text-pink-600 text-xl">Dapp Mentors Academy</p>
        </div>
        <button className="bg-pink-600 text-white p-3 rounded-lg">
          Subscribe & Learn
        </button>
      </div>
    </div>
  )
}

export default CTA

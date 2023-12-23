'use client'
import React, { useState } from 'react'

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1)

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber)
  }

  return (
    <div className="flex justify-center">
      <div className="md:w-5/6 px-5 md:px-0">
        <div className="flex space-x-3 border-b">
          <button
            onClick={() => handleTabClick(1)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 1
                ? 'border-[#C5165D] text-[#C5165D]'
                : 'border-transparent hover:border-gray-200'
            }`}
            type="button"
          >
            Become an Instructor
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 2
                ? 'border-[#C5165D] text-[#C5165D]'
                : 'border-transparent hover:border-gray-200'
            }`}
            type="button"
          >
            Instructor Rules
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 3
                ? 'border-[#C5165D] text-[#C5165D]'
                : 'border-transparent hover:border-gray-200'
            }`}
            type="button"
          >
            Start with Courses
          </button>
        </div>

        <div className="py-4 text-[#4F547B]">
          {activeTab === 1 && (
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using Content here, content
              here, making it look like readable English.
              <br />
              <br />
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for lorem
              ipsum will uncover many web sites still in their infancy.
            </p>
          )}
          {activeTab === 2 && (
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using Content here, content
              here, making it look like readable English.
            </p>
          )}
          {activeTab === 3 && (
            <p>
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for lorem
              ipsum will uncover many web sites still in their infancy.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tabs

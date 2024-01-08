'use client'
import React, { useState } from 'react'

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1)

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber)
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-full md:w-4/5 px-5 sm:px-10 md:px-0 h-46">
        <div className="flex space-x-3 sm:space-x-5 border-b">
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
              Join the ranks of skilled professionals teaching the next generation of Web3 and Blockchain experts. As an instructor, you'll be part of a community dedicated to advancing knowledge and fostering innovation in the world of decentralized applications. Share your expertise, contribute to the growth of our platform, and become a mentor to learners around the globe. 
            </p>
          )}
          {activeTab === 2 && (
            <p>
              At Dapp Mentors Academy, we believe in the power of collaboration and open communication. As an instructor, you will adhere to our strict rules designed to ensure a positive learning environment. These rules include maintaining professionalism, providing clear and accurate information, and promoting respectful interactions among students.
            </p>
          )}
          {activeTab === 3 && (
            <p>
              Ready to dive into the world of Web3 and Blockchain? Start your journey with our introductory courses, curated by our team of experienced instructors. Each course is designed to provide comprehensive knowledge, from the basics to advanced topics. Choose a course that fits your learning goals and embark on your path to mastering decentralized technologies.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tabs

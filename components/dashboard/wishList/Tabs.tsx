'use client'

import { IAcademy, ICourse } from '@/utils/type.dt'
import { useState } from 'react'
import EmptyComponent from '@/components/reusableComponents/EmptyComponent'
import ProductCardPortrait from '../myProducts/ProductCardPortrait'

interface Props {
  academiesData: IAcademy[]
  coursesData: ICourse[]
}

const Tabs: React.FC<Props> = ({ academiesData, coursesData }) => {
  const [activeTab, setActiveTab] = useState<number>(1)

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber)
  }

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="flex space-x-5 border-b">
        <button
          onClick={() => handleTabClick(1)}
          className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
            activeTab === 1
              ? 'border-[#C5165D] text-[#C5165D]'
              : 'border-transparent hover:border-gray-200'
          }`}
          type="button"
        >
          Courses
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
          Academies
        </button>
      </div>

      <div className="py-4 text-[#4F547B]">
        {activeTab === 1 && (
          <div className="flex justify-start gap-5 w-full flex-wrap">
            {coursesData && coursesData.length > 0 ? (
              coursesData.map((elm, i) => (
                <ProductCardPortrait
                  key={i}
                  data={elm}
                  type="Course"
                  wishId={elm.wishId}
                />
              ))
            ) : (
              <EmptyComponent
                title="No Bookmarked Course"
                buttonText="Create One Now"
                link="/courses"
              />
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="flex justify-between gap-5 w-full flex-wrap">
            {academiesData && academiesData.length > 0 ? (
              academiesData.map((elm, i) => (
                <ProductCardPortrait
                  key={i}
                  data={elm}
                  type={'Academy'}
                  wishId={elm.wishId}
                />
              ))
            ) : (
              <EmptyComponent
                title="No Bookmarked Academy"
                buttonText="Create One Now"
                link="/academies"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tabs

import LearningJourneyItem from '@/components/aboutus/LearningJourneyItem'
import PageHeading from '@/components/becomeInstructor/PageHeading'
import Tabs from '@/components/becomeInstructor/Tabs'
import Footer from '@/components/layout/footers/Footer'
import Header from '@/components/layout/headers/Header'
import { learningJourney } from '../../data/learningPath'
import React from 'react'
import Instructor from '@/components/becomeInstructor/Instructor'
import BestInstructors from '@/components/becomeInstructor/BestInstructors'

const Page: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-16">
        <PageHeading />
        <Tabs />
        <div className="flex justify-between px-20">
          {learningJourney.map((item, i: number) => (
            <LearningJourneyItem key={i} item={item} />
          ))}
        </div>
        <Instructor />
        <BestInstructors/>
        <Footer />
      </div>
    </div>
  )
}

export default Page

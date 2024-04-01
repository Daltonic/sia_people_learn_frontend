'use client'

import LearningJourneyItem from '@/components/aboutus/LearningJourneyItem'
import PageHeading from '@/components/becomeInstructor/PageHeading'
import Tabs from '@/components/becomeInstructor/Tabs'
import Footer from '@/components/layout/footers/Footer'
import Header from '@/components/layout/headers/Header'
import { learningJourney } from '../../data/learningPath'
import React from 'react'
import Instructor from '@/components/becomeInstructor/Instructor'
import BestInstructors from '@/components/becomeInstructor/BestInstructors'
import Head from 'next/head'

const Page: React.FC = () => {
  return (
    <>
      <Head>
        <title>Become an Instructor | PeopleLearn</title>
        <meta
          name="description"
          content="Join the PeopleLearn community as an instructor. Share your knowledge, create engaging courses, and inspire learners around the world."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://peoplelearn.io/becomeinstructor"
        />
        <meta
          property="og:title"
          content="Become an Instructor | PeopleLearn"
        />
        <meta
          property="og:description"
          content="Join the PeopleLearn community as an instructor. Share your knowledge, create engaging courses, and inspire learners around the world."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta
          name="twitter:title"
          content="Become an Instructor | PeopleLearn"
        />
        <meta
          name="twitter:description"
          content="Join the PeopleLearn community as an instructor. Share your knowledge, create engaging courses, and inspire learners around the world."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
      </Head>

      <Header />
      <div className="flex flex-col gap-16">
        <PageHeading />
        <Tabs />
        <div className="flex flex-col md:flex-row md:justify-between items-center px-5 sm:px-10 md:px-20">
          {learningJourney.map((item, i: number) => (
            <LearningJourneyItem key={i} item={item} />
          ))}
        </div>
        <Instructor />
        <BestInstructors />
        <Footer />
      </div>
    </>
  )
}

export default Page

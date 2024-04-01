import { NextPage } from 'next'
import Head from 'next/head'
import Hero from '@/components/aboutus/Hero'
import LearnNewSkill from '@/components/aboutus/LearnNewSkill'
import LearningJourney from '@/components/aboutus/LearningJourney'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import Layout from '@/components/layout/Layout'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us | PeopleLearn</title>
        <meta
          name="description"
          content="Discover People Learn, an online learning platform where you can access courses, blogs, and interact with instructors."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/about" />
        <meta property="og:title" content="About Us | People Learn" />
        <meta
          property="og:description"
          content="Discover People Learn, an online learning platform where you can access courses, blogs, and interact with instructors."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="About Us | People Learn" />
        <meta
          name="twitter:description"
          content="Discover People Learn, an online learning platform where you can access courses, blogs, and interact with instructors."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
      </Head>
      <Layout>
        <Hero />
        <HowItWorks />
        <LearningJourney />
        <Testimonials />
        <LearnNewSkill />
      </Layout>
    </>
  )
}

export default Page

import Preloader from '@/components/common/Preloader'
import BlogList from '@/components/home/BlogList'
import CTA from '@/components/home/CTA'
import CoursesSlider from '@/components/home/CoursesSlider'
import Features from '@/components/home/Features'
import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/HowItWorks'
import Newsletter from '@/components/home/Newsletter'
import Stacks from '@/components/home/Stacks'
import Testimonials from '@/components/home/Testimonials'
import Footer from '@/components/layout/footers/Footer'
import Header from '@/components/layout/headers/Header'
import { NextPage } from 'next'

export const metadata = {
  title: 'Home | Dapp Mentors',
  description: 'Lorem Ipsu,',
}

const Page: NextPage = () => {
  return (
    <main className="">
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <Hero />
        <Features />
        <CoursesSlider />
        <HowItWorks />
        <CTA />
        <Testimonials />
        <Stacks />
        <BlogList />
        <Newsletter />
        <Footer />
      </div>
    </main>
  )
}

export default Page

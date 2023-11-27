import Preloader from '@/components/common/Preloader'
import CoursesSlider from '@/components/home/CoursesSlider'
import Hero from '@/components/home/Hero'
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

      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <Hero />
        {/* <Features /> */}
        {/* <CategoriesThree /> */}
        <CoursesSlider />
        {/* <StepsOne /> */}
        {/* <Line /> */}
        {/* <Instructors /> */}
        {/* <Testimonials /> */}
        {/* <CoursesTwo /> */}
        {/* <Achievements /> */}
        {/* <SkillsOne /> */}
        {/* <Line /> */}
        {/* <BlogsTwo /> */}
        {/* <JoinTwo /> */}
        {/* <FooterTwo /> */}
      </div>
    </main>
  )
}

export default Page

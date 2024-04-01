import AcademiesSlider from '@/components/home/AcademySlider/AcademiesSlider'
import BlogList from '@/components/home/BlogList'
import CTA from '@/components/home/CTA'
import CoursesSlider from '@/components/home/CoursesSlider/CoursesSlider'
import HowItWorks from '@/components/home/HowItWorks'
import Newsletter from '@/components/home/Newsletter'
import Stacks from '@/components/home/Stacks'
import Testimonials from '@/components/home/Testimonials'
import Features from '@/components/home/hero/Features'
import Hero from '@/components/home/hero/Hero'
import Layout from '@/components/layout/Layout'
import {
  fetchAcademies,
  fetchBooks,
  fetchCourses,
  fetchPosts,
  fetchSiteSettings,
} from '@/services/backend.services'
import { IAcademies, ICourses, IPosts, ISiteSettings } from '@/utils/type.dt'
import { NextPage } from 'next'
import Head from 'next/head'

export const metadata = {
  title: 'Home | People Learn',
}

const Page: NextPage<{
  academiesData: IAcademies
  coursesData: ICourses
  booksData: ICourses
  postsData: IPosts
  settingsData: ISiteSettings
}> = ({ academiesData, coursesData, booksData, postsData, settingsData }) => {
  return (
    <>
      <Head>
        <title>Home | People Learn</title>
        <meta
          name="description"
          content="Discover the best online courses, blogs, and interactive learning experiences at People Learn. Join us and start your journey to knowledge today."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/" />
        <meta property="og:title" content="Home | People Learn" />
        <meta
          property="og:description"
          content="Discover the best online courses, blogs, and interactive learning experiences at People Learn. Join us and start your journey to knowledge today."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Home | People Learn" />
        <meta
          name="twitter:description"
          content="Discover the best online courses, blogs, and interactive learning experiences at People Learn. Join us and start your journey to knowledge today."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <Layout>
        <main className="overflow-x-hidden">
          <Hero settingsData={settingsData} />
          <Features />
          <CoursesSlider coursesObj={coursesData} />
          <HowItWorks />
          <AcademiesSlider academyObj={academiesData} />
          <CTA />
          <Testimonials />
          <Stacks />
          <BlogList postsObj={postsData} />
          <Newsletter />
        </main>
      </Layout>
    </>
  )
}

export default Page

export const getServerSideProps = async () => {
  try {
    const academies = await fetchAcademies({})

    const courses = await fetchCourses({ type: 'Course' })

    const books = await fetchBooks({ type: 'Book' })

    const posts = await fetchPosts({ parentsOnly: 'true' })
    const settings = await fetchSiteSettings()

    return {
      props: {
        academiesData: JSON.parse(JSON.stringify(academies)),
        coursesData: JSON.parse(JSON.stringify(courses)),
        booksData: JSON.parse(JSON.stringify(books)),
        postsData: JSON.parse(JSON.stringify(posts)),
        settingsData: JSON.parse(JSON.stringify(settings)) as ISiteSettings,
      },
    }
  } catch (e: any) {
    console.log(e)
    return {
      props: {
        academiesData: {} as any,
        coursesData: {} as any,
        booksData: {} as any,
        postsData: {} as any,
        settingsData: {} as ISiteSettings,
      },
    }
  }
}

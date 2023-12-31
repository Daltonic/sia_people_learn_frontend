import PageHeader from '@/components/reusableComponents/PageHeader'
import CourseLayer from '@/components/courses/CourseLayer'
import Filterlayer from '@/components/courses/Filterlayer'
import Layout from '@/components/layout/Layout'
import { coursesData } from '@/data/courses'
import { NextPage } from 'next'

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="flex flex-col w-[90%] mt-5 md:mt-10">
          <div className="flex flex-col">
            <PageHeader> Trending courses</PageHeader>
            <div className="text-slate-600 text-sm md:text-lg capitalize w-full mt-1">
              Write an introductory description of the category.
            </div>
          </div>
          <Filterlayer />
          <CourseLayer data={coursesData} />
        </div>
      </div>
    </Layout>
  )
}

export default Page

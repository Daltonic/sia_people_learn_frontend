import Layout from '@/components/layout/Layout'
import { GetServerSidePropsContext, NextPage } from 'next'
import { ICourse, ILesson, RootState } from '@/utils/type.dt'
import { fetchCourse, fetchLesson } from '@/services/backend.services'
import LearnLesson from '@/components/coursedetail/lesson/LearnLesson'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Page: NextPage<{ lessonData: ILesson; courseData: ICourse }> = ({
  lessonData,
  courseData,
}) => {
  // if (!lessonData) return;
  const { userData } = useSelector((states: RootState) => states.userStates)
  const router = useRouter()

  useEffect(() => {
    if (!userData) {
      router.push('/login')
    }
  }, [userData, router])

  return (
    <Layout>
      <div className="md:px-14 md:py-10 p-5 sm:p-10 overflow-x-hidden">
        <LearnLesson lesson={lessonData} course={courseData} />
      </div>
    </Layout>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id, courseId } = context.query
  const token = context.req.cookies.accessToken

  try {
    const lesson = await fetchLesson(id as string, token as string)

    const course = await fetchCourse(courseId as string, token)

    return {
      props: {
        lessonData: JSON.parse(JSON.stringify(lesson)) as ILesson,
        courseData: JSON.parse(JSON.stringify(course)) as ICourse,
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        lessonData: null,
        courseData: {} as ICourse,
      },
    }
  }
}

import LessonFormInstance from '@/components/coursedetail/lesson/LessonFormInstance'
import LessonHeader from '@/components/coursedetail/lesson/LessonHeader'
import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import { fetchCourse } from '@/services/backend.services'
import { ILesson } from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'

const Page: NextPage<{ courseId: string; lessons: ILesson[] }> = ({
  courseId,
  lessons,
}) => {
  return (
    <DashboardLayout>
      <LessonHeader
        headerHead="Create Lesson"
        headerBody="Create lesson for your Course"
      />
      <div className="space-y-6">
        <LessonFormInstance courseId={courseId} type="create" accordionState />

        {lessons.map((lesson: ILesson, i: number) => (
          <LessonFormInstance
            key={i}
            lesson={lesson}
            courseId={courseId}
            type="edit"
          />
        ))}
      </div>
    </DashboardLayout>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { courseId } = context.query
  const token = context.req.cookies.accessToken

  try {
    const course = await fetchCourse(courseId as string, token)
    const courseLessons: ILesson[] = course.lessons

    return {
      props: {
        lessons: JSON.parse(JSON.stringify(courseLessons)) as ILesson,
        courseId,
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        lessons: [],
        courseId,
      },
    }
  }
}

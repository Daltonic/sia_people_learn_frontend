import CourseForm from '@/components/dashboard/createProduct/CourseForm'
import DashboardHeading from '@/components/dashboard/dashboardLayout/DashboardHeading'
import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import { fetchCourse } from '@/services/backend.services'
import { ICourse } from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'

const Page: NextPage<{ courseData: ICourse }> = ({ courseData }) => {
  return (
    <DashboardLayout>
      <DashboardHeading
        title="Edit Product"
        description="Update your products info."
      />
      <CourseForm course={courseData} />
    </DashboardLayout>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query
  const token = context.req.cookies.accessToken

  try {
    const course = await fetchCourse(id as string, token)

    return {
      props: {
        courseData: JSON.parse(JSON.stringify(course)),
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        courseData: {},
      },
    }
  }
}

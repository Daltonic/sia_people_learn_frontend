import CourseForm from '@/components/dashboard/courses/CourseForm'
import DashboardHeading from '@/components/dashboard/dashboardLayout/DashboardHeading'
import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import PendingReviews from '@/components/dashboard/myProducts/PendingReviews'
import { fetchCourse, fetchReviews } from '@/services/backend.services'
import { ICourse, IReviews } from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage<{ courseData: ICourse; reviewsData: IReviews }> = ({
  courseData,
  reviewsData,
}) => {
  return (
    <>
      {courseData && (
        <Head>
          <title>{courseData.name} | Edit Course | PeopleLearn</title>
          <meta
            name="description"
            content={`Edit ${courseData.name}, a course on PeopleLearn. Update course details here.`}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://peoplelearn.io/dashboard/products/courses/edit/${courseData.slug}`}
          />
          <meta
            property="og:title"
            content={`Edit ${courseData.name} | PeopleLearn`}
          />
          <meta
            property="og:description"
            content={`Edit ${courseData.name}, a course on PeopleLearn. Update course details here.`}
          />
          <meta property="og:image" content={courseData.imageUrl ?? ''} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@peoplelearn" />
          <meta
            name="twitter:title"
            content={`Edit ${courseData.name} | PeopleLearn`}
          />
          <meta
            name="twitter:description"
            content={`Edit ${courseData.name}, a course on PeopleLearn. Update course details here.`}
          />
          <meta name="twitter:image" content={courseData.imageUrl ?? ''} />
        </Head>
      )}

      <DashboardLayout>
        <DashboardHeading
          title="Edit Product"
          description="Update your products info."
        />
        <CourseForm course={courseData} type="update" />
        <PendingReviews reviewsData={reviewsData} />
      </DashboardLayout>
    </>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.query
  const token = context.req.cookies.accessToken

  try {
    const course = await fetchCourse(slug as string, token)
    const reviews = await fetchReviews(
      {
        productSlug: slug as string,
        productType: 'Course',
        approved: 'false',
      },
      token
    )
    console.log(reviews)

    return {
      props: {
        courseData: JSON.parse(JSON.stringify(course)) as ICourse,
        reviewsData: JSON.parse(JSON.stringify(reviews)) as IReviews,
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        courseData: {} as ICourse,
        reviewsData: {} as IReviews,
      },
    }
  }
}

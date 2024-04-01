import CourseForm from '@/components/dashboard/courses/CourseForm'
import DashboardHeading from '@/components/dashboard/dashboardLayout/DashboardHeading'
import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import Head from 'next/head'

const CreateCourse: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create Course | People Learn</title>
        <meta
          name="description"
          content="Create and manage your courses on People Learn. Add new courses to your catalogue and share them with your audience."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://peoplelearn.io/dashboard/products/courses/create"
        />
        <meta property="og:title" content="Create Course | People Learn" />
        <meta
          property="og:description"
          content="Create and manage your courses on People Learn. Add new courses to your catalogue and share them with your audience."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Create Course | People Learn" />
        <meta
          name="twitter:description"
          content="Create and manage your courses on People Learn. Add new courses to your catalogue and share them with your audience."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
      </Head>

      <DashboardLayout>
        <DashboardHeading
          title="Create Course"
          description="Add a new Course to your Catalogue"
        />
        <CourseForm type="create" />
      </DashboardLayout>
    </>
  )
}

export default CreateCourse

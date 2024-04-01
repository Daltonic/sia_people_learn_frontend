import AcademyForm from '@/components/academydetail/AcademyForm'
import DashboardHeading from '@/components/dashboard/dashboardLayout/DashboardHeading'
import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import Head from 'next/head'

const CreateCourse: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create an Academy | PeopleLearn</title>
        <meta
          name="description"
          content="Start your journey with PeopleLearn by creating your own academy. Share your expertise, create engaging courses, and inspire learners globally."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://peoplelearn.io/createacademy"
        />
        <meta property="og:title" content="Create an Academy | PeopleLearn" />
        <meta
          property="og:description"
          content="Start your journey with PeopleLearn by creating your own academy. Share your expertise, create engaging courses, and inspire learners globally."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Create an Academy | PeopleLearn" />
        <meta
          name="twitter:description"
          content="Start your journey with PeopleLearn by creating your own academy. Share your expertise, create engaging courses, and inspire learners globally."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
      </Head>

      <DashboardLayout>
        <DashboardHeading
          title="Create Academy"
          description="Add an Academy to your Catalogue."
        />
        <AcademyForm type="create" />
      </DashboardLayout>
    </>
  )
}

export default CreateCourse

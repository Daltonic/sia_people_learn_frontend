import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import MyProducts from '@/components/dashboard/myProducts/MyProducts'
import DeleteModal from '@/components/reusableComponents/DeleteModal'
import {
  fetchAcademies,
  fetchBooks,
  fetchCourses,
} from '@/services/backend.services'
import { IAcademies, ICourses } from '@/utils/type.dt'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

const Products: React.FC<{
  academiesData: IAcademies
  coursesData: ICourses
  booksData: ICourses
}> = ({ academiesData, coursesData, booksData }) => {
  return (
    <>
      <Head>
        <title>Created products | People Learn</title>
        <meta
          name="description"
          content="Explore and manage your created products on People Learn. Create, edit, and share your courses, books, and more."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://peoplelearn.io/dashboard/products/personal"
        />
        <meta
          property="og:title"
          content="created products | People Learn"
        />
        <meta
          property="og:description"
          content="Explore and manage your created products on People Learn. Create, edit, and share your courses, books, and more."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta
          name="twitter:title"
          content="created products | People Learn"
        />
        <meta
          name="twitter:description"
          content="Explore and manage your created products on People Learn. Create, edit, and share your courses, books, and more."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <DashboardLayout>
        <MyProducts
          academiesData={academiesData}
          coursesData={coursesData}
          booksData={booksData}
        />
        <DeleteModal />
      </DashboardLayout>
    </>
  )
}

export default Products

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken

  try {
    const academies = (await fetchAcademies(
      { instructor: 'true' },
      token
    )) as IAcademies

    const courses = await fetchCourses(
      { type: 'Course', instructor: 'true' },
      token
    )

    const books = await fetchBooks({ type: 'Book', instructor: 'true' }, token)

    return {
      props: {
        academiesData: JSON.parse(JSON.stringify(academies)) as IAcademies,
        coursesData: JSON.parse(JSON.stringify(courses)) as ICourses,
        booksData: JSON.parse(JSON.stringify(books)) as ICourses,
      },
    }
  } catch (e: any) {
    console.log(e)
    return {
      props: {
        academiesData: {} as IAcademies,
        coursesData: {} as ICourses,
        booksData: {} as ICourses,
      },
    }
  }
}

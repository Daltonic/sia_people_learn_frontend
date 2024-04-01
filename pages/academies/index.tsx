import PageHeader from '@/components/reusableComponents/PageHeader'
import Filterlayer from '@/components/courses/Filterlayer'
import Layout from '@/components/layout/Layout'
import { GetServerSidePropsContext, NextPage } from 'next'
import { FetchProductsParams, IAcademies } from '@/utils/type.dt'
import AcademyLayer from '@/components/academies/AcademyLayer'
import Pagination from '@/components/reusableComponents/Pagination'
import { fetchAcademies } from '@/services/backend.services'
import Head from 'next/head'

const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Oldest', value: 'oldest' },
]

const filterOptions = [
  { name: 'All', value: 'All' },
  { name: 'Beginner', value: 'Beginner' },
  { name: 'Intermediate', value: 'Intermediate' },
  { name: 'Advanced', value: 'Advanced' },
]

const Page: NextPage<{ academiesObj: IAcademies }> = ({ academiesObj }) => {
  return (
    <>
      <Head>
        <title>Academies | PeopleLearn</title>
        <meta
          name="description"
          content="Explore our trending academies in Blockchain and Web3 Development. Join the community and learn from the best."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/academies" />
        <meta property="og:title" content="Academies | PeopleLearn" />
        <meta
          property="og:description"
          content="Explore our trending academies in Blockchain and Web3 Development. Join the community and learn from the best."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Academies | PeopleLearn" />
        <meta
          name="twitter:description"
          content="Explore our trending academies in Blockchain and Web3 Development. Join the community and learn from the best."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <Layout>
        <div className="flex justify-center px-5 md:px-10">
          <div className="flex flex-col mt-5 md:mt-10">
            <div>
              <PageHeader> Trending Academies</PageHeader>
              <p className="text-slate-600 capitalize w-full mt-1">
                Explore our trending Academies in Blockchain and We3
                Development.
              </p>
            </div>
            <Filterlayer
              searchPlaceholder="Search Academies Here..."
              route="/academies"
              filterLabel="Difficulty"
              filterOptions={filterOptions}
              sortLabel="Order By"
              sortOptions={sortOptions}
            />
            <AcademyLayer data={academiesObj} />
            {academiesObj.numOfPages > 1 && (
              <Pagination totalPages={academiesObj.numOfPages} />
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const searchQuery = context.query.q || ''
  const page = context.query.page
  const filter = context.query.filter || 'newest'
  const difficulty = context.query.difficulty

  try {
    const academies = await fetchAcademies({
      searchQuery: searchQuery as string,
      page: Number(page),
      filter: filter as FetchProductsParams['filter'],
      difficulty:
        difficulty === 'All'
          ? null
          : (difficulty as FetchProductsParams['difficulty']),
    })

    return {
      props: {
        academiesObj: JSON.parse(JSON.stringify(academies)) as IAcademies,
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        academiesObj: {} as IAcademies,
      },
    }
  }
}

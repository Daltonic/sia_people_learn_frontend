import Layout from '@/components/layout/Layout'
import { GetServerSidePropsContext, NextPage } from 'next'
import Image from 'next/image'
import { IAcademy, IReviews } from '@/utils/type.dt'
import ReviewSection from '@/components/blogs/ReviewSection'
import { fetchAcademy, fetchReviews } from '@/services/backend.services'
import CoursesAccordion from '@/components/courses/CoursesAccordion'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'

const Page: NextPage<{ academyData: IAcademy; reviewsData: IReviews }> = ({
  academyData,
  reviewsData,
}) => {
  const searchParams = useSearchParams()

  const subscriptionId = searchParams.get('sub') as string
  return (
    <>
      {academyData && (
        <Head>
          <title>{academyData.name} | PeopleLearn</title>
          <meta
            name="description"
            content={`Explore ${academyData.name}, a top academy on PeopleLearn offering ${academyData.courses.length} courses and ${academyData.reviews.length} reviews.`}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://peoplelearn.io/academies/${academyData.slug}`}
          />
          <meta
            property="og:title"
            content={`${academyData.name} | PeopleLearn`}
          />
          <meta
            property="og:description"
            content={`Explore ${academyData.name}, a top academy on PeopleLearn offering ${academyData.courses.length} courses and ${academyData.reviews.length} reviews.`}
          />
          <meta property="og:image" content={academyData.imageUrl ?? ''} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@peoplelearn" />
          <meta
            name="twitter:title"
            content={`${academyData.name} | PeopleLearn`}
          />
          <meta
            name="twitter:description"
            content={`Explore ${academyData.name}, a top academy on PeopleLearn offering ${academyData.courses.length} courses and ${academyData.reviews.length} reviews.`}
          />
          <meta name="twitter:image" content={academyData.imageUrl ?? ''} />
        </Head>
      )}
      <Layout>
        <div className="w-full p-5 md:p-10 md:flex justify-between items-start gap-5">
          <div className="mb-4 w-full md:w-[70%]">
            <div className="w-full">
              <Image
                height={500}
                width={1000}
                src={academyData.imageUrl || '/images/general/cardimg.svg'}
                alt={academyData.name}
                className="w-full md:h-[55vh] object-cover rounded-lg"
              />
            </div>

            <div className="flex justify-between md:mt-4">
              <span className="text-[#321463] text-2xl font-medium capitalize">
                {academyData.name}
              </span>
            </div>

            <div className="my-4">
              <h1 className="text-xl md:text-lg text-[#321463] font-medium">
                Overview
              </h1>
              <p className=" text-[#4F547B]">{academyData.overview}</p>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: academyData.description }}
              className="mt-2 md:mt-5 text-[#4F547B]"
            />

            <div className="sm:hidden flex my-4">
              <CoursesAccordion
                academy={academyData}
                subscriptionId={subscriptionId}
              />
            </div>

            <ReviewSection
              reviewsData={reviewsData}
              productId={academyData._id}
              productType="Academy"
              showReviewForm={true}
            />
          </div>

          <div className="hidden sm:block md:w-[30%] mt-4 md:mt-0">
            <CoursesAccordion
              academy={academyData}
              subscriptionId={subscriptionId}
            />
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
  const { slug } = context.query
  const token = context.req.cookies.accessToken

  try {
    const academy = await fetchAcademy(slug as string, token)
    const reviews = await fetchReviews(
      {
        productSlug: slug as string,
        productType: 'Academy',
      },
      token
    )

    return {
      props: {
        academyData: JSON.parse(JSON.stringify(academy)),
        reviewsData: JSON.parse(JSON.stringify(reviews)),
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        academyData: {} as IAcademy,
        reviewsData: {} as IReviews,
      },
    }
  }
}

'use client'
import Layout from '@/components/layout/Layout'
import { GetServerSidePropsContext, NextPage } from 'next'
import { blogs, categories } from '@/data/blogs'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FetchPostsParams, IPosts } from '@/utils/type.dt'
import { convertStringToDate } from '@/utils'
import console from 'console'
import Pagination from '@/components/reusableComponents/Pagination'
import SearchAndFilterBar from '@/components/reusableComponents/SearchAndFilterBar'
import CategoryFilters from '@/components/reusableComponents/CategoryFilter'
import { fetchPosts } from '@/services/backend.services'
import Head from 'next/head'

type Blog = {
  id: number
  imageSrc: string
  category: string
  title: string
  date: string
  desc: string
}

const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Oldest', value: 'oldest' },
]

const Page: NextPage<{ postsData: IPosts }> = ({ postsData }) => {
  const [pageItems, setPageItems] = useState<Blog[]>([])
  const [currentCategory, setCurrentCategory] = useState('All Categories')
  useEffect(() => {
    if (currentCategory == 'All Categories') {
      setPageItems(blogs)
    } else {
      let filtered = blogs.filter((elm) => elm.category == currentCategory)
      setPageItems(filtered)
    }
  }, [currentCategory])

  return (
    <>
      <Head>
        <title>Latest News | PeopleLearn</title>
        <meta
          name="description"
          content="Stay tuned for the latest updates on Blockchain and Web3 Development. Join the PeopleLearn community and explore our blog posts."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/blogs" />
        <meta property="og:title" content="Latest News | PeopleLearn" />
        <meta
          property="og:description"
          content="Stay tuned for the latest updates on Blockchain and Web3 Development. Join the PeopleLearn community and explore our blog posts."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Latest News | PeopleLearn" />
        <meta
          name="twitter:description"
          content="Stay tuned for the latest updates on Blockchain and Web3 Development. Join the PeopleLearn community and explore our blog posts."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
      </Head>

      <Layout>
        <div className="flex flex-col items-center px-5 mt-10">
          <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
            Latest News
          </h1>
          <p className="text-slate-600 text-center text-md mt-3 capitalize w-full">
            Stay tuned for the latest updates on Blockchain and Web3
            Development.
          </p>
        </div>

        <section className="mt-5">
          <div className="px-5 sm:px-10 md:px-20 font-medium">
            <CategoryFilters />

            <SearchAndFilterBar
              searchPlaceholder="Search Blog Posts Here..."
              route="/blogs"
              sortLabel="Order By:"
              sortOptions={sortOptions}
            />

            <div className="relative pt-10">
              <div className="top-0 is-active">
                <div className="flex justify-between gap-6 flex-wrap w-full">
                  {postsData &&
                    postsData.posts.map((post, i: number) => (
                      <div key={i} className="w-full sm:w-80 md:w-56 mb-4 ">
                        <div className="w-full">
                          <Link
                            className="linkCustom"
                            href={`/blogs/${post.slug}`}
                          >
                            <div className="">
                              <Image
                                width={530}
                                height={450}
                                className="rounded-md"
                                src={post.imageUrl || '/images/blog-list/3.svg'}
                                alt="image"
                              />
                            </div>
                            <div className="mt-3">
                              <h1 className="text-[#C5165D] text-sm uppercase">
                                {post.category}
                              </h1>
                              <h4 className="text-[#242239] text-base font-medium md:mt-1">
                                {post.title}
                              </h4>
                              <div className="text-xs text-[#4F547B] mt-2 md:mt-3">
                                {convertStringToDate(post.createdAt)}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>

                <Pagination totalPages={postsData.numOfPages} />
              </div>
            </div>
          </div>
        </section>
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
  const category = context.query.category

  try {
    const posts = await fetchPosts({
      searchQuery: searchQuery as string,
      page: Number(page),
      filter: filter as FetchPostsParams['filter'],
      category: category as string,
      parentsOnly: 'true',
    })

    return {
      props: {
        postsData: JSON.parse(JSON.stringify(posts)),
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        postsData: {},
      },
    }
  }
}

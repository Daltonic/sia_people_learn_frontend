'use client'

import React from 'react'
import Layout from '@/components/layout/Layout'
import { GetServerSidePropsContext, NextPage } from 'next'
import { IPost } from '@/utils/type.dt'
import RelatedPosts from '@/components/blogs/RelatedPosts'
import Blog from '@/components/blogs/Blog'
import { fetchPost } from '@/services/backend.services'
import Head from 'next/head'

const Page: NextPage<{ postData: IPost }> = ({ postData }) => {
  return (
    <>
      {postData && (
        <Head>
          <title>{postData.title} | PeopleLearn Blog</title>
          <meta
            name="description"
            content={`Read ${postData.title} on PeopleLearn Blog. ${postData.description}`}
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`https://peoplelearn.io/blogs/${postData.slug}`}
          />
          <meta
            property="og:title"
            content={`${postData.title} | PeopleLearn Blog`}
          />
          <meta
            property="og:description"
            content={`Read ${postData.title} on PeopleLearn Blog. ${postData.description}`}
          />
          <meta property="og:image" content={postData.imageUrl ?? ''} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@peoplelearn" />
          <meta
            name="twitter:title"
            content={`${postData.title} | PeopleLearn Blog`}
          />
          <meta
            name="twitter:description"
            content={`Read ${postData.title} on PeopleLearn Blog. ${postData.description}`}
          />
          <meta name="twitter:image" content={postData.imageUrl ?? ''} />
        </Head>
      )}

      <Layout>
        <Blog post={postData} />
        <RelatedPosts />
      </Layout>
    </>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.query

  try {
    const post = await fetchPost(slug as string)
    return {
      props: {
        postData: post,
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        postData: {},
      },
    }
  }
}

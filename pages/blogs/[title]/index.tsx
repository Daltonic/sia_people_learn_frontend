import React from "react";
import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { IPost } from "@/utils/type.dt";
import RelatedPosts from "@/components/blogs/RelatedPosts";
import Blog from "@/components/blogs/Blog";
import { fetchPost } from "@/services/backend.services";

const Page: NextPage<{ postData: IPost }> = ({ postData }) => {
  return (
    <Layout>
      <Blog post={postData} />
      <RelatedPosts />
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { title } = context.query;

  try {
    const post = await fetchPost(title as string);
    return {
      props: {
        postData: post,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        postData: {},
      },
    };
  }
};

import AcademiesSlider from "@/components/home/AcademySlider/AcademiesSlider";
import BlogList from "@/components/home/BlogList";
import CTA from "@/components/home/CTA";
import CoursesSlider from "@/components/home/CoursesSlider/CoursesSlider";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import Stacks from "@/components/home/Stacks";
import Testimonials from "@/components/home/Testimonials";
import Features from "@/components/home/hero/Features";
import Hero from "@/components/home/hero/Hero";
import Layout from "@/components/layout/Layout";
import { IAcademies, ICourses, IPosts } from "@/utils/type.dt";
import { NextPage } from "next";

export const metadata = {
  title: "Home | Dapp Mentors",
};

const Page: NextPage<{
  academiesData: IAcademies;
  coursesData: ICourses;
  booksData: ICourses;
  postsData: IPosts;
}> = ({ academiesData, coursesData, booksData, postsData }) => {
  return (
    <Layout>
      <main className="overflow-x-hidden">
        <Hero />
        <Features />
        <CoursesSlider coursesObj={coursesData} />
        <HowItWorks />
        <AcademiesSlider academyObj={academiesData} />
        <CTA />
        <Testimonials />
        <Stacks />
        <BlogList postsObj={postsData} />
        <Newsletter />
      </main>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async () => {
  const requestDetails = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const academiesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies`,
      requestDetails
    );

    const academies = await academiesRes.json();

    const coursesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/courses?type=Course`,
      requestDetails
    );

    const courses = await coursesRes.json();

    const booksRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/courses?type=Book`,
      requestDetails
    );

    const books = await booksRes.json();

    const postsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts`,
      requestDetails
    );

    const posts = await postsRes.json();

    return {
      props: {
        academiesData: JSON.parse(JSON.stringify(academies)),
        coursesData: JSON.parse(JSON.stringify(courses)),
        booksData: JSON.parse(JSON.stringify(books)),
        postsData: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};

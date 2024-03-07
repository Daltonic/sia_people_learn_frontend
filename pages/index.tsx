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
import {
  fetchAcademies,
  fetchBooks,
  fetchCourses,
  fetchPosts,
  fetchSiteSettings,
} from "@/services/backend.services";
import { IAcademies, ICourses, IPosts, ISiteSettings } from "@/utils/type.dt";
import { NextPage } from "next";

export const metadata = {
  title: "Home | PeopleLearn",
};

const Page: NextPage<{
  academiesData: IAcademies;
  coursesData: ICourses;
  booksData: ICourses;
  postsData: IPosts;
  settingsData: ISiteSettings;
}> = ({ academiesData, coursesData, booksData, postsData, settingsData }) => {
  return (
    <Layout>
      <main className="overflow-x-hidden">
        <Hero settingsData={settingsData} />
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
  try {
    const academies = await fetchAcademies({});

    const courses = await fetchCourses({ type: "Course" });

    const books = await fetchBooks({ type: "Book" });

    const posts = await fetchPosts({ parentsOnly: "true" });
    const settings = await fetchSiteSettings();

    return {
      props: {
        academiesData: JSON.parse(JSON.stringify(academies)),
        coursesData: JSON.parse(JSON.stringify(courses)),
        booksData: JSON.parse(JSON.stringify(books)),
        postsData: JSON.parse(JSON.stringify(posts)),
        settingsData: JSON.parse(JSON.stringify(settings)) as ISiteSettings,
      },
    };
  } catch (e: any) {
    console.log(e);
    return {
      props: {
        academiesData: {} as any,
        coursesData: {} as any,
        booksData: {} as any,
        postsData: {} as any,
        settingsData: {} as ISiteSettings,
      },
    };
  }
};

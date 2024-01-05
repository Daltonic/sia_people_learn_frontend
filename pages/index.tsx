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
import { NextPage } from "next";

export const metadata = {
  title: "Home | Dapp Mentors",
};

const Page: NextPage = () => {
  return (
    <Layout>
      <main className="overflow-x-hidden">
        <Hero />
        <Features />
        <CoursesSlider />
        <HowItWorks />
        <CTA />
        <Testimonials />
        <Stacks />
        <BlogList />
        <Newsletter />
      </main>
    </Layout>
  );
};

export default Page;

import BlogList from "@/components/home/BlogList";
import CTA from "@/components/home/CTA";
import CoursesSlider from "@/components/home/CoursesSlider/CoursesSlider";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import Stacks from "@/components/home/Stacks";
import Testimonials from "@/components/home/Testimonials";
import Features from "@/components/home/hero/Features";
import Hero from "@/components/home/hero/Hero";
import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/Header";
import { NextPage } from "next";

export const metadata = {
  title: "Home | Dapp Mentors",
  description: "Lorem Ipsu,",
};

const Page: NextPage = () => {
  return (
    <main className="">
      <Header />

      <div className="mt-20">
        <Hero />
        <Features />
        <CoursesSlider />
        <HowItWorks />
        <CTA />
        <Testimonials />
        <Stacks />
          <BlogList />
         <Newsletter />
         <Footer />
      </div>
    </main>
  );
};

export default Page;

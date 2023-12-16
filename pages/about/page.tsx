"use client";
import Hero from "@/components/aboutus/Hero";
import LearnNewSkill from "@/components/aboutus/LearnNewSkill";
import LearningJourney from "@/components/aboutus/LearningJourney";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <Layout >
      <Hero />
      <HowItWorks />
      <LearningJourney />
      <Testimonials/>
      <LearnNewSkill/>
    </Layout>
  );
};

export default Page;

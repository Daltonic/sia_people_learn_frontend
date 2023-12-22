"use client";
import FrequentlyAsked from "@/components/contact/FrequentlyAsked";
import Hero from "@/components/contact/Hero";
import Offices from "@/components/contact/Offices";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="pb-24">
      <Hero/>
      <Offices/>
      <FrequentlyAsked/>
      </div>
    </Layout>
  );
};

export default Page;

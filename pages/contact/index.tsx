"use client";
import FrequentlyAsked from "@/components/contact/FrequentlyAsked";
import Hero from "@/components/contact/Hero";
import Offices from "@/components/contact/Offices";
import Layout from "@/components/layout/Layout";
import { accordion } from "@/data/accordion";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="md:pb-24">
      <Hero/>
      <Offices/>
      <FrequentlyAsked items={accordion}/>
      </div>
    </Layout>
  );
};

export default Page;

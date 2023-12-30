"use client";
import Layout from "@/components/layout/Layout";
import PriceCard from "@/components/pricing/PriceCard";
import { NextPage } from "next";
import { pricingData } from "../../data/pricing";

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className=" px-5 mt-10 text-center">
          <h1 className="text-violet-950 text-3xl md:text-4xl font-bold">
            Pricing
          </h1>
          <p className="text-slate-600 text-md mt-3 capitalize">
            We are on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between w-4/5 mt-16 gap-10 md:gap-0">
          {pricingData.map((item, i) => (
            <PriceCard key={i} {...item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;

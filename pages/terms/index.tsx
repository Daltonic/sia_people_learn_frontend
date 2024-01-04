"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import { terms } from "@/data/terms";

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="px-5 mt-10 text-center">
          <h1 className="text-violet-950 text-3xl md:text-4xl font-bold">
            Terms & Conditions
          </h1>
          <p className="text-slate-600 text-md mt-3 capitalize">
            We are on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        <div className="md:w-4/5 px-5 md:px-0 my-10 md:my-16 space-y-10">
          {terms.map((elm, index) => (
            <div key={index}>
              <h1 className="text-[#321463] font-medium text-xl md:text-lg mb-2">
                {elm.title}
              </h1>
              <p className="text-[#4F547B] text-lg md:text-base">
                {elm.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;

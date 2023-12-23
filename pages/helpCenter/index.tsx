"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import { helpItems } from "../../data/helpItems";
import { FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import HelpCenterCard from "@/components/helpcenter/HelpCenterCard";
import FrequentlyAsked from "@/components/contact/FrequentlyAsked";
import { accordion } from "@/data/accordion";

const Page: NextPage = () => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
      }
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className=" md:px-5 md:mt-10 text-center">
          <h1 className="text-violet-950 text-3xl md:text-4xl font-bold">
            How can we help you?
          </h1>
          <p className="text-slate-600 text-md mt-3 capitalize">
            We're on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        <div className="flex mt-10 justify-center ">
          <form
            className="relative h-14 flex"
            action="post"
            onSubmit={handleSubmit}
          >
            <input
              required
              type="text"
              placeholder="Enter a question, topic or keyword"
              className="w-[30rem] rounded-lg h-full border border-[#EDEDED] px-4"
            />
            <button
              className="absolute right-2 top-1.5 rounded-md bg-[#C5165D] text-white font-medium h-[80%] px-4 flex gap-2 items-center"
              type="submit"
            >
                <FaSearch/>
              Search
            </button>
          </form>
        </div>
        <div className="flex justify-between flex-wrap gap-5 mt-16 px-20">
          {helpItems.map((item, i) => (
            <HelpCenterCard key={i} {...item} />
          ))}
        </div>
        <FrequentlyAsked items={accordion}/>
      </div>
    </Layout>
  );
};

export default Page;

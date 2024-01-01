"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import { coursesData } from "../../data/courses";
import Image from "next/image";
import { LiaTimesSolid } from "react-icons/lia";
import Link from "next/link";

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center overflow-hidden">
        <div className="flex flex-col items-center md:px-5 md:mt-10 text-center">
          <h1 className="text-violet-950 text-3xl md:text-4xl font-bold">
            Shop Cart
          </h1>
          <p className="text-slate-600 text-md mt-3 capitalize">
            We are on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        <div className=" px-5 md:px-0 w-full overflow-x-auto">
        <table className="w-full mt-14">
          <thead className="bg-[#F5F7FE] text-[#C5165D] font-medium h-20 rounded-md">
            <tr>
              <th className="text-start pl-5 md:pl-10">Product</th>
              <th className="px-5 md:px-10 w-1/3 md:w-1/6 text-start">Price</th>
              <th className="px-5 md:px-10 w-1/3 md:w-1/6 text-start">Subtotal</th>
              <th className="px-5 md:px-10 w-1/3 md:w-1/6 text-start">Remove</th>
            </tr>
          </thead>
          <tbody>
            {coursesData.map((elm: any, i: number) => (
              <tr key={i} className="border-b border-[#EDEDED]">
                <td className="flex items-center gap-5 md:pl-10 py-2 w-96 pl-5">
                  <Image
                    className="w-20 rounded-md"
                    alt=""
                    width={0}
                    height={0}
                    src={elm.imageSrc}
                  />
                  <span className="text-[#321463] font-medium">
                    {elm.title}
                  </span>
                </td>
                <td className="w-1/3 md:w-1/6 md:px-10 text-center md:text-start text-[#4F547B]">
                  ${elm.originalPrice}
                </td>
                <td className="w-1/3 md:w-1/6 md:px-10 text-center md:text-start text-[#321463] font-medium">
                  ${elm.originalPrice}
                </td>
                <td className="w-full md:w-1/6 md:px-16 text-center md:text-base text-[#1A3454]">
                 <LiaTimesSolid className="w-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex flex-col items-center md:items-end w-full md:w-5/6 mt-16 px-5 md:px-0">
          <div className="borderborder-[#EDEDED] bg-slate-50 p-5 rounded-lg w-full md:w-1/3">
            <div className="flex justify-between border-b border-[#EDEDED] py-2">
              <h1 className="text-[#321463] font-medium">Subtotal</h1>
              <p className="text-[#4F547B]">$1.298</p>
            </div>
            <div className=" flex justify-between  py-2">
              <h1 className="text-[#321463] font-medium">Total </h1>
              <p className="text-[#4F547B]"> $3.298</p>
            </div>
            <Link href="/shopcheckout">
          <button className="text-white text-center font-medium whitespace-nowrap bg-pink-700 justify-center items-center px-16 py-4 rounded-lg max-md:px-5 mt-6">
          Proceed to checkout
          </button>
          </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

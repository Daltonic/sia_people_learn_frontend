"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import { coursesData } from "../../data/courses";
import Link from "next/link";
import ShopCartTable from "@/components/shopcart/ShopCartTable";
import ShopCartMobile from "@/components/shopcart/ShopCartMobile";

const Page: NextPage = () => {
  const isDesktopOrLaptop =
    typeof window !== "undefined" ? window.innerWidth > 680 : false;
  return (
    <Layout>
      <div className="flex flex-col items-center overflow-hidden">
        <div className="flex flex-col items-center px-5 md:mt-10 text-center">
          <h1 className="text-violet-950 text-3xl md:text-4xl font-bold">
            Shop Cart
          </h1>
          <p className="text-slate-600 text-md mt-3 capitalize">
            Manage your selected courses and proceed to checkout.
          </p>
        </div>
        {isDesktopOrLaptop ? <ShopCartTable /> : <ShopCartMobile />}
        {/* <div className="flex flex-col items-center md:items-end w-full md:w-5/6 mt-16 px-5 md:px-0">
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
        </div> */}
      </div>
    </Layout>
  );
};

export default Page;

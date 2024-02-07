"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import ShopCartTable from "@/components/shopcart/ShopCartTable";
import ShopCartMobile from "@/components/shopcart/ShopCartMobile";
import EmptyComponent from "@/components/reusableComponents/EmptyComponent";

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
        {true

          ? 
          <div className="w-5/6 mt-10">
          <EmptyComponent title="No Courses Available" buttonText="Create One Now" />
          </div>
          : (isDesktopOrLaptop ? <ShopCartTable /> : <ShopCartMobile />)
        }
      </div>
    </Layout>
  );
};

export default Page;

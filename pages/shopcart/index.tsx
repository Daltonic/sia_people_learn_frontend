import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";

const ShopCartTable = dynamic(() => import('@/components/shopcart/ShopCartTable'));
const ShopCartMobile = dynamic(() => import('@/components/shopcart/ShopCartMobile'));

const Page: NextPage = () => {
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopOrLaptop(window.innerWidth > 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      </div>
    </Layout>
  );
};

export default Page;

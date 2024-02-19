"use client";
import Layout from "@/components/layout/Layout";
import { cartActions } from "@/store/cartSlice";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Page: NextPage = () => {
  const dispatch = useDispatch();

  const { setCartAcademyItems, setCartCourseItems, setCartAmount } =
    cartActions;

  useEffect(() => {
    dispatch(setCartCourseItems([]));
    sessionStorage.removeItem("sessionCourses");
  }, [dispatch, setCartCourseItems]);

  useEffect(() => {
    dispatch(setCartAcademyItems([]));
    sessionStorage.removeItem("sessionAcademies");
  }, [dispatch, setCartAcademyItems]);

  useEffect(() => {
    dispatch(setCartAmount(0));
    sessionStorage.removeItem("cartAmount");
  }, [dispatch, setCartAmount]);

  return (
    <Layout>
      <div className="flex justify-center items-center p-5 sm:p-10">
        <div className="md:w-5/6 h-72 p-5 sm:p-10 sm:my-14 md:my-16 shadow shadow-slate-400  bg-[url('/images/instructors/instructorbg.svg')] bg-cover bg-center rounded-md flex flex-col items-center sm:items-start text-center">
          <Image
            className="w-16 h-16 object-cover mb-5"
            src="/images/general/sucess.svg"
            width={10}
            height={20}
            alt=""
          />
          <h1 className="text-violet-950 text-xl sm:text-3xl font-bold">
            Payment Successful
          </h1>
          <p className="text-slate-600 text-base mt-2">
            Thank you for your purchase! Your payment has been successfully
            processed.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

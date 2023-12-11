"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useContextElement } from "@/context/Context";

interface CartProduct {
  name: string;
  price: number;
  quantity: number;
}

const Page: NextPage = () => {
  const { cartProducts } = useContextElement();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shiping, setShiping] = useState<number>(0);

  useEffect(() => {
    const sum = cartProducts.reduce(
      (accumulator: number, currentValue: CartProduct) => {
        return accumulator + currentValue.price * currentValue.quantity;
      },
      0
    );

    const sumQuantity = cartProducts.reduce(
      (accumulator: number, currentValue: CartProduct) => {
        return accumulator + currentValue.quantity;
      },
      0
    );
    setShiping(sumQuantity * 10);
    setTotalPrice(sum);
  }, [cartProducts]);

  return (
    <Layout>
      <div className="text-center w-full mb-16 p-5">
        <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
          Order Status
        </h1>
        <p className="text-slate-600 text-center text-md mt-3 capitalize w-full">
          We're on a mission to deliver engaging, curated courses at a
          reasonable price.
        </p>
      </div>

      <section className="px-5" >
        <div className="flex flex-col items-center ">
          <div className="w-full text-center flex flex-col items-center">
            <div className="bg-[#C5165D] rounded-full text-xl p-6 md:p-4 text-white">
              <FaCheck />
            </div>
            <h2 className="text-violet-950 text-center text-xl md:text-lg font-bold mt-2">
              Your order is completed!
            </h2>
            <p className="text-slate-600 text-center text-sm mt-3">
              Thank you. Your order has been received.
            </p>
          </div>

          <div className="border-[#C5165D] border-dashed border-2 md:flex justify-between w-full md:w-3/5 py-6 px-5 md:px-14 rounded-lg my-8 md:my-16">
            <div>
              <h1 className="text-violet-950 text-md font-medium">Order Number</h1>
              <p className="text-[#C5165D] font-medium text-sm mt-3">13119</p>
            </div>

            <div>
              <h1 className="text-violet-950 text-md font-medium">Date</h1>
              <p className="text-[#C5165D] font-medium text-sm mt-3">27/07/2021</p>
            </div>

            <div>
              <h1 className="text-violet-950 text-md font-medium">Total</h1>
              <p className="text-[#C5165D] font-medium text-sm mt-3">$40.10</p>
            </div>

            <div>
              <h1 className="text-violet-950 text-md font-medium">Payment Method</h1>
              <p className="text-[#C5165D] font-medium text-sm mt-3">Direct Bank Transfer</p>
            </div>
          </div>

            <div className="bg-[#F7F8FB] border border-[#EDEDED] rounded-xl p-5 md:p-8 w-full md:w-3/5 mb-20">
              <h1 className="text-violet-950 text-lg font-medium">Order details</h1>
              <div className="flex justify-between border-b border-[#EDEDED] py-4 text-violet-950 text-sm font-medium">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              {cartProducts.map((elm: CartProduct, i: number) => (
                <div key={i } className="text-[#4F547B] text-xs flex justify-between">
                  <span>
                    {elm.name} x {elm.quantity}
                  </span>
                  <span>${(elm.price * elm.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="flex justify-between border-b border-[#EDEDED] py-4 text-violet-950 text-sm font-medium">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-b border-[#EDEDED] py-4 text-violet-950 text-sm font-medium">
                <span>Shipping</span>
                <span>${shiping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-4 text-violet-950 text-sm font-medium">
                <span>Total</span>
                <span>${(totalPrice + shiping).toFixed(2)}</span>
              </div>
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default Page;

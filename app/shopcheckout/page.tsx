"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import React, { createContext, useContext, useEffect, useState } from "react";
import InputField from "@/components/ReusableComponents/InputField";
import Image from "next/image";

const Page: NextPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className="flex flex-col items-center md:px-5 mt-10">
        <div className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
          Shop Checkout
        </div>
        <div className="text-slate-600 text-center text-md mt-3 capitalize w-full">
          We're on a mission to deliver engaging, curated courses at a
          reasonable price.
        </div>
      </div>
      <section className="px-16 mt-16 flex gap-10">
        <div className="w-[70%] flex-1">
          <div >
            <div className="">
              <form
                onSubmit={handleSubmit}
                className=""
              >
                <div className="">
                  <h5 className="">Billing details</h5>
                </div>
                <div className="flex justify-between gap-4">
                  <InputField
                    label="First name"
                    name="firstName"
                    placeholder="First name"
                    required
                    inputType="text"
                  />
                  <InputField
                    label="Last name"
                    name="lastName"
                    placeholder="Last name"
                    required
                    inputType="text"
                  />
                </div>
                <div>
                  <label className="text-violet-950 font-medium">
                    Card number
                  </label>
                  <div className="flex justify-between border border-[color:var(--border-2,#E1DDDD)] w-full px-6 py-3">
                    <input
                      required
                      className="text-slate-600 flex-1 justify-center mt-3 focus:outline-none rounded-lg items-start"
                      type="number"
                      name="card number"
                      placeholder="1234 1234 1234"
                    />
                    <div className="flex gap-2">
                      <Image
                        width={40}
                        height={18}
                        src="/images/cardPayments/1.svg"
                        alt="icon"
                      />
                      <Image
                        width={40}
                        height={18}
                        src="/images/cardPayments/2.svg"
                        alt="icon"
                      />
                      <Image
                        width={40}
                        height={18}
                        src="/images/cardPayments/3.svg"
                        alt="icon"
                      />
                      <Image
                        width={40}
                        height={18}
                        src="/images/cardPayments/4.svg"
                        alt="icon"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <InputField
                    label="Exp Date"
                    name="number"
                    placeholder="MM/YY"
                    required
                    inputType="number"
                  />
                  <InputField
                    label="CVV"
                    name="number"
                    placeholder="123"
                    required
                    inputType="number"
                  />
                </div>
                <div className="my-4">
                  <label className="text-violet-950 font-medium w-full">
                    Email
                  </label>
                  <input
                    required
                    className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)e w-full justify-center mt-3 pl-6 py-3 rounded-lg items-start"
                    type="email"
                    name="email"
                    placeholder="Email address *"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[30%]">
          <div className="border border-[color:var(--border-1,#EDEDED)] bg-slate-50 flex w-full flex-col items-stretch py-5 rounded-lg">
            <div className="self-center flex w-full max-w-[340px] items-stretch justify-between gap-5 border-b border-[#EDEDED] pb-4 px-5">
              <div className="flex grow basis-[0%] flex-col items-stretch">
                <div className="text-violet-950 text-xl font-medium">
                  Your order
                </div>
                <div className="text-violet-950 text-base font-medium mt-4">
                  Product
                </div>
              </div>
              <div className="text-violet-950 text-right text-base font-medium grow mt-12 self-end max-md:mt-10">
                Subtotal
              </div>
            </div>
           
            <div className=" w-full">
              <div className="flex justify-between px-5 py-4">
                <div className="text-slate-600 text-base">
                  Hoodie x2
                </div>
                <div className="text-slate-600 text-right text-base">
                  $59.00
                </div>
              </div>
              <div className=" flex justify-between px-5 py-">
               
                <div className="text-violet-950 text-base font-medium">
                  Subtotal
                </div>
                <div className="text-violet-950 text-right text-base font-medium">
                  $178.00
                </div>
              </div>
            </div>
            <div className="self-center flex w-full max-w-[341px] justify-between gap-5 mt-6 px-5 items-start">
              <div className="text-violet-950 text-base font-medium">
                Total
              </div>
              <div className="text-violet-950 text-right text-base font-medium self-stretch">
                $9,218.0
              </div>
            </div>
          </div>
          <div className="border border-[color:var(--border-1,#EDEDED)] bg-slate-50 flex w-full flex-col mt-8 px-5 py-5 rounded-lg border-solid max-md:px-5">
            <div className="text-violet-950 text-xl font-medium self-stretch">
              Payment
            </div>
            <div className="flex gap-4 mt-4 self-start items-center">
            <input type="radio" name="radio" checked={true} />
              <div className="text-violet-950 text-base font-medium grow">
                Card Payment
              </div>
            </div>
            <div className="text-slate-600 text-sm leading-6 mt-4">
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference.Your order will not be shipped
              until the funds have cleared in our account.
            </div>
            <div className="flex justify-between gap-4 mt-4 items-center">
            <input type="radio" name="radio" checked={false} />
              <div className="text-violet-950 text-base font-medium leading-[50px] grow">
                Crypto payments
              </div>
            </div>
          </div>
          <button className="text-white text-center text-base font-medium whitespace-nowrap bg-pink-700 justify-center items-center px-16 py-4 rounded-lg max-md:px-5 mt-6">
            Place Order
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Page;

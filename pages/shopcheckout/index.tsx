'use client'
import Layout from '@/components/layout/Layout'
import { NextPage } from 'next'
import React from 'react'
import InputField from '@/components/reusableComponents/InputField'
import Image from 'next/image'
import Link from 'next/link'

const Page: NextPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <Layout>
      <div className="flex flex-col items-center md:px-5 md:mt-10">
        <div className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
          Shop Checkout
        </div>
        <div className="text-slate-600 text-center text-md mt-3 capitalize w-full">
        We assure you that we do not store your billing details in our database. 
        </div>
      </div>
      <section className="px-5 sm:px-10 md:px-16 mt-8 md:mt-16 md:flex gap-10">
        <div className="md:w-[70%] flex-1">
          <div className="">
            <form onSubmit={handleSubmit} className="">
              <div className="">
                <h5 className="text-violet-950 font-medium text-xl md:text-lg">
                  Billing details
                </h5>
              </div>
              <div className="md:flex justify-between gap-4">
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
                <div className="flex justify-between border border-[color:var(--border-2,#E1DDDD)] w-full px-3 md:px-6 py-3">
                  <input
                    required
                    className="text-slate-600 flex-1 justify-center mt-3 focus:outline-none rounded-lg items-start"
                    type="number"
                    name="card number"
                    placeholder="1234 1234 1234"
                  />
                  <div className="hidden md:flex items-center gap-2">
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
              <div className="md:flex justify-between gap-4">
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
        <div className="flex flex-col gap-5 md:w-[30%]">
          <div className="border border-[#EDEDED] bg-slate-50 flex w-full flex-col p-5 rounded-lg gap-5">
            <div className="flex w-full items-end justify-between gap-5 border-b border-[#EDEDED]">
              <div className="text-[#321463]">
                <h1 className="text-xl font-medium pb-4">
                  Your order
                </h1>
                <p className="font-medium">
                  Product
                </p>
              </div>
              <p className="font-medium">
                Subtotal
              </p>
            </div>

            <div className="w-full space-y-5">
              <div className="flex justify-between text-[#4F547B]">
                <p>Hoodie x2</p>
                <p>
                  $59.00
                </p>
              </div>
              <div className=" flex justify-between text-[#321463]">
                <p className=" font-medium">
                  Subtotal
                </p>
                <p className=" text-right font-medium">
                  $178.00
                </p>
              </div>
            </div>
            <div className="flex justify-between gap-5 items-start text-[#321463]">
              <p className=" font-medium">Total</p>
              <p className=" text-right font-medium self-stretch">
                $9,218.0
              </p>
            </div>
          </div>
          <div className="border border-[color:var(--border-1,#EDEDED)] bg-slate-50 flex w-full flex-col mt-8 px-5 py-5 rounded-lg border-solid max-md:px-5">
            <div className="text-violet-950 text-xl font-medium self-stretch">
              Payment
            </div>
            <div className="flex gap-4 mt-4 self-start items-center">
              <input type="radio" name="radio" checked={true} />
              <div className="text-violet-950 font-medium grow">
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
              <div className="text-violet-950 font-medium leading-[50px] grow">
                Crypto payments
              </div>
            </div>
          </div>
          <Link href="/shoporder">
          <button className="text-white text-center font-medium whitespace-nowrap bg-pink-700 justify-center items-center px-16 py-4 rounded-lg max-md:px-5 mt-6">
            Place Order
          </button>
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default Page

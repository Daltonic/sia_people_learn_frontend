"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import { coursesData } from "../../data/courses";
import Image from "next/image";
import { LiaTimesSolid } from "react-icons/lia";

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center md:px-5 md:mt-10">
          <h1 className="text-violet-950 text-3xl md:text-4xl font-bold">
            Shop Cart
          </h1>
          <p className="text-slate-600 text-md mt-3 capitalize">
            We are on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        <table className="w-5/6  mt-14">
          <thead className="bg-[#F5F7FE] text-[#C5165D] font-medium h-20 rounded-md">
            <tr>
            <th className="text-start pl-10">Product</th>
            <th className="px-10 w-1/6 text-start">Price</th>
            <th className="px-10 w-1/6 text-start">Subtotal</th>
            <th className="px-10 w-1/6 text-start">Remove</th>
            </tr>
          </thead>
          <tbody>
          {coursesData.map((elm: any, i: number) => (
            <tr key={i} className="border-b border-[#EDEDED]">
              <td className="flex items-center gap-5 pl-10 py-2">
                <Image
                  className="w-20 rounded-md"
                  alt=""
                  width={0}
                  height={0}
                  src={elm.imageSrc}
                />
                <span className="text-[#321463] font-medium">{elm.title}</span>
              </td>
              <td className="w-1/6 px-10 text-start text-[#4F547B]">${elm.originalPrice}</td>
              <td className="w-1/6 px-10 text-start text-[#321463] font-medium">${elm.originalPrice}</td>
              <td className="w-1/6 px-16  text-[#1A3454]"><LiaTimesSolid /></td>
            </tr>
          ))}
          </tbody>
        </table>
        {/* <div>
            {cartProducts.length > 0 ? (
              <div>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input required type="text" placeholder="Coupon Code" />
                      <button type="submit">Apply coupon</button>
                    </div>
                  </form>
                </div>

                <div>
                  <div>
                    <button>Update cart</button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <Link href="/shop-list">Buy Products</Link>
                </div>
              </div>
            )}
          </div> */}
        {/* 
          <div>
            <div>
              <h5>Cart Totals</h5>

              <div>
                <div>Subtotal</div>
                <div>${totalPrice.toFixed(2)}</div>
              </div>

              <div>
                <div>Total</div>
                <div>${totalPrice.toFixed(2)}</div>
              </div>
            </div>

            <Link href="/shop-checkout">Proceed to checkout</Link>
          </div> */}
      </div>
    </Layout>
  );
};

export default Page;

"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import { coursesData } from "@/data/courses";
import Link from "next/link";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import Image from "next/image";

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
        <table className="w-5/6">
        <thead className="flex justify-between items-center bg-[#F5F7FE] text-[#C5165D] font-medium h-20 p-10 rounded-md  mt-14">
            <th className="">Product</th>
            <th className="">Price</th>
            <th className="">Quantity</th>
            <th className="">Subtotal</th>
            <th className="">Remove</th>
        </thead>
        <tbody className="mt-10">
          {coursesData.map((elm, i: number) => (
            <div
              key={i}
              className="flex justify-between items-center w-full border py-4"
            >
              <td className="flex items-center gap-5">
                  <Image
                    width={100}
                    height={100}
                    src={elm.imageSrc}
                    alt="image"
                    className="rounded-md "
                  />
                <h1 className="text-lg md:text-base font-medium  text-[#321463]">
                  <Link className="" href={`/shop/${elm.id}`}>
                    {elm.title}
                  </Link>
                </h1>
              </td>

              <td className="flex items-center gap-2 text-[#4F547B]">
                ${elm.originalPrice}
              </td>

              <td className="flex gap-1 border border-[#E1DDDD] rounded-md">
             
                <button className="text-xs ">
                  <FaMinus />
                </button>
                <input
                  required
                  className="w-8"
                  type="number"
                  placeholder="value..."
                  value={elm.quantity}
                />
                <button className="text-xs">
                  <FaPlus />
                </button>
              </td>

              <td className="">

              ${(elm.quantity * elm.price).toFixed(2)}F
              </td>

              <div className="m">
                <FaTimes />
              </div>
            </div>
          ))}

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
          </div>

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
            </div> */}

          <Link href="/shop-checkout">Proceed to checkout</Link>
        </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Page;

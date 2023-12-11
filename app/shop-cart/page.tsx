"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContextElement } from "@/context/Context";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";

interface Course {
  id: string;
  title: string;
  imageSrc: string;
  originalPrice: number;
  quantity: number;
  price: number;
  // Add other properties as needed
}

interface ComponentProps {
  data: any;
  index?: number;
}

const Page: NextPage<ComponentProps> = () => {
  const { cartProducts, setCartProducts } = useContextElement();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleIncrease = (index: number) => {
    const item = cartProducts[index];

    item.quantity += 1;
    const updated = [...cartProducts];
    updated[index] = item;

    setCartProducts(updated);
  };

  const handleDecrease = (index: number) => {
    const item = cartProducts[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      const updated = [...cartProducts];
      updated[index] = item;

      setCartProducts(updated);
    }
  };

  const handleRemoveCart = (index: number) => {
    setCartProducts((pre: Course[]) => [
      ...pre.filter((elm: Course) => elm !== cartProducts[index]),
    ]);
  };

  useEffect(() => {
    const sum = cartProducts.reduce(
      (accumulator: number, currentValue: Course) => {
        return accumulator + currentValue.price * currentValue.quantity;
      },
      0
    );
    setTotalPrice(sum);
  }, [cartProducts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center md:px-5 md:mt-10">
          <div className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
            Shop Cart
          </div>
          <div className="text-slate-600 text-center text-md mt-3 capitalize w-full">
            We're on a mission to deliver engaging, curated courses at a
            reasonable price.
          </div>
        </div>
        <div className="flex justify-between items-center bg-[#F5F7FE] text-[#C5165D] font-medium h-20 p-10 rounded-md w-5/6 mt-14">
          <div className="">
            <p className="">Product</p>
          </div>
          <div className="">
            <p className="">Price</p>
          </div>
          <div className="">
            <p className="">Quantity</p>
          </div>
          <div className="">
            <p className="">Subtotal</p>
          </div>
          <div className="">
            <p className="">Remove</p>
          </div>
        </div>
        <div>
          {cartProducts.map((elm: Course, i: number) => (
            <div key={i} className="">
              <div className="">
                <div className="">
                  <div
                    className=""
                    style={{ backgroundImage: `url(${elm.imageSrc})` }}
                  ></div>
                </div>
                <div className="">
                  <Link className="" href={`/shop/${elm.id}`}>
                    {elm.title}
                  </Link>
                </div>
              </div>

              <div className="">
                <div className="">Price</div>
                <p>${elm.originalPrice}</p>
              </div>

              <div className="">
                <div className="">Quantity</div>

                <div className="">
                  <input
                    required
                    className=""
                    type="number"
                    placeholder="value..."
                    value={elm.quantity}
                  />

                  <div className="">
                    <button className="" onClick={() => handleDecrease(i)}>
                      <FaMinus />
                    </button>

                    <button className="" onClick={() => handleIncrease(i)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="">Subtotal</div>

                <p>${(elm.quantity * elm.price).toFixed(2)}</p>
              </div>

              <div className="m" onClick={() => handleRemoveCart(i)}>
                <FaTimes />
              </div>
            </div>
          ))}

          <div >
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
            </div>

            <Link href="/shop-checkout">Proceed to checkout</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

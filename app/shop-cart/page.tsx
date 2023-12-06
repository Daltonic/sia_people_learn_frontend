"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import Link from "next/link";
import { coursesData } from "@/data/courses";
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
  
  interface ContextElement {
    coursesData: Course[];
    setCoursesData: React.Dispatch<React.SetStateAction<Course[]>>;
  }
  
  interface ComponentProps {
    data: any;
    index?: number;
  }
  
  const Page: NextPage<ComponentProps> = ({ data }) => {
    const { coursesData, setCoursesData } = useContextElement();
    const [totalPrice, setTotalPrice] = useState<number>(0);
  
    const handleIncrease = (index: number) => {
      const item = coursesData[index];
  
      item.quantity += 1;
      const updated = [...coursesData];
      updated[index] = item;
  
      setCoursesData(updated);
    };
  
    const handleDecrease = (index: number) => {
      const item = coursesData[index];
  
      if (item.quantity > 1) {
        item.quantity -= 1;
        const updated = [...coursesData];
        updated[index] = item;
  
        setCoursesData(updated);
      }
    };
  
    const handleRemoveCart = (index: number) => {
      setCoursesData((pre: Course[]) => [...pre.filter((elm: Course) => elm !== coursesData[index])]);
    };
  
    useEffect(() => {
      const sum = coursesData.reduce((accumulator: number, currentValue: Course) => {
        return accumulator + currentValue.price * currentValue.quantity;
      }, 0);
      setTotalPrice(sum);
    }, [coursesData]);
  
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
          {coursesData.map((elm: Course, i: number) => (
            <div
              key={i}
              className="row y-gap-20 justify-between items-center pt-30 pb-30 border-bottom-light"
            >
              <div className="d-flex items-center">
                <div className="">
                  <div
                    className="size-100 bg-image rounded-8 js-lazy"
                    style={{ backgroundImage: `url(${elm.imageSrc})` }}
                  ></div>
                </div>
                <div className="fw-500 text-dark-1 ml-30">
                  <Link className="linkCustom" href={`/shop/${elm.id}`}>
                    {elm.title}
                  </Link>
                </div>
              </div>

              <div className="">
                <div className="shopCart-products__title d-none md:d-block mb-10">
                  Price
                </div>
                <p>${elm.originalPrice}</p>
              </div>

              <div className="">
                <div className="shopCart-products__title d-none md:d-block mb-10">
                  Quantity
                </div>

                <div className="input-counter md:mt-20 js-input-counter">
                  <input
                    required
                    className="input-counter__counter"
                    type="number"
                    placeholder="value..."
                    value={elm.quantity}
                  />

                  <div className="input-counter__controls">
                    <button
                      className="input-counter__up js-down"
                      onClick={() => handleDecrease(i)}
                    >
                      <FaMinus />
                    </button>

                    <button
                      className="input-counter__down js-up"
                      onClick={() => handleIncrease(i)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="shopCart-products__title d-none md:d-block mb-10">
                  Subtotal
                </div>

                <p>${(elm.quantity * elm.price).toFixed(2)}</p>
              </div>

              <div
                className="md:d-none d-flex justify-end"
                onClick={() => handleRemoveCart(i)}
              >
                <FaTimes />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;

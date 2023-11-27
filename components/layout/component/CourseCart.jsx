"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import Link from "next/link";

const CourseCart = () => {
  const { cartCourses, setCartCourses } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleRemoveCart = (index) => {
    const item = cartCourses[index];

    setCartCourses((pre) => [...pre.filter((elm) => elm !== item)]);
  };
  useEffect(() => {
    const sum = cartCourses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.discountedPrice * currentValue.quantity;
    }, 0);
    setTotalPrice(sum);
  }, [cartCourses]);
  return (
    <div className="header-cart bg-white -dark-bg-dark-1 rounded-8">
      <div
        className="px-30 pt-30 pb-10"
        style={{ maxHeight: "300px", overflowY: "scroll" }}
      >
        {cartCourses.map((elm, i) => (
          <div key={i} className="row justify-between x-gap-40 pb-20">
            <Link
              style={{ textDecoration: "none" }}
              href={`/courses/${elm.id}`}
              className="col"
            >
              <div className="row x-gap-10 y-gap-10">
                <div className="col-auto">
                  <Image
                    width={80}
                    height={80}
                    src={elm.imageSrc}
                    alt="image"
                  />
                </div>

                <div className="col">
                  <div className="text-dark-1 lh-15">{elm.title}</div>

                  <div className="d-flex items-center mt-10">
                    {elm.paid ? (
                      <>
                        <div className="lh-12 fw-500 line-through text-light-1 mr-10">
                          ${elm.originalPrice}
                        </div>
                        <div className="text-18 lh-12 fw-500 text-dark-1">
                          ${elm.discountedPrice}
                        </div>
                      </>
                    ) : (
                      <>
                        <div></div>
                        <div className="text-18 lh-12 fw-500 text-dark-1">
                          Free
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>

            <div className="col-auto" onClick={() => handleRemoveCart(i)}>
              <button>
                <Image
                  width={12}
                  height={12}
                  src="/assets/img/menus/close.svg"
                  alt="icon"
                />
              </button>
            </div>
          </div>
        ))}
        {!cartCourses.length && (
          <div className="p-20 pb-30 text-18 text-dark-1">
            Your Course Cart Is Empty
          </div>
        )}
      </div>

      <div className="px-30 pt-20 pb-30 border-top-light">
        <div className="d-flex justify-between">
          <div className="text-18 lh-12 text-dark-1 fw-500">Total:</div>
          <div className="text-18 lh-12 text-dark-1 fw-500">${totalPrice}</div>
        </div>

        <div className="row x-gap-20 y-gap-10 pt-30">
          {cartCourses.length && (
            <>
              <Link
                href={"/course-cart"}
                style={{ textDecoration: "none" }}
                className="col-sm-6"
              >
                <button className="button py-20 -dark-1 text-white -dark-button-white col-12">
                  View Cart
                </button>
              </Link>
              <Link
                href={"/course-checkout"}
                style={{ textDecoration: "none" }}
                className="col-sm-6"
              >
                <button className="button py-20 -purple-1 text-white col-12">
                  Checkout
                </button>
              </Link>
            </>
          )}
          {!cartCourses.length && (
            <>
              <Link
                href={"/courses-list-1"}
                style={{ textDecoration: "none" }}
                className="col-12"
              >
                <button className="button py-20 -purple-1 text-white col-12">
                  Continue Buying
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCart;

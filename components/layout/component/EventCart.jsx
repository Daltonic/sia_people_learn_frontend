"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
const EventCart = () => {
  const { cartEvents, setCartEvents } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleRemoveCart = (index) => {
    const item = cartEvents[index];

    setCartEvents((pre) => [...pre.filter((elm) => elm !== item)]);
  };
  useEffect(() => {
    const sum = cartEvents.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
    setTotalPrice(sum);
  }, [cartEvents]);
  return (
    <div className="header-cart bg-white -dark-bg-dark-1 rounded-8">
      <div
        className="px-30 pt-30 pb-10"
        style={{ maxHeight: "300px", overflowY: "scroll" }}
      >
        {cartEvents.map((elm, i) => (
          <div key={i} className="row justify-between x-gap-40 pb-20">
            <Link
              style={{ textDecoration: "none" }}
              href={`/events/${elm.id}`}
              className="col"
            >
              <div className="row x-gap-10 y-gap-10">
                <div className="col-auto">
                  <Image width={80} height={80} src={elm.imgSrc} alt="image" />
                </div>

                <div className="col">
                  <div className="text-dark-1 lh-15">{elm.title}</div>

                  <div className="d-flex items-center mt-10">
                    <div className="lh-12 fw-500 line-through text-light-1 mr-10">
                      ${elm.preDiscount}
                    </div>
                    <div className="text-18 lh-12 fw-500 text-dark-1">
                      ${elm.price}
                    </div>
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

        {!cartEvents.length && (
          <div className="p-20 pb-30 text-18 text-dark-1">
            Your Event Cart Is Empty
          </div>
        )}
      </div>

      <div className="px-30 pt-20 pb-30 border-top-light">
        <div className="d-flex justify-between">
          <div className="text-18 lh-12 text-dark-1 fw-500">Total:</div>
          <div className="text-18 lh-12 text-dark-1 fw-500">${totalPrice}</div>
        </div>

        <div className="row x-gap-20 y-gap-10 pt-30">
          {cartEvents.length && (
            <>
              <Link
                href={"/event-cart"}
                style={{ textDecoration: "none" }}
                className="col-sm-6"
              >
                <button className="button py-20 -dark-1 text-white -dark-button-white col-12">
                  View Cart
                </button>
              </Link>
              <Link
                href={"/event-checkout"}
                style={{ textDecoration: "none" }}
                className="col-sm-6"
              >
                <button className="button py-20 -purple-1 text-white col-12">
                  Checkout
                </button>
              </Link>
            </>
          )}
          {!cartEvents.length && (
            <>
              <Link
                href={"/event-list-1"}
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

export default EventCart;

"use client";

import Image from "next/image";

import React, { useState } from "react";
import { pricingData } from "../../data/pricing";
import Link from "next/link";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsYearly(event.target.checked);
  };
  return (
    <section className="layout-pt-lg layout-pb-md">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Simple Pricing</h2>

              <p className="sectionTitle__text ">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>

            <div className="d-flex justify-center items-center pt-60 lg:pt-40">
              <div className="text-14 text-dark-1">Monthly</div>
              <div className="form-switch px-20">
                <div className="switch" data-switch=".js-switch-content">
                  <input
                    checked={isYearly}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                  />
                  <span className="switch__slider"></span>
                </div>
              </div>
              <div className="text-14 text-dark-1">
                Annually <span className="text-purple-1">Save 30%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-60 lg:pt-40">
          <div className="col-lg-4 col-md-6">
            <div className="priceCard -type-1 rounded-16 bg-white shadow-2">
              <div className="priceCard__content py-45 px-60 xl:px-40 text-center">
                <div className="priceCard__type text-18 lh-11 fw-500 text-dark-1">
                  {pricingData[0].type}
                </div>
                <div className="priceCard__price text-45 lh-11 fw-700 text-dark-1 mt-15">
                  {pricingData[0].price ? pricingData[0].price : "Free"}
                </div>
                <div className="priceCard__period">{pricingData[0].period}</div>
                <Image
                  width={90}
                  height={90}
                  className="mt-30"
                  src="/assets/img/pricing/1.svg"
                  alt="icon"
                />
                <div className="priceCard__text text-left pr-15 mt-40">
                  Standard listing submission, active for 30 dayss
                </div>

                <div className="text-left y-gap-15 mt-35">
                  {pricingData[0].features.map((elm, i) => (
                    <div key={i}>
                      <i
                        className="text-purple-1 fa fa-check pr-8"
                        style={{ strokeWidth: 2 }}
                        data-feather="check"
                      ></i>
                      {elm}
                    </div>
                  ))}
                </div>

                <div className="d-inline-block mt-30">
                  <Link
                    className="button px-40 py-20 fw-500 -purple-3 text-purple-1"
                    href="/courses-list-1"
                  >
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="priceCard -type-1 rounded-16 bg-white shadow-2">
              <div className="priceCard__content py-45 px-60 xl:px-40 text-center">
                <div className="priceCard__type text-18 lh-11 fw-500 text-dark-1">
                  {pricingData[1].type}
                </div>
                <div className="priceCard__price text-45 lh-11 fw-700 text-dark-1 mt-15">
                  $
                  {isYearly
                    ? (pricingData[1].price * 12 * 0.7).toFixed(2)
                    : pricingData[1].price}
                </div>
                <div className="priceCard__period">
                  {isYearly ? "per year" : pricingData[1].period}
                </div>
                <Image
                  width={90}
                  height={90}
                  className="mt-30"
                  src="/assets/img/pricing/2.svg"
                  alt="icon"
                />
                <div className="priceCard__text text-left pr-15 mt-40">
                  Standard listing submission, active for 30 dayss
                </div>

                <div className="text-left y-gap-15 mt-35">
                  {pricingData[1].features.map((elm, i) => (
                    <div key={i}>
                      <i
                        className="text-purple-1 fa fa-check pr-8"
                        style={{ strokeWidth: 2 }}
                        data-feather="check"
                      ></i>
                      {elm}
                    </div>
                  ))}
                </div>

                <div className="d-inline-block mt-30">
                  <Link
                    className="button px-40 py-20 fw-500 -purple-3 text-purple-1"
                    href="/courses-list-1"
                  >
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="priceCard -type-1 rounded-16 bg-white shadow-2">
              <div className="priceCard__content py-45 px-60 xl:px-40 text-center">
                <div className="priceCard__type text-18 lh-11 fw-500 text-dark-1">
                  {pricingData[2].type}
                </div>
                <div className="priceCard__price text-45 lh-11 fw-700 text-dark-1 mt-15">
                  $
                  {isYearly
                    ? (pricingData[2].price * 12 * 0.7).toFixed(2)
                    : pricingData[2].price}
                </div>
                <div className="priceCard__period">
                  {isYearly ? "per year" : pricingData[2].period}
                </div>
                <Image
                  width={90}
                  height={90}
                  className="mt-30"
                  src="/assets/img/pricing/3.svg"
                  alt="icon"
                />
                <div className="priceCard__text text-left pr-15 mt-40">
                  Standard listing submission, active for 30 dayss
                </div>

                <div className="text-left y-gap-15 mt-35">
                  {pricingData[2].features.map((elm, i) => (
                    <div key={i}>
                      <i
                        className="text-purple-1 fa fa-check pr-8"
                        style={{ strokeWidth: 2 }}
                        data-feather="check"
                      ></i>
                      {elm}
                    </div>
                  ))}
                </div>

                <div className="d-inline-block mt-30">
                  <Link
                    className="button px-40 py-20 fw-500 -purple-3 text-purple-1"
                    href="/courses-list-1"
                  >
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

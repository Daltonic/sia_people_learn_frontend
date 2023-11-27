"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function MyCourses() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="relative">
      <a
        href="#"
        className="d-flex items-center text-dark-1 ml-20"
        data-el-toggle=".js-courses-toggle"
        onClick={() => setIsActive((pre) => !pre)}
      >
        My Courses <i className="text-9 icon-chevron-down ml-10"></i>
      </a>

      <div
        className={`toggle-element js-courses-toggle ${
          isActive ? "-is-el-visible" : ""
        } `}
      >
        <div className="toggle-bottom -courses bg-white -dark-bg-dark-1 shadow-4 border-light rounded-8 mt-20">
          <div className="px-30 py-30">
            <div className="d-flex mb-20">
              <Image
                width={80}
                height={80}
                className="size-80 fit-cover"
                src="/assets/img/menus/cart/1.png"
                alt="image"
              />

              <div className="ml-15">
                <div className="text-dark-1 lh-15 fw-500">
                  Complete Python Bootcamp From Zero to Hero in Python
                </div>
                <div className="progress-bar mt-20">
                  <div className="progress-bar__bg bg-light-3"></div>
                  <div className="progress-bar__bar bg-purple-1 w-1/3"></div>
                </div>
              </div>
            </div>

            <div className="d-flex mb-20">
              <Image
                width={80}
                height={80}
                className="size-80 fit-cover"
                src="/assets/img/menus/cart/2.png"
                alt="image"
              />

              <div className="ml-15">
                <div className="text-dark-1 lh-15 fw-500">
                  The Ultimate Drawing Course Beginner to Advanced
                </div>
                <div className="progress-bar mt-20">
                  <div className="progress-bar__bg bg-light-3"></div>
                  <div className="progress-bar__bar bg-purple-1 w-1/3"></div>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <a
                href="#"
                className="button py-20 -dark-1 text-white -dark-bg-purple-1 -dark-border-dark-2 col-12"
              >
                Go to My Learning
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

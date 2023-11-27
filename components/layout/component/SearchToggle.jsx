"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
const SearchToggle = ({ allClasses, color }) => {
  const [activeSearch, setActiveSearch] = useState(false);
  return (
    <>
      <div className={allClasses ? allClasses : ""}>
        <button
          onClick={() => setActiveSearch((pre) => !pre)}
          className={`d-flex items-center ${color ? color : "text-white"} `}
          data-el-toggle=".js-search-toggle"
        >
          <i className="text-20 icon icon-search"></i>
        </button>

        <div
          className={`toggle-element js-search-toggle ${
            activeSearch ? "-is-el-visible" : ""
          }`}
        >
          <div
            className="header-search pt-90 bg-white shadow-4 "
            style={{ height: "650px" }}
          >
            <div className="container">
              <div className="header-search__field">
                <div className="icon icon-search text-dark-1"></div>
                <input
                  required
                  type="text"
                  className="col-12 text-18 lh-12 text-dark-1 fw-500"
                  placeholder="What do you want to learn?"
                />

                <button
                  onClick={() => setActiveSearch(false)}
                  className="d-flex items-center justify-center size-40 rounded-full bg-purple-3"
                  data-el-toggle=".js-search-toggle"
                >
                  <Image
                    width={12}
                    height={12}
                    src="/assets/img/menus/close.svg"
                    alt="icon"
                  />
                </button>
              </div>

              <div className="header-search__content mt-30">
                <div className="text-17 text-dark-1 fw-500">
                  Popular Right Now
                </div>

                <div className="d-flex y-gap-5 flex-column mt-20">
                  <Link href={`/courses/${5}`} className="text-dark-1">
                    The Ultimate Drawing Course - Beginner to Advanced
                  </Link>
                  <Link href="/courses-single-2/3" className="text-dark-1">
                    Character Art School: Complete Character Drawing Course
                  </Link>
                  <Link href="/courses-single-3/3" className="text-dark-1">
                    Complete Blender Creator: Learn 3D Modelling for Beginners
                  </Link>
                  <Link href="/courses-single-4/3" className="text-dark-1">
                    User Experience Design Essentials - Adobe XD UI UX Design
                  </Link>
                  <Link href="/courses-single-5/3" className="text-dark-1">
                    Graphic Design Masterclass - Learn GREAT Design
                  </Link>
                  <Link href="/courses-single-6/3" className="text-dark-1">
                    Adobe Photoshop CC – Essentials Training Course
                  </Link>
                </div>

                <div className="mt-30">
                  <button className="uppercase underline">
                    PRESS ENTER TO SEE ALL SEARCH RESULTS
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="header-search__bg"
            data-el-toggle=".js-search-toggle"
          ></div>
        </div>
      </div>
    </>
  );
};

export default SearchToggle;

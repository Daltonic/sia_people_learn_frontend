"use client";
import React from "react";
import Links from "../component/Links";
import Socials from "@/components/common/Socials";
import FooterLinksTwo from "../component/FooterLinksTwo";
import Image from "next/image";
export default function FooterTwo() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <footer className="footer -type-4 bg-dark-2">
      <div className="container">
        <div className="row y-gap-30 justify-between pt-60">
          <div className="col-lg-7 col-md-6">
            <div className="text-17 fw-500 text-white uppercase mb-25">
              GET IN TOUCH
            </div>
            <form
              onSubmit={handleSubmit}
              className="form-single-field -base mt-15"
            >
              <input
                required
                className="py-20 px-30 bg-dark-6 rounded-200 text-white"
                type="text"
                placeholder="Your Email"
              />
              <button className="button -white rounded-full" type="submit">
                <i className="icon-arrow-right text-24 text-dark-1"></i>
              </button>
            </form>
          </div>

          <div className="col-xl-4 col-lg-5 col-md-6">
            <div className="footer-header__logo">
              <Image
                width={140}
                height={50}
                src="/assets/img/footer/footer-logo.svg"
                alt="logo"
              />
            </div>

            <div className="d-flex justify-between mt-30">
              <div className="">
                <div className="text-white opac-70">
                  Toll Free Customer Care
                </div>
                <div className="text-18 lh-1 fw-500 text-white mt-5">
                  +(1) 123 456 7890
                </div>
              </div>
              <div className="">
                <div className="text-white opac-70">Need live support?</div>
                <div className="text-18 lh-1 fw-500 text-white mt-5">
                  hi@educrat.comv
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-60 pb-60">
          <div className="col-lg-7 col-md-6">
            <div className="row y-gap-30">
              <FooterLinksTwo
                allClasses={"text-17 fw-500 text-white uppercase mb-25"}
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-5 col-md-6">
            <div className="">
              <div className="text-17 uppercase text-white fw-500">
                Take your learning with you
              </div>

              <div className="d-flex mt-15">
                <div className="d-flex items-center rounded-8 px-25 py-10 footer-bg-color">
                  <div className="icon-apple text-white text-24"></div>
                  <div className="text-white ml-20">
                    <div className="text-13 lh-12">Download on the</div>
                    <div className="text-15 fw-500 lh-12 mt-3">Apple Store</div>
                  </div>
                </div>

                <div className="d-flex items-center rounded-8 px-25 py-10 footer-bg-color ml-10">
                  <div className="icon-play-market text-white text-24"></div>
                  <div className="text-white ml-20">
                    <div className="text-13 lh-12">Get in on</div>
                    <div className="text-15 fw-500 lh-12 mt-3">Google Play</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-header-socials mt-60">
              <div className="text-17 uppercase text-white fw-500">
                Follow us on social media
              </div>
              <div className="footer-header-socials__list d-flex items-center mt-15">
                <Socials
                  componentsClass={
                    "size-40 d-flex justify-center items-center text-white"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-30 border-top-light-15">
          <div className="row justify-between items-center y-gap-20">
            <div className="col-auto">
              <div className="d-flex items-center h-100 text-white">
                © {new Date().getFullYear()} Educrat. All Right Reserved.
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
                <div>
                  <div className="d-flex x-gap-15 text-white">
                    <Links />
                  </div>
                </div>

                <div>
                  <a
                    href="#"
                    className="button px-30 h-50 -dark-6 rounded-200 text-white"
                  >
                    <i className="icon-worldwide text-20 mr-15"></i>
                    <span className="text-15">English</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

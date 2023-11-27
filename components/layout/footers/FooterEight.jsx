import React from "react";
import Image from "next/image";
import Socials from "@/components/common/Socials";

import Links from "../component/Links";
import FooterLinksFour from "../component/FooterLinksFour";
export default function FooterEight() {
  return (
    <footer className="footer -type-5 pt-60 bg-dark-2">
      <div className="container">
        <div className="row y-gap-30 pb-60">
          <div className="col-xl-4 col-lg-5 col-md-6">
            <div className="footer-header__logo">
              <Image
                width={140}
                height={50}
                src="/assets/img/footer/footer-logo.svg"
                alt="logo"
              />
            </div>

            <div className="mt-30">
              <div className="text-17 text-white">Call Us</div>
              <div className="text-17 lh-1 fw-500 text-white mt-5">
                800 388 80 90
              </div>
            </div>

            <div className="mt-30 pr-20">
              <div className="lh-17 text-white">
                329 Queensberry Street, North Melbourne VIC 3051, Australia.
                hi@educrat.com
              </div>
            </div>

            <div className="footer-header-socials mt-30">
              <div className="footer-header-socials__list d-flex items-center text-white">
                <Socials
                  componentsClass={"size-40 d-flex justify-center items-center"}
                />
              </div>
            </div>
          </div>

          <FooterLinksFour
            allClasses={"text-17 fw-500 text-white uppercase mb-25"}
          />
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

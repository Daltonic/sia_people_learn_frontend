"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { footerData2, footerData3 } from "@/data/footer";
import SocialMediaIcons from "@/components/reusableComponents/SocialMediaIcons";

const Footer: React.FC = () => {
  return (
    <div className="px-5 sm:px-10 py-10 mt-10 md:mt-0">
      <div className="flex flex-col md:items-center border-b border-[#EDEDED] w-full pb-8">
        <section className="flex flex-col md:flex-row gap-8 justify-between w-[80%] flex-1">
          <div className="">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  width={35}
                  height={35}
                  src="/images/general/logoImg.svg"
                  alt="logo"
                />
              </Link>
              <p className="text-[#321463] font-semibold text-lg md:text-md md:font-medium">
                Dapp Mentors
              </p>
            </div>
            <p className="text-[#4F547B] md:text-sm mt-2">
              Connect with us through the <br /> followings.
            </p>
            <SocialMediaIcons />
          </div>
          <div>
            <h1 className="text-[#321463] text-lg font-semibold md:text-sm mb-3 md:mb-4 md:font-medium">
              ABOUT
            </h1>
            <div className="space-y-2 text-[#4F547B] text-sm ">
              <p className="hover:text-[#C5165D]">
                <Link href="/about">About Us</Link>
              </p>
              <p className="hover:text-[#C5165D]">
                <Link href="contact">Contact Us</Link>
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-[#321463] text-lg font-semibold md:text-sm mb-3 md:mb-4 md:font-medium">
              OTHER
            </h1>
            <div className="space-y-2 text-[#4F547B] text-sm ">
              <p className="hover:text-[#C5165D]">
                <Link href="/pricing">Pricing</Link>
              </p>
              <p className="hover:text-[#C5165D]">
                <Link href="/helpCenter">Help Center</Link>
              </p>
              <p className="hover:text-[#C5165D]">
                <Link href="/terms">Terms</Link>
              </p>
             
            </div>
          </div>
          <div>
            <h1 className="text-[#321463] text-lg font-semibold md:text-sm mb-3 md:mb-4 md:font-medium">
              USEFUL LINKS
            </h1>
            <div className="space-y-2 text-[#4F547B] text-sm ">
            <p className="hover:text-[#C5165D]">
                <Link href="/instructor">Instructor</Link>
              </p>
              <p className="hover:text-[#C5165D]">
                <Link href="/becomeinstructor">Become Instructor</Link>
              </p>
            </div>
          </div>
          <div className="md:mt-8">
            {footerData2.map((elm, i: number) => (
              <Link href={elm.link} key={i} className="flex items-center gap-2 md:gap-1 mt-2">
                <Image
                  width={16}
                  height={16}
                  src={elm.imageSrc}
                  alt="Academy"
                  className="w-6 md:w-4"
                />
                <p className="text-[#4F547B] md:text-sm"> {elm.title}</p>
              </Link>
            ))}
          </div>
          <div>
            <h1 className="text-[#321463] text-lg font-semibold md:text-sm mb-3 md:mb-4 md:font-medium">
              {" "}
              RESOURCES
            </h1>
            {footerData3.map((elm, i: number) => (
              <div key={i}>
                <Link href={elm.link} className="flex items-center gap-2 md:gap-1 mt-2">
                  <Image
                    width={16}
                    height={16}
                    src={elm.imageSrc}
                    alt="Academy"
                    className="w-6 md:w-4"
                  />
                  <p className="text-[#4F547B] md:text-sm"> {elm.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="md:pl-28 md:flex justify-between text-sm text-[#4F547B] md:px-10 mt-8">
        <p>© 2023 Dapp Mentors. All Right Reserved.</p>
        <p className="mt-2 md:mt-0">Supported by a Sia Foundation grant.</p>
      </div>
    </div>
  );
};

export default Footer;

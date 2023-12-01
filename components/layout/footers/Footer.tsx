"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { footerData1, footerData2, footerData3 } from "@/data/footer";
import Socials from "./Socials";

const Footer: React.FC = () => {
  return (
    <div className="px-10 py-10">
      <div className="flex flex-col items-center border-b border-[#EDEDED] w-full pb-8">
        <section className="flex justify-between w-[80%] flex-1">
          <div className="">
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  width={35}
                  height={35}
                  src="/images/logoImg.svg"
                  alt="logo"
                />
              </Link>
              <p className="text-[#321463] text-md font-medium">Dapp Mentors</p>
            </div>
            <p className="text-[#4F547B] text-xs">
              Connect with us through  the <br /> followings.
            </p>
            <div className="flex items-center">
                <Socials
                  componentsClass={
                    'flex justify-center items-center '
                  }
                />
              </div>
          </div>
          <div>
            <h1 className="text-[#321463] text-sm mb-4 font-medium">ABOUT</h1>
            <p className="text-[#4F547B] text-xs mb-2">About Us</p>
            <p className="text-[#4F547B] text-xs">Contact Us</p>
          </div>
          <div>
            <h1 className="text-[#321463] text-sm mb-4 font-medium">
              USEFUL LINKS
            </h1>
            {footerData1.map((elm, i) => (
              <div>
                <div className="flex items-center gap-1 mt-2">
                  <Image
                    width={16}
                    height={16}
                    src={elm.imageSrc}
                    alt="Academy"
                  />
                  <p className="text-[#4F547B] text-xs"> {elm.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            {footerData2.map((elm, i) => (
              <div className="flex items-center gap-1 mt-2">
                <Image
                  width={16}
                  height={16}
                  src={elm.imageSrc}
                  alt="Academy"
                />
                <p className="text-[#4F547B] text-xs"> {elm.title}</p>
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-[#321463] text-sm mb-4 font-medium">
              {" "}
              OTHER RESOURCES
            </h1>
            {footerData3.map((elm, i) => (
              <div>
                <div className="flex items-center gap-1 mt-2">
                  <Image
                    width={16}
                    height={16}
                    src={elm.imageSrc}
                    alt="Academy"
                  />
                  <p className="text-[#4F547B] text-xs"> {elm.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
       
      </div>
      <p className="text-[#4F547B] text-xs pl-28 mt-8">© 2023 Dapp Mentors. All Right Reserved.</p>
    </div>
  );
};

export default Footer;

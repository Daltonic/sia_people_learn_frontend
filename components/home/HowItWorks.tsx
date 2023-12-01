import React from "react";
import { stepsTwo } from "@/data/steps";
import Image from "next/image";

const HowItWorks = () => {
  return (
    <section className="my-16 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-[#321463] font-bold text-2xl">How it works?</h2>

        <p className="text-[#4F547B] text-xs">Follow this simple steps</p>
      </div>

      <div className="flex items-center pt-10" >
        {stepsTwo.map((elm, i) => (
          <>
            <div key={i} className="flex flex-col items-center text-center w-1/3">
              <div className="relative w-20 h-20 flex justify-center items-center rounded-full bg-[#F9F9F9]">
                <Image width={35} height={35} src={elm.imageSrc} alt="image" />
                <div className="absolute top-0 w-6 h-6 rounded-full left-0 bg-[#1A064F]">
                  <p className="text-sm font-medium text-white">{elm.id}</p>
                </div>
              </div>
              <div className="text-sm font-medium mt-6 capitalize text-[#1A064F]">
                {elm.text}
              </div>
            </div>

            {i == 0 && (
              <div className="">
                <Image
                  width={142}
                  height={21}
                  src="/images/home/works/lines/1.svg"
                  alt="icon"
                />
              </div>
            )}
            {i == 1 && (
              <div className="">
                <Image
                  width={142}
                  height={21}
                  src="/images/home/works/lines/2.svg"
                  alt="icon"
                />
              </div>
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

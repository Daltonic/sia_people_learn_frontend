import Button from "@/components/reusableComponents/Button";
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  const backgroundImageUrl = "/images/home/heroImg.svg";

  const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: "top",
  };
  return (
    <section
      style={divStyle}
      className="max-h-[48vh] sm:max-h-[64vh] border-2 md:max-h-[78vh] md:mx-10 lg:mx-20 md:rounded-2xl bg-cover"
      data-bg="images/heroImage.svg"
    >
      <div className="md:ml-56 ml-5 py-10 md:py-20 pr-5 md:pr-0 md:w-1/3">
        <p className="text-white text-xs md:text-md">Innovate with Web3.</p>
        <h1 className="font-semibold text-2xl md:text-[48px] text-white mt-2 md:mt-8 md:leading-[45px]">
          Start Your Blockchain Learning Odyssey Free & Premium.
        </h1>
        <div className="flex justify-between md:justify-start gap-4 mt-2 md:mt-8">
          <div className="">
           <Link href="/courses">
            <Button variant="pink">Explore Courses</Button>
            </Link>
          </div>
          <div className="">
           <Link href="/contact">
            <Button variant="whiteoutline">Hire Us</Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

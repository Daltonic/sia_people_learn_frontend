import Button from "@/components/ReusableComponents/Button";
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
      className="max-h-[40vh] md:max-h-[73vh] md:mx-10 md:rounded-2xl bg-cover"
      data-bg="images/heroImage.svg"
    >
      <div className="md:ml-56 ml-5 py-10 md:py-20 w-3/4 md:w-1/3">
        <p className="text-white text-xs md:text-md">Innovate with Web3.</p>
        <h1 className="font-semibold text-2xl md:text-[45px] text-white mt-2 md:mt-8 md:leading-[42px]">
          Start Your Blockchain Learning Odyssey Free & Premium.
        </h1>
        <div className="flex gap-4 mt-2 md:mt-8">
          <div className="">
           <Link href="/explore">
            <Button variant="pink">Explore Courses</Button>
            </Link>
          </div>
          <div className="">
           <Link href="/hireUs">
            <Button variant="whiteoutline">Hire Us</Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

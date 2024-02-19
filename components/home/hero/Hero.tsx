import Button from "@/components/reusableComponents/Button";
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  const backgroundImageUrl = "/images/general/heroTwo.jpg";

  const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: "center",
  };
  return (
    <section
      style={divStyle}
      className="max-h-[48vh] md:max-h-[100vh] md:mx-10 lg:mx-20 bg-cover md:rounded-2xl overflow-hidden"
      data-bg="images/general/heroImage.svg"
    >
      <div className="bg-purple-900/20">
      <div className="ml-5 sm:ml-10 py-10 md:py-20 pr-5 md:pr-0 sm:w-4/5 md:w-[35%]">
        <p className="text-white text-xs sm:text-md"> Unlock the Potential of Web3.</p>
        <h1 className="font-medium text-2xl sm:text-4xl md:text-5xl text-white mt-2 sm:mt-6 md:mt-8 sm:leading-[50px]">
        Embark on Your Blockchain Education Journey with Dapp Mentors
        </h1>
        <div className="flex justify-between sm:justify-start gap-4 mt-2 sm:mt-6 md:mt-8">
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
      </div>
    </section>
  );
};

export default Hero;

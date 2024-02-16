import React from "react";
import Button from "../reusableComponents/Button";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";

const LearnNewSkill: React.FC = ({}) => {
  const backgroundImageUrl = "/images/instructors/instructor1.svg";

  const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: "top",
  };
  return (
    <div className="flex flex-col items-center pt-10 px-5 sm:px-10 md:p-20">
      <div className="hidden md:flex justify-between">
        <div className="w-[45%]">
          <h1 className="text-violet-950 text-5xl font-bold md:text-4xl">
            <span className="text-pink-700">  Master New</span>
            <span className="text-violet-950 ml-2">
             Skills on Your Own Terms with Dapp Mentors
            </span>
          </h1>
          <p className="text-violet-950 text-base leading-7 self-stretch my-3 max-md:max-w-full">
          Empower your learning journey with Dapp Mentors, master new skills at your own pace, and unlock your full potential.
          </p>
          <Link href="/courses">
            <Button variant="pink">Join Free</Button>
          </Link>
        </div>
        <div>
          <div
            style={divStyle}
            className="h-80 border w-80 rounded-xl bg-cover relative"
          >
            <div className="bg-black text-white absolute -left-40 top-28 w-54 p-5 rounded-lg space-y-4 h-46">
              <div className="flex gap-2 items-center">
                <div className="bg-[#C5165D] rounded-full text-[10px] p-1 text-white">
                  <FaCheck />
                </div>
                <p className="text-xs">Expert-led learning experiences</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-[#C5165D] rounded-full text-[10px] p-1 text-white">
                  <FaCheck />
                </div>
                <p className="text-xs">Structured learning paths</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-[#C5165D] rounded-full text-[10px] p-1 text-white">
                  <FaCheck />
                </div>
                <p className="text-xs">Accessible education</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-[#C5165D] rounded-full text-[10px] p-1 text-white">
                  <FaCheck />
                </div>
                <p className="text-xs">Risk-free learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between md:w-4/5 md:mt-16">
        <Image
          src="/images/instructors/instructor3.svg"
          alt=""
          width={100}
          height={100}
          className="md:h-full object-cover w-full md:w-[40%] rounded-lg mb-5 md:mb-0"
        />

        <div className="md:w-[45%] ">
          <h1 className="text-violet-950 text-2xl font-bold">
            Become an Instructor
          </h1>
          <p className="text-violet-950 text-base my-4">
          Embrace the opportunity to influence, inspire, and grow alongside them in the exciting world of Blockchain and Web3 Development.
          </p>
          <Link href="/becomeinstructor">
            <Button variant="pinkoutline">Apply Now</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col-reverse mb-16 md:mb-0 md:flex-row items-center justify-between md:w-4/5 mt-10 gap-5 md:gap-0 md:mt-16">
        <div className="md:w-[45%] ">
          <h1 className="text-violet-950 text-2xl font-bold">
            Become a Student
          </h1>
          <p className="text-violet-950 text-base my-4">
          Join Dapp Mentors Today! Start Your Journey Towards Mastering Blockchain and Web3 Development.
          </p>
          <Link href="/signup">
            <Button variant="pinkoutline">Apply Now</Button>
          </Link>
        </div>
        <Image
          src="/images/instructors/user.png"
          alt=""
          width={100}
          height={100}
          className="md:h-full object-cover w-full md:w-[40%] rounded-lg"
        />
      </div>
    </div>
  );
};

export default LearnNewSkill;

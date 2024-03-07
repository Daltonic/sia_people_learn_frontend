import Image from "next/image";
import Button from "../reusableComponents/Button";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div>
      <div className="text-center w-full md:mb-16 p-5 bg-[#F9F9F9] h-56 sm:h-64 md:h-96 flex flex-col justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#321463]">
          About Us
        </h1>
        <p className="text-md mt-3 capitalize w-full text-[#4F547B]">
          We are on a mission to deliver engaging, curated courses at a
          reasonable price.
        </p>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-col md:flex-row justify-between md:my-16 px-5 sm:px-10 py-10 md:px-20">
          <div className="flex w-full md:w-[45%] items-start gap-5">
            <Image
              src="/images/courseCard/card1.svg"
              alt=""
              width={100}
              height={100}
              className="h-full object-cover w-1/2"
            />
            <div className="w-1/2 h-full flex flex-col gap-5">
              <Image
                className="h-full object-cover w-full"
                src="/images/courseCard/card2.svg"
                width={150}
                height={200}
                alt=""
              />
              <Image
                className="h-full object-cover w-full"
                src="/images/courseCard/card3.svg"
                width={150}
                height={200}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col md:px-5 md:w-[45%] mt-10 md:mt-0">
            <h1 className="text-violet-950 text-3xl font-bold leading-10">
              Unleash Your Potential with Our Experts in Blockchain and Web3
              Development.
            </h1>
            <p className="text-violet-950 text-base mt-3">
              Unleash your potential in blockchain and Web3 development with
              People Learn! Embark on your learning journey today and immerse
              yourself in our comprehensive Blockchain and Web3 Development
              Courses and Materials.
            </p>
            <p className="text-slate-600 text-base my-5">
              Join our vibrant community of learners and let us guide you
              through the complex landscape of Blockchain and Web3 technology.
              Take the leap towards a brighter future with us today. Don&apos;t wait,
              start your journey with People Learn now!
            </p>
            <Link href="/courses">
              <Button
                variant="pink"
                style={{ width: "16rem", padding: "10px" }}
              >
                Start Learning For Free{" "}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

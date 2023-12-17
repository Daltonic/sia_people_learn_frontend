"use client";
import Button from "@/components/ReusableComponents/Button";
import InputField from "@/components/ReusableComponents/InputField";
import AuthNavbar from "@/components/layout/headers/AuthNavbar";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Page: NextPage = () => {
  return (
    <div className="md:flex md:h-screen">
      <div className="bg-[#321463] h-[30vh] md:h-full w-full md:w-1/3 py-5 px-10 flex flex-col">
        <Link href="/">
          <div className="hidden md:flex items-center gap-2 cursor-pointer">
            <Image
              width={35}
              height={35}
              src="/images/logoImg.svg"
              alt="logo"
            />
            <p className="text-white text-md">Dapp Mentors</p>
          </div>
        </Link>
        <div className="flex justify-center items-center flex-1 border">
          <Image
            width={400}
            height={400}
            src="/images/login/images-bg.svg"
            alt=""
          />
        </div>
      </div>
      <div className="flex-1 bg-[#F9F9F9] overflow-scroll">
        <AuthNavbar />
        <div className="flex justify-center items-center w-full h-full">
          <form
            action=""
            className="bg-white p-5 md:p-10 w-full md:w-4/5 rounded-md "
            // onSubmit={handleSubmit}
          >
            <h3 className="font-medium text-3xl text-[#321463]">Sign Up</h3>
            <p className="text-sm text-[#4F547B] mt-1">
              Already have an account?
              <Link href="/login" className="text-[#C5165D] ml-2">
                Log in
              </Link>
            </p>
            <div className="md:flex gap-2">
              <InputField
                label="Fullname"
                name="fullname"
                placeholder="John Doe"
                required
                inputType="text"
              />
              <InputField
                label="Email"
                name="email"
                placeholder="youremail@domain.com"
                required
                inputType="email"
              />
            </div>

            <div className="md:flex gap-2">
              <InputField
                label="Password"
                name="password"
                placeholder="********"
                required
                inputType="number"
              />

              <InputField
                label="Confirm Password"
                name="confirmpassword"
                placeholder="********"
                required
                inputType="number"
              />
            </div>

            <div className="md:flex justify-between">
              <div className="flex gap-2">
                <input type="checkbox" name="" id="" />
                <p className="text-sm text-[#4F547B]">
                  Accept the Terms and Privacy Policy
                </p>
              </div>
              <div>
                <p className="text-sm text-[#C5165D] underline">
                  Forgot your password?{" "}
                </p>
              </div>
            </div>
            <Button
              variant="pink"
              className=""
              style={{ width: "100%", marginTop: "14px", padding: "16px" }}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

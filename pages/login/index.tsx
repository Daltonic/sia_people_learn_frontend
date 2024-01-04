"use client";
import { NextPage } from "next";
import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import AuthLayout from "@/components/layout/authLayout/AuthenticationLayout";
import Link from "next/link";

const LoginPage: NextPage = () => {
  return (
    <AuthLayout>
      <div className="flex justify-center items-center md:mt-16">
      <form
        action=""
        className="bg-white p-5 md:p-10 w-full md:w-[60%] rounded-md "
        // onSubmit={handleSubmit}
      >
        <h3 className="font-medium text-3xl text-[#321463]">Login</h3>
        <p className="md:text-sm text-[#4F547B] mt-1">
          Do not have an account yet?
          <Link href="/signup" className="text-[#C5165D] ml-2">
            Sign up for free
          </Link>
        </p>
        <InputField
          label="Email"
          name="email"
          placeholder="youremail@domain.com"
          required
          inputType="email"
        />
        <InputField
          label="Password"
          name="password"
          placeholder="********"
          required
          inputType="number"
        />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <input type="checkbox" name="" id="" />
            <p className="md:text-sm text-[#C5165D]">Remember me</p>
          </div>
          <div>
            <p className="md:text-sm text-[#C5165D] underline">
              Forgot your password?{" "}
            </p>
          </div>
        </div>
        <Button
          variant="pink"
          className=""
          style={{ width: "100%", marginTop: "14px", padding: "16px" }}
        >
          Login
        </Button>
        <p className="font-medium text-md text-[#321463] text-center mt-2">
          Or sign in using
        </p>
        <div className="flex flex-col md:flex-row items-center md:items-end gap-2 mt-2 space-y-2">
          <Button
            variant="whiteoutline"
            type="submit"
            name="submit"
            id="submit"
            className="justify-center flex items-center md:justify-between gap-2 md:gap-0 text-lg md:text-base border border-[#1967D2] text-[#1967D2] w-64 md:w-full"
          >
            <FaFacebookF className="mr-2 md:mr-0 border text-xl" />
            Login via Facebook
          </Button>
          <Button
            variant="whiteoutline"
            type="submit"
            name="submit"
            id="submit"
            className="justify-center flex items-center md:justify-between gap-2 md:gap-0 text-lg md:text-base border border-[#D93025] text-[#D93025] w-64 md:w-full"
          >
            <FaGoogle className="mr-2 md:mr-0 border text-xl" />
            Login via Google+
          </Button>
        </div>
      </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

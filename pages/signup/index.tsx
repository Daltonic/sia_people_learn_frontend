"use client";
import { NextPage } from "next";
import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import AuthLayout from "@/components/layout/AuthLayout/AuthenticationLayout";
import Link from "next/link";

const LoginPage: NextPage = () => {
  return (
    <AuthLayout>
         <div className="flex justify-center items-center w-full h-full md:mt-16">
          <form
            action=""
            className="bg-white p-5 md:p-10 w-full md:w-4/5 rounded-md "
            // onSubmit={handleSubmit}
          >
            <h3 className="font-medium text-3xl text-[#321463]">Sign Up</h3>
            <p className="md:text-sm text-[#4F547B] mt-1">
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
                <p className="md:text-sm text-[#4F547B]">
                  Accept the Terms and Privacy Policy
                </p>
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
              Register
            </Button>
          </form>
        </div>
    </AuthLayout>
  );
};

export default LoginPage;

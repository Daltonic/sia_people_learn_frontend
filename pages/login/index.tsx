"use client";
import { NextPage } from "next";
import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import AuthLayout from "@/components/layout/authLayout/AuthenticationLayout";
import Link from "next/link";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: NextPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { email, password } = loginDetails;

    const userDetails = {
      email,
      password,
    };

    try {
      const requestDetails = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/sessions/login`,
        requestDetails
      );

      if (response.status === 400) {
        alert("Something went wrong");
      }

      const { user, accessToken, refreshToken } = await response.json();
      console.log(user, accessToken, refreshToken);
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      router.push("/");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSubmitting(false);
      setLoginDetails({
        email: "",
        password: "",
      });
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    console.log("google login");
    try {
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/sessions/login/google`,
        requestDetails
      );

      if (response.status === 400) {
        alert("Something went wrong");
      }

      if (response.status === 200) {
        const { user, accessToken, refreshToken } = await response.json();
        console.log(user, accessToken, refreshToken);
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        router.push("/");
      }
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex-col justify-center items-center md:mt-16">
        <form
          className="bg-white p-5 sm:p-10 w-full md:w-[60%] rounded-md "
          onSubmit={handleSubmit}
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
            handleChange={handleChange}
            value={loginDetails.email}
          />
          <InputField
            label="Password"
            name="password"
            placeholder="********"
            required
            inputType="text"
            handleChange={handleChange}
            value={loginDetails.password}
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
            {submitting ? "Logging in" : "Login"}
          </Button>
        </form>
        <p className="font-medium text-md text-[#321463] text-center mt-2">
          Or sign in using
        </p>
        <div className="flex flex-col md:flex-row items-center md:items-end gap-2 mt-2 space-y-2">
          <a
            href={`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/sessions/login/google`}
            onClick={handleGoogleLogin}
            target="_blank"
          >
            <Button
              variant="redoutline"
              type="submit"
              name="submit"
              id="submit"
              className="justify-center flex items-center md:justify-between gap-2 md:gap-0 text-lg md:text-base w-64 sm:w-full"
              // onClick={handleGoogleLogin}
            >
              <FaGoogle className="mr-2 md:mr-0 text-xl" />
              Login via Google+
            </Button>
          </a>

          <Button
            variant="blueoutline"
            type="submit"
            name="submit"
            id="submit"
            className="justify-center flex items-center md:justify-between gap-2 md:gap-0 text-lg md:text-base w-64 sm:w-full"
          >
            <FaFacebookF className="mr-2 md:mr-0 text-xl" />
            Login via Github
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

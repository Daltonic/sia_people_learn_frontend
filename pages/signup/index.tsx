"use client";
import { NextPage } from "next";
import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import AuthLayout from "@/components/layout/authLayout/AuthenticationLayout";
import Link from "next/link";
import { ChangeEvent, SyntheticEvent, useState } from "react";

const LoginPage: NextPage = () => {
  const [signupDetails, setSignupDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  // todo: a function to validate that password and confirm password are same

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { firstname, lastname, email, password, confirmPassword } =
      signupDetails;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }

    const userDetails = {
      firstName: firstname,
      lastName: lastname,
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
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/users/register`,
        requestDetails
      );

      if (response.status === 400) {
        alert("Something went wrong");
      }

      const { msg } = await response.json();
      alert(msg);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSubmitting(false);
      setSignupDetails({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <AuthLayout>
      <div className="flex justify-center items-center w-full h-full md:mt-16">
        <form
          className="bg-white p-5 md:p-10 w-full md:w-4/5 rounded-md "
          onSubmit={handleSubmit}
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
              label="Firstname"
              name="firstname"
              placeholder="John Doe"
              required
              inputType="text"
              handleChange={handleChange}
              value={signupDetails.firstname}
            />
            <InputField
              label="Lastname"
              name="lastname"
              placeholder="John Doe"
              required
              inputType="text"
              handleChange={handleChange}
              value={signupDetails.lastname}
            />
            <InputField
              label="Email"
              name="email"
              placeholder="youremail@domain.com"
              required
              inputType="email"
              handleChange={handleChange}
              value={signupDetails.email}
            />
          </div>

          <div className="md:flex gap-2">
            <InputField
              label="Password"
              name="password"
              placeholder="********"
              required
              inputType="text"
              handleChange={handleChange}
              value={signupDetails.password}
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              placeholder="********"
              required
              inputType="text"
              handleChange={handleChange}
              value={signupDetails.confirmPassword}
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
            disabled={
              signupDetails.firstname === "" ||
              signupDetails.lastname === "" ||
              signupDetails.email === "" ||
              signupDetails.password === "" ||
              signupDetails.confirmPassword === "" ||
              submitting
            }
          >
            {submitting ? "Registering" : "Register"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

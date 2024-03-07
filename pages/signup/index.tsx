"use client";
import { NextPage } from "next";
import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import AuthLayout from "@/components/layout/authLayout/AuthenticationLayout";
import Link from "next/link";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";
import { createAccount } from "@/services/backend.services";

const SignPage: NextPage = () => {
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
      setSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setSubmitting(false);
      alert("Password must be atleast 8 characters");
      return;
    }

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await createAccount({
          firstName: firstname,
          lastName: lastname,
          email,
          password,
        });
        if (status === 201) {
          afterAccountCreation();
          resolve();
        } else {
          afterAccountCreation();
          reject();
        }
      }),
      {
        pending: "Creating your account...",
        success:
          "Account successfully created 👌\nCheck your email to verify your account",
        error: "Encountered error 🤯",
      }
    );
  };

  const afterAccountCreation = () => {
    setSubmitting(false);
    setSignupDetails({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
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
              Login
            </Link>
          </p>
          <div className="md:flex gap-2 items-center">
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
          </div>
          <InputField
            label="Email"
            name="email"
            placeholder="youremail@domain.com"
            required
            inputType="email"
            handleChange={handleChange}
            value={signupDetails.email}
          />
          <div className="md:flex gap-2 items-center">
            <InputField
              label="Password"
              name="password"
              placeholder="********"
              required
              inputType="password"
              handleChange={handleChange}
              value={signupDetails.password}
              isPassword
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              placeholder="********"
              required
              inputType="password"
              handleChange={handleChange}
              value={signupDetails.confirmPassword}
              isPassword
            />
          </div>

          <div className="flex gap-2 my-2">
            <input type="checkbox" name="" id="" />
            <p className="md:text-sm text-[#4F547B]">
              Accept the Terms and Privacy Policy
            </p>
          </div>
          <Button
            variant="pink"
            className="w-full mt-4"
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

export default SignPage
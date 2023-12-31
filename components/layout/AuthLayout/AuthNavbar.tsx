import React from "react";
import Link from "next/link";
import Button from "@/components/reusableComponents/Button";

const AuthNavbar: React.FC = ({}) => {
  return (
    <div className="px-5 md:px-10 py-5 h-20 w-full hidden md:flex justify-end items-center">
      <ul className=" hidden md:flex items-center text-[#321463] text-md gap-5">
        <li className="text-[15px]">
          <Link data-barba href="/home" className={"/home"}>
            Home
          </Link>
        </li>

        <li className="">
          <Link data-barba href="/courses" className={"/courses"}>
            Courses
          </Link>
        </li>

        <li className="">
          <Link data-barba href="/blog" className={"/blog"}>
            Blog
          </Link>
        </li>

        <li>
          <Link data-barba href="/contact" className={"/contact"}>
            Contact
          </Link>
        </li>

        <li>
          <Link data-barba href="/about" className={"/about"}>
            About
          </Link>
        </li>
        <li>
          <Link data-barba href="/login" className={"/login"}>
            Log in
          </Link>
        </li>

        <li>
          <Link data-barba href="/signup" className={"/signup"}>
            <Button variant="pink">Sign up</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthNavbar;

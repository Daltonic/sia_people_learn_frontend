import React, { useState } from "react";
import Link from "next/link";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="">
      <div className="block md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-lg text-gray-950"
        >
          <HiMiniBars3BottomRight size={24} />
        </button>
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 transform transition-transform duration-200 ease-in-out translate-x-0 w-full">
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-black p-2 bg-white rounded-full"
            >
              <FaTimes />
            </button>
            <ul className="fixed top-0 left-0 h-full bg-white text-[#321463] font-medium text-xl w-[85%]">
              <div className="flex justify-between border-b border-[#e7ecfa] p-5 mb-8">
                <p>
                  <Link href="/login">Log in</Link>
                </p>
                <p>
                <Link href="/signup">Sign Up</Link></p>
              </div>
              <div className="text-2xl font-medium space-y-8 p-5">
                <li>
                  <Link href="/" onClick={closeMenu}>
                    <span
                      className={`${
                        router.pathname === "/" ? "text-[#C5165D]" : ""
                      }`}
                    >
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/courses" onClick={closeMenu}>
                    <span
                      className={`${
                        router.pathname === "/courses" ? "text-[#C5165D]" : ""
                      }`}
                    >
                      Courses
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" onClick={closeMenu}>
                    <span
                      className={`${
                        router.pathname === "/blog" ? "text-[#C5165D]" : ""
                      }`}
                    >
                      Blog
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={closeMenu}>
                    <span
                      className={`${
                         router.pathname === "/contact" ? "text-[#C5165D]" : ""
                      }`}
                    >
                      Contact
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" onClick={closeMenu}>
                    <span
                      className={`${
                        router.pathname === "/about" ? "text-[#C5165D]" : ""
                      }`}
                    >
                      About
                    </span>
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <ul className="text-[#321463] text-md flex gap-5">
          <li className="text-[15px]">
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/courses">Courses</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

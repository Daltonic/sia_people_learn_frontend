import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = ({  }) => {

  return (
    <div className="">
        <ul className=" hidden md:flex text-[#321463] text-md gap-5">
          <li className="text-[15px]">
            <Link
              data-barba
              href="/home"
              className={('/home')}
            >
              Home
            </Link>
          </li>

          <li className="">
            <Link
              data-barba
              href="/courses"
              className={('/courses')}
            >
              Courses
            </Link>
          </li>

          <li className="">
            <Link
              data-barba
              href="/blog"
              className={('/blog')}
            >
              Blog
            </Link>
          </li>

          <li>
            <Link
              data-barba
              href="/contact"
              className={('/contact')}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              data-barba
              href="/about"
              className={('/about')}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
  );
};

export default Navbar;

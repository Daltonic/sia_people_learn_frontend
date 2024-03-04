import React, { useState } from "react";
import Link from "next/link";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const closeMenu = () => setMenuOpen(false);

  const activeLinkStyle = "text-[#c5165ccc]";

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
          <div className="fixed inset-0 bg-black bg-opacity-70 transform transition-transform duration-200 ease-in-out translate-x-0 w-full z-50">
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
                  <Link href="/signup">Sign Up</Link>
                </p>
              </div>
              <div className="text-2xl font-medium space-y-8 p-5">
                <NavItem href="/academies" activeLinkStyle={activeLinkStyle} currentPath={router.pathname}>Academies</NavItem>
                <NavItem href="/courses" activeLinkStyle={activeLinkStyle} currentPath={router.pathname}>Courses</NavItem>
                <NavItem href="/blogs" activeLinkStyle={activeLinkStyle} currentPath={router.pathname}>Blogs</NavItem>
                <NavItem href="/contact" activeLinkStyle={activeLinkStyle} currentPath={router.pathname}>Contact</NavItem>
                <NavItem href="/about" activeLinkStyle={activeLinkStyle} currentPath={router.pathname}>About</NavItem>
              </div>
            </ul>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <ul className="text-[#321463] text-sm flex gap-5">
          <NavItem href="/academies" activeLinkStyle={activeLinkStyle} currentPath={router.pathname}>Academies</NavItem>
          <NavItem href="/courses" activeLinkStyle={activeLinkStyle} currentPath={router.pathname}>Courses</NavItem>
          <NavItem href="/blogs" activeLinkStyle={activeLinkStyle} currentPath={router.pathname}>Blogs</NavItem>
          <NavItem href="/contact" activeLinkStyle={activeLinkStyle} currentPath={router.pathname}>Contact</NavItem>
          <NavItem href="/about" activeLinkStyle={activeLinkStyle} currentPath={router.pathname}>About</NavItem>
        </ul>
      </div>
    </div>
  );
};

const NavItem = ({ href, activeLinkStyle, currentPath, children }: { href: string, activeLinkStyle: string, currentPath: string, children: React.ReactNode }) => {
  return (
    <li className={`transition-colors duration-400 ${currentPath === href ? activeLinkStyle : 'hover:text-[#C5165D]'}`}>
      <Link href={href}>{children}</Link>
    </li>
  );
};


export default Navbar;

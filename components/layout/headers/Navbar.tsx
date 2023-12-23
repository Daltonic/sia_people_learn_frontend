import React, { useState } from 'react';
import Link from 'next/link';
import { HiMiniBars3BottomRight } from "react-icons/hi2";


const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
 
  const closeMenu = () => setMenuOpen(false);
 
  return (
  <div className="">
   <div className="block md:hidden">
     <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-lg text-gray-950">
       <HiMiniBars3BottomRight size={24} />
     </button>
     {menuOpen && (
       <ul className="fixed top-0 left-0 w-full h-full bg-white p-4 text-[#321463]">
         <li>
           <Link href="/" onClick={closeMenu}>
             Home
           </Link>
         </li>
         <li>
           <Link href="/courses" onClick={closeMenu}>
             Courses
           </Link>
         </li>
         <li>
           <Link href="/blog" onClick={closeMenu}>
             Blog
           </Link>
         </li>
         <li>
           <Link href="/contact" onClick={closeMenu}>
             Contact
           </Link>
         </li>
         <li>
           <Link href="/about" onClick={closeMenu}>
             About
           </Link>
         </li>
       </ul>
     )}
   </div>
   <div className="hidden md:block">
     <ul className="text-[#321463] text-md flex gap-5">
       <li className="text-[15px]">
         <Link href="/">
           Home
         </Link>
       </li>
       <li>
         <Link href="/courses">
           Courses
         </Link>
       </li>
       <li>
         <Link href="/blog">
           Blog
         </Link>
       </li>
       <li>
         <Link href="/contact">
           Contact
         </Link>
       </li>
       <li>
         <Link href="/about">
           About
         </Link>
       </li>
     </ul>
   </div>
  </div>
  );
 };
 
 export default Navbar;
 
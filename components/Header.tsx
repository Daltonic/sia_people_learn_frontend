import Image from 'next/image'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineShoppingCart } from 'react-icons/md'
import logo from '@/public/logo.png'
import Link from 'next/link'

// Logo component
const Logo = () => (
  <Image
    src={logo}
    alt="Dapp Mentors Logo"
    width={51}
    height={51}
    className="aspect-square object-contain object-center"
  />
)

// Search bar component
const SearchBar = () => (
  <div className="bg-slate-50 flex justify-between items-center gap-5 pl-7 pr-6 py-4 rounded-lg sm:px-5">
    <div className="text-slate-600 text-sm grow whitespace-nowrap">
      Type a course name
    </div>
    <FiSearch />
  </div>
)

// Navigation links component
const NavLinks = () => (
  <ul className="flex justify-start items-center text-violet-950 text-base leading-7 grow whitespace-nowrap my-auto space-x-8">
    <Link href="/">Home</Link>
    <Link href="#">Courses</Link>
    <Link href="#">Blog</Link>
    <Link href="#">Contact</Link>
    <Link href="#">About</Link>
  </ul>
)

// Main header component
const Header: React.FC = () => {
  return (
    <header className="flex flex-col sm:flex-row items-stretch justify-between gap-5 mt-4">
      <div className="flex flex-col sm:flex-row items-stretch justify-between gap-3.5 px-5">
        <Logo />
        <div className="text-violet-950 text-xl my-auto">Dapp Mentors</div>
        <SearchBar />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-5 space-x-8">
        <NavLinks />
        <MdOutlineShoppingCart size={30} />
        <div className="flex justify-end items-center space-x-2">
          <div className="text-pink-700 text-base leading-7 whitespace-nowrap border-pink-700 self-stretch justify-center items-stretch px-10 py-2.5 rounded-lg border-2 border-solid sm:px-5">
            Log in
          </div>
          <div className="text-white text-base leading-7 whitespace-nowrap bg-pink-700 self-stretch justify-center items-stretch px-9 py-2.5 rounded-lg sm:px-5">
            Sign Up
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

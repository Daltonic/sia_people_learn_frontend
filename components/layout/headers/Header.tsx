'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiSearch } from 'react-icons/ci'
import Navbar from '@/components/layout/headers/Navbar'
import { FiShoppingCart } from 'react-icons/fi'
import Button from '@/components/reusableComponents/Button'

const Header: React.FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  const [isScrolled, setIsScrolled] = useState(false)
 
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isScrolled])

  return (
    <header
      className={`px-5 sm:px-10 lg:px-20 py-5 sticky h-20 top-0 w-full z-50 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div >
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                width={35}
                height={35}
                src="/images/logoImg.svg"
                alt="logo"
                className='object-cover w-10 h-10 rounded-full'
              />
              <p className="text-[#321463] text-lg md:text-md font-medium">Dapp Mentors</p>
            </div>
          </Link>

          <div className="hidden md:flex">
            <form onSubmit={handleSubmit}>
              <div className="flex bg-[#F7F8FB] pl-5 py-2 pr-2 rounded-md w-80 lg:w-[10rem]">
                <input
                  required
                  type="text"
                  placeholder="Type a course name"
                  className="bg-transparent flex-1 placeholder:text-[#4F547B] placeholder:text-sm focus:outline-none"
                />
                <button type="submit">
                  <CiSearch className="text-[#1A064F] font-semiboldtext-xl" />
                </button>
              </div>
            </form>
          </div>

          <div className="text-white flex items-center gap-5 md:gap-10">
            <Navbar />
            <Link href="/shopcart">
              <FiShoppingCart className="text-2xl text-black icon icon-basket" />
            </Link>
            <div className=" gap-2 hidden md:flex">
              <Link href="/login">
                <Button variant="pinkoutline">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button variant="pink" className="">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiSearch } from 'react-icons/ci'
import Navbar from '@/components/layout/headers/Navbar'
import { FiShoppingCart } from 'react-icons/fi'
import Button from '@/components/ReusableComponents/Button'

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
      className={`px-5 md:px-10 py-5 sticky h-20 top-0 w-full z-50 mb-5 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                width={35}
                height={35}
                src="/images/logoImg.svg"
                alt="logo"
              />
              <p className="text-[#321463] text-md">Dapp Mentors</p>
            </div>
          </Link>

          <div className="hidden md:flex">
            <form onSubmit={handleSubmit}>
              <div className="flex bg-[#F7F8FB] pl-5 py-2 pr-2 rounded-md w-80">
                <input
                  required
                  type="text"
                  placeholder="Type a course name"
                  className="bg-transparent flex-1 placeholder:text-[#4F547B] placeholder:text-sm"
                />
                <button type="submit">
                  <CiSearch className="text-[#1A064F] font-semiboldtext-xl" />
                </button>
              </div>
            </form>
          </div>

          <div className="text-white flex items-center gap-10 ">
            <Navbar />
            <Link href="/shop-cart">
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

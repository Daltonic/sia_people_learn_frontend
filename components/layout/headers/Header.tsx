'use client'

import React, { FormEvent } from 'react'
import CartToggle from '../component/CartToggle'
import Menu from '../component/Menu'
import MobileMenu from '../component/MobileMenu'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

const Header: React.FC = () => {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <header className="fixed top-0 left-0 z-50 bg-white w-full px-16">
      <div className="relative max-w-[1500px]  py-10 ">
        <div className="flex justify-between items-center">
          <div>
            <div className="header-left flex items-center gap-4">
              <div className="header__logo ">
                <Link href="/">
                  <Image
                    width={35}
                    height={35}
                    src="/assets/images/logoImg.svg"
                    alt="logo"
                  />
                </Link>
              </div>
              <p className='text-[#321463] text-md'>Dapp Mentors</p>

              <div className="header-search-field ml-30">
                <form onSubmit={handleSubmit}>
                  <div className="header-search-field__group">
                    <input
                      required
                      type="text"
                      placeholder="What do you want to learn?"
                      className='placeholder:text-[#4F547B]'
                    />
                    <button type="submit">
                      <i className="icon icon-search text-[#1A064F]"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <div className=" text-white flex items-center">
                <Menu allClasses={'menu__nav text-dark-1 -is-active'} />
                {/* <MobileMenu
                  setActiveMobileMenu={setActiveMobileMenu}
                  activeMobileMenu={activeMobileMenu}
                /> */}

                <CartToggle
                  parentClassess={'relative ml-30 xl:ml-20'}
                  allClasses={'flex items-center text-dark-1'}
                />

                <div className="d-none xl:d-block ml-20">
                  <button
                    onClick={() => setActiveMobileMenu(true)}
                    className="text-dark-1 items-center"
                    data-el-toggle=".js-mobile-menu-toggle"
                  >
                    <i className="text-11 icon icon-mobile-menu"></i>
                  </button>
                </div>
              </div>

              <div className="header-right__buttons text-[#C5165D] flex items-center ml-30 xl:ml-20 md:d-none">
                <Link
                  href="/signup"
                  className="button px-30 h-50 border-[#C5165D] border"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="button px-30 h-50 bg-[#C5165D] text-white ml-10"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

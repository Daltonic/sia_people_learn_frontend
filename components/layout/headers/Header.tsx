'use client'

import React, { FormEvent } from 'react'
import { HeaderExplore } from '../component/header-explore'
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
    <header className="header -type-3 js-header">
      <div className="header__container py-10">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left flex items-center">
              <div className="header__logo ">
                <Link href="/">
                  <Image
                    width={140}
                    height={50}
                    src="/assets/img/general/logo-dark.svg"
                    alt="logo"
                  />
                </Link>
              </div>
              <HeaderExplore
                allClasses={'header__explore text-purple-600 ml-30 xl:d-none'}
              />

              <div className="header-search-field ml-30">
                <form onSubmit={handleSubmit}>
                  <div className="header-search-field__group">
                    <input
                      required
                      type="text"
                      placeholder="What do you want to learn?"
                    />
                    <button type="submit">
                      <i className="icon icon-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="header-right flex items-center">
              <div className="header-right__icons text-white flex items-center">
                <Menu allClasses={'menu__nav text-dark-1 -is-active'} />
                <MobileMenu
                  setActiveMobileMenu={setActiveMobileMenu}
                  activeMobileMenu={activeMobileMenu}
                />

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

              <div className="header-right__buttons flex items-center ml-30 xl:ml-20 md:d-none">
                <Link
                  href="/login"
                  className="button px-30 h-50 -outline-dark-1 text-dark-1"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="button px-30 h-50 -dark-1 text-white ml-10"
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

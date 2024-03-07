import React, { ReactNode } from 'react';
import AuthNavbar from './AuthNavbar';
import Link from 'next/link';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="md:flex md:h-screen">
        <div className="bg-[#321463] h-[30vh] overflow-y-hidden md:h-full w-full md:w-1/3 py-5 px-10 flex flex-col">
          <Link href="/">
            <div className="hidden md:flex items-center gap-2 cursor-pointer">
              <Image width={35} height={35} src="/images/general/logoImg.svg" alt="logo" />
              <p className="text-white text-md">PeopleLearn</p>
            </div>
          </Link>
          <div className="flex justify-center items-center flex-1">
            <Image width={400} height={400} src="/images/login/images-bg.svg" alt="" />
          </div>
        </div>
        <div className="flex-1 bg-[#F9F9F9] overflow-scroll">
          <AuthNavbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

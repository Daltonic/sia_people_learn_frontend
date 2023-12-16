'use client'
import Button from '@/components/ReusableComponents/Button'
import InputField from '@/components/ReusableComponents/InputField'
import AuthNavbar from '@/components/layout/headers/AuthNavbar'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'

const Page: NextPage = () => {
  return (
    <div>
      <div className="md:flex md:h-screen">
        <div className="bg-[#321463] h-[30vh]  md:h-full w-full md:w-1/3 py-5 px-10 flex flex-col">
          <Link href="/">
            <div className="hidden md:flex items-center gap-2 cursor-pointer">
              <Image
                width={35}
                height={35}
                src="/images/logoImg.svg"
                alt="logo"
              />
              <p className="text-white text-md">Dapp Mentors</p>
            </div>
          </Link>
          <div className="flex justify-center items-center flex-1">
            <Image
              width={400}
              height={400}
              src="/images/login/images-bg.svg"
              alt=""
            />
          </div>
        </div>
        <div className="flex-1 bg-[#F9F9F9] overflow-scroll">
          <AuthNavbar />
          <div className="flex justify-center items-center w-full h-full">
            <form
              action=""
              className="bg-white p-5 md:p-10 w-full md:w-[55%] rounded-md "
              // onSubmit={handleSubmit}
            >
              <h3 className="font-medium text-3xl text-[#321463]">Login</h3>
              <p className="text-sm text-[#4F547B] mt-1">
                Do not have an account yet?
                <Link href="/signup" className="text-[#C5165D] ml-2">
                  Sign up for free
                </Link>
              </p>
              <InputField
                label="Email"
                name="email"
                placeholder="youremail@domain.com"
                required
                inputType="email"
              />
              <InputField
                label="Password"
                name="password"
                placeholder="********"
                required
                inputType="number"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <input type="checkbox" name="" id="" />
                  <p className="text-sm text-[#C5165D]">Remember me</p>
                </div>
                <div>
                  <p className="text-sm text-[#C5165D] underline">
                    Forgot your password?{' '}
                  </p>
                </div>
              </div>
              <Button
                variant="pink"
                className=""
                style={{ width: '100%', marginTop: '14px', padding: '16px' }}
              >
                Login
              </Button>
              <p className="font-medium text-md text-[#321463] text-center mt-2">
                Or sign in using
              </p>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="whiteoutline"
                  type="submit"
                  name="submit"
                  id="submit"
                  className=""
                  style={{
                    border: '1px solid #1967D2',
                    color: '#1967D2',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1px',
                    width: '100%',
                  }}
                >
                  <FaFacebookF />
                  Log In via Facebook
                </Button>
                <Button
                  variant="whiteoutline"
                  type="submit"
                  name="submit"
                  id="submit"
                  className=""
                  style={{
                    border: '1px solid #D93025',
                    color: '#D93025',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    width: '100%',
                  }}
                >
                  <FaGoogle />
                  Log In via Google+
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

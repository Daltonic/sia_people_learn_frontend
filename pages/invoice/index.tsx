"use client";
import Button from "@/components/reusableComponents/Button";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { SlPrinter } from "react-icons/sl";

const Page: NextPage = () => {
  return (
    <div className="bg-[#F9F9F9] px-5 sm:px-10 md:px-20 py-16">
      <div className="flex flex-col items-center">
        <div className="flex justify-end mb-12 md:w-5/6">
          <Button
            variant="pink"
            style={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              padding: "8px 30px",
            }}
          >
            <SlPrinter />
            Print
          </Button>
        </div>
        <div className="w-full md:w-5/6 bg-white py-10 md:py-16 px-5 sm:px-10 rounded-lg space-y-10">
          <div className="md:flex justify-between items-center">
            <div>
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    width={35}
                    height={35}
                    src="/images/logoImg.svg"
                    alt="logo"
                  />
                  <p className="text-[#321463] text-md font-medium">
                    Dapp Mentors
                  </p>
                </div>
              </Link>
            </div>
            <div className="md:flex items-center gap-10 space-y-1 md:space-y-0 mt-2 md:mt-0">
              <h1 className="text-[#321463] text-xl font-medium"> Invoice #</h1>
              <p className="text-[#4F547B] text-md font-medium">0043128641</p>
            </div>
          </div>
          <div className="md:flex justify-between items-center gap-2 space-y-10 md:space-y-0">
            <div>
              <div>
                <h1 className="text-[#4F547B] md:text-sm">Invoice date:</h1>
                <p className="text-[#321463] text-lg md:text-mb font-medium">
                  03/10/2021
                </p>
              </div>
              <div className="md:space-y-2 mt-2 md:mt-10">
                <h1 className="text-[#321463] text-xl md:text-lg font-medium">
                  Supplier
                </h1>
                <p className="text-[#321463] text-lg md:text-md font-medium">
                  Jobio LLC
                </p>
                <p className="text-[#4F547B] md:text-sm">
                  2301 Ravenswood Rd Madison,
                </p>
                <p className="text-[#4F547B] md:text-sm">WI 53711</p>
              </div>
            </div>
            <div>
              <div>
                <h1 className="text-[#4F547B] md:text-sm">Due date:</h1>
                <p className="text-[#321463] text-lg md:text-mb font-medium">
                  03/10/2021
                </p>
              </div>
              <div className="md:space-y-2  mt-2 md:mt-10">
                <h1 className="text-[#321463] text-xl md:text-lg font-medium">
                  Customer
                </h1>
                <p className="text-[#321463] text-md font-medium">John Doe</p>
                <p className="text-[#4F547B] md:text-sm">
                  329 Queensberry Street, North Melbourne VIC
                </p>
                <p className="text-[#4F547B] md:text-sm">3051, Australia.</p>
              </div>
            </div>
          </div>
          <div className="mt-10 md:mt-14">
            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead className=" bg-[#F5F7FE] text-[#C5165D] font-medium h-20 overflow-hidden rounded-xl md:w-5/6">
                  <tr className="text-left">
                    <th className="pl-5 md:pl-10">Description </th>
                    <th className="pl-10">Price</th>
                    <th className="pl-10"> VAT (20%)</th>
                    <th className="pl-10">Total</th>
                  </tr>
                </thead>
                <tbody className=" ">
                  <tr className="border-b border-[#F5F7FE] text-left">
                    <td className="w-10 py-2 md:py-4 pl-5 md:pl-10">Standard Plan</td>
                    <td className="w-10 py-2 md:py-4 pl-10">$443.00 </td>
                    <td className="w-10 py-2 md:py-4 pl-10">$921.80 </td>
                    <td className="w-10 py-2 md:py-4 pl-10">$9243</td>
                  </tr>
                  <tr className="border-b border-[#F5F7FE] text-left">
                    <td className="w-10 py-2 md:py-4 pl-5 md:pl-10 text-left">Extra Plan</td>
                    <td className="w-10 py-2 md:py-4 pl-10">$423.00 </td>
                    <td className="w-10 py-2 md:py-4 pl-10">$912.80 </td>
                    <td className="w-10 py-2 md:py-4 pl-10">$5943</td>
                  </tr>
                  <tr className="border-b border-[#F5F7FE] text-left">
                    <td className="w-10 py-2 md:py-4 pl-5 md:pl-10 text-left text-[#321463] text-lg font-medium">Total Due</td>
                    <td className="w-10 py-2 md:py-4 pl-10"> </td>
                    <td className="w-10 py-2 md:py-4 pl-10"> </td>
                    <td className="w-10 py-2 md:py-4 pl-10 text-[#321463] text-lg font-medium">$9943</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10 justify-center mt-14 border-t border-[#F5F7FE] pt-5">
              <p className="text-[#C5165D] text-lg font-medium">
                www.jobio.com
              </p>
              <p className="text-[#4F547B] text-lg font-medium">
                invoice@jobio.com
              </p>
              <p className="text-[#4F547B] text-lg font-medium">
                (123) 123-456
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

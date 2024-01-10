import Image from "next/image";
import React from "react";

type State = {
  title: string;
  value: number;
  new: number;
  iconClass: string;
};

type Props = {
  states: State[];
};

const DashBoardTop: React.FC<Props> = ({ states }) => {
  return (
    <div>
      <div className="mb-16">
        <h1 className="font-bold text-[#321463] text-3xl">Dashboard</h1>
        <p className="text-[#4F547B] text-lg">
          Your personal control panel for managing your courses and settings.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap justify-between gap-5 md:gap-0">
        {states.map((elm, i) => (
          <div key={i}>
            <div className="flex justify-between items-center md:py-10 p-8 md:px-4 rounded-lg bg-white shadow-lg w-full sm:w-80 md:w-52">
              <div className="space-y-2">
                <h1 className="font-medium text-[#4F547B] md:text-sm">
                  {elm.title}
                </h1>
                <p className="text-2xl md:text-xl text-[#321463] font-bold">
                  ${elm.value}
                </p>
                <p className="md:text-sm text-[#4F547B]">
                  <span className="text-[#C5165D]">${elm.new}</span> New Sales
                </p>
              </div>
              <Image
                width={45}
                height={45}
                src={elm.iconClass}
                alt="profile"
                className="rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoardTop;

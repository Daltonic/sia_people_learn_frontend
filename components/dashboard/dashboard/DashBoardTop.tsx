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
        <h1 className="font-bold text-[#321463] md:text-3xl">Dashboard</h1>
        <p className="text-[#4F547B] text-lg">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>
      <div className="flex justify-between">
        {states.map((elm, i) => (
          <div>
            <div
              key={i}
              className="flex justify-between items-center py-10 px-4  rounded-lg bg-white shadow-lg w-56"
            >
              <div className="space-y-2">
                <h1 className="font-medium text-[#4F547B] text-sm">{elm.title}</h1>
                <p className="text-xl text-[#321463] font-bold">
                  ${elm.value}
                </p>
                <p className="text-sm text-[#4F547B]" >
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

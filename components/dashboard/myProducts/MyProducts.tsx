import React from "react";
import Tabs from "./Tabs";

const MyProducts: React.FC = () => {
  return (
    <div className="">
      <div className="mb-10 md:mb-16  px-5 sm:px-0">
        <h1 className="font-bold text-[#321463] text-3xl">My Products</h1>
        <p className="text-[#4F547B] text-lg">
          Access and manage all your products in one place.
        </p>
      </div>
      <Tabs />
    </div>
  );
};

export default MyProducts;

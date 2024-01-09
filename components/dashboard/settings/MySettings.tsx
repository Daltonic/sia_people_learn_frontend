import React from "react";
import Tabs from "./Tabs";

const MySettings: React.FC = () => {
  return (
    <div className="">
      <div className="mb-10 md:mb-16">
        <h1 className="font-bold text-[#321463] text-3xl">Settings</h1>
        <p className="text-[#4F547B] text-lg">
          Customize your account preferences and privacy settings.
        </p>
      </div>
      <Tabs />
    </div>
  );
};

export default MySettings;

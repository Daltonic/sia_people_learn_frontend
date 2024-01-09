"use client";
import React, { useState } from "react";
import EditProfile from "./EditProfile";
import PasswordForm from "./PasswordForm";
import SocialProfileForm from "./SocialProfileForm";
import CloseAcctForm from "./CloseAcctForm";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="bg-white p-5 rounded-xl">
      <div>
        <div className="flex space-x-5 border-b">     
          <button
            onClick={() => handleTabClick(1)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 1
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 2
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Password
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 3
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Social 
          </button>
          <button
            onClick={() => handleTabClick(4)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 4
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Notifications
          </button>
          <button
            onClick={() => handleTabClick(5)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 5
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Close Account
          </button>
        </div>
        <div className="py-4 text-[#4F547B]">
          {activeTab === 1 && (
            <EditProfile/>
          )}
          {activeTab === 2 && (
           <PasswordForm/>
          )}
          {activeTab === 3 && (
           <SocialProfileForm/>
          )}
          {activeTab === 4 && (
           <SocialProfileForm/>
          )}
          {activeTab === 5 && (
           <CloseAcctForm/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

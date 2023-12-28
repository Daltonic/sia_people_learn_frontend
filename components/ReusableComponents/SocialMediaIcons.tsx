import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const SocialMediaIcons = () => {
 return (
   <div className="flex -ml-5 items-center">
     <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:text-[#C5165D] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
       <FaFacebookF />
     </div>
     <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:text-[#C5165D] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
       <FaTwitter />
     </div>
     <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:text-[#C5165D] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
       <FaInstagram />
     </div>
     <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:text-[#C5165D] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
       <FaLinkedinIn />
     </div>
   </div>
 );
};

export default SocialMediaIcons;

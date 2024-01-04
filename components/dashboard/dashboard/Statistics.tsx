import React, { useState } from 'react';
import Charts from './Charts';

const Statistics: React.FC = () => {
 const [isDropdownActive, setIsDropdownActive] = useState(false);

 const toggleDropdown = () => {
   setIsDropdownActive(!isDropdownActive);
 };

 return (
   <div className="w-full md:w-3/5">
       <div className="rounded-lg bg-white shadow-lg h-full">
         <div className="flex justify-between items-center py-5 px-7 border-b border-gray-200">
           <h2 className="text-sm font-semibold text-[#321463]">Earning Statistics</h2>
           <div className="relative ">
             <div
               id="ddtwobutton"
               onClick={toggleDropdown}
               className="inline-flex items-center justify-center text-sm bg-white border border-gray-200 rounded-lg px-4 py-2 cursor-pointer"
               data-el-toggle=".js-category-toggle"
               data-el-toggle-active=".js-category-active"
             >
               <span className="text-[#4F547B]">This Week</span>
               <i className="ml-2"></i>
             </div>
             {isDropdownActive && (
               <div
                id="ddtwocontent"
                className="absolute right-0 mt-2 w-48 bg-white z-10 border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg"
               >
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Animation</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Design</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Illustration</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Business</a>
                </div>
               </div>
             )}
           </div>
         </div>
         <div className="py-10 px-7">
           <Charts />
         </div>
       </div>
   </div>
 );
};

export default Statistics;

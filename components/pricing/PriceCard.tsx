import React from 'react';
import Image from 'next/image';
import Button from '../reusableComponents/Button';
import { FaCheck } from 'react-icons/fa';

interface PricingItem {
 type: string;
 price: number;
 period: string;
 features: string[];
 image: string;
}

const PriceCard: React.FC<PricingItem> = (item) => {
 return (
   <div className="bg-white shadow-xl shadow-[#EDEDED] w-full md:w-80 p-5 md:p-10 rounded-md text-center flex flex-col items-center gap-5">
     <div className="space-y-2">
       <p className="text-[#321463]">{item.type}</p>
       <h1 className="text-[#321463] font-bold text-4xl">
         {item.price ? item.price : 'Free'}
       </h1>
       <p className="text-[#4F547B] md:text-sm">{item.period}</p>
     </div>
     <Image
       width={0}
       height={0}
       src={item.image}
       alt="icon"
       className="w-20 "
     />
     <div className=" text-start">
       <p className="text-[#4F547B] md:text-sm text-start mt-5 pr-14">
         Standard listing submission, active for 30 days
       </p>
       {item.features.map((elm, i) => (
         <div key={i} className="flex gap-3 mt-2 items-center">
           <FaCheck className="text-[#0044EB] md:text-sm" />
           <p className="text-[#4F547B] md:text-sm">{elm}</p>
         </div>
       ))}
     </div>
     <Button variant="pink">Get Started Now</Button>
   </div>
 );
};


export default PriceCard;

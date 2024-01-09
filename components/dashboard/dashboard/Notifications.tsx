import React from 'react';
import Image from 'next/image';

type Notification = {
 imageSrc: string;
 heading: string;
 time: number;
};

type Props = {
 notifications: Notification[];
};

const Notifications: React.FC<Props> = ({ notifications }) => {
 return (
 <div className="w-full">
   <div className="rounded-lg bg-white shadow-lg  px-4 py-6">
     <div className="flex justify-between items-center border-b border-gray-200">
       <h2 className="font-semibold text-[#321463] pb-3">Notifications</h2>
     </div>
     <div className="py-6">
       <div className="space-y-2">
         {notifications.map((elm, i) => (
           <div
            key={i}
            className={`flex items-center ${i !== 0 ? "border-t border-gray-200 py-2" : ""}`}
           >
            <div className="shrink-0">
              <Image
               width={40}
               height={40}
               className="object-cover"
               src={elm.imageSrc}
               alt="image"
              />
            </div>
            <div className="ml-3 w-full">
              <h4 className="font-semibold text-[#321463]">{elm.heading}</h4>
              <p className="text-sm text-[#4F547B]">
                {elm.time} Hours Ago
              </p>
            </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 </div>
 );
};

export default Notifications;

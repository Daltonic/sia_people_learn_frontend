import React from 'react';
import Image from 'next/image';

interface LearningJourneyItem {
 id: number;
 title: string;
 text: string;
 imageSrc: string;
 delay: number;
}

interface LearningJourneyItemProps {
 item: LearningJourneyItem;
}

const LearningJourneyItem: React.FC<LearningJourneyItemProps> = ({ item }) => {
 return (
   <div key={item.id} >
     <div className="bg-white md:shadow-lg md:border border-slate-200 shadow-slate-200 md:w-64 h-64 flex flex-col items-center text-center px-8 py-10 rounded-md">
       <div>
         <Image
           width={60}
           height={60}
           src={item.imageSrc}
           alt={item.title}
         />
       </div>
       <div className="mt-5">
         <h5 className="text-violet-950 text-lg font-medium">{item.title}</h5>
         <p className="text-slate-600 text-sm mt-2">{item.text}</p>
       </div>
     </div>
   </div>
 );
};

export default LearningJourneyItem;

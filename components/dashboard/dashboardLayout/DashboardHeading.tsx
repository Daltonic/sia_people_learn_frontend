import React from 'react';

interface DashboardHeadingProps {
 title: string;
 description: string;
}

const DashboardHeading: React.FC<DashboardHeadingProps> = ({ title, description }) => {
 return (
    <div className="mb-10 px-5 sm:px-0">
      <h1 className="font-bold text-[#321463] text-3xl">{title}</h1>
      <p className="text-[#4F547B] text-lg">{description}</p>
    </div>
 );
};

export default DashboardHeading;

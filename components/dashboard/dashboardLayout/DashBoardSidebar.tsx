// components/DashboardSidebar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sidebarItems } from '@/data/dashBoardSidebar';
import { useRouter } from 'next/router';

interface DashboardSidebarProps {
  isOpen: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen }) => {
  const router = useRouter();

  return (
    <div
      className={`px-6 pt-14 space-y-3 fixed top-0 left-0 h-full overflow-auto transform ease-in-out transition-all duration-300 bg-white   ${
        isOpen ? 'translate-x-0' : '-translate-x-full '
      } md:translate-x-0 md:static md:block z-10 w-4/5 md:w-fit`}
    >
      {sidebarItems.map((elm, i) => (
        <div
          key={i}
          className={`py-2 pl-4 w-48 pr-5 font-medium rounded-xl ${
            router.pathname === elm.href ? 'text-white bg-[#C5165D]' : 'text-[#4F547B]'
          }`}
        >
          <Link href={elm.href}>
            <div className="flex gap-2 text-lg md:text-md">
            <Image
                width={18}
                height={18}
                src={elm.iconClass}
                alt="logo"
              />
              {elm.text}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardSidebar;

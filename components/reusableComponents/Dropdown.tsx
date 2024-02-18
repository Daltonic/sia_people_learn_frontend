// components/Dropdown.tsx
import React, { ReactNode, useState } from 'react';
import { IoMdMore } from 'react-icons/io';

interface LayoutProps {
    children: ReactNode;
}

const Dropdown: React.FC<LayoutProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative'>
            <div onClick={toggleDropdown} className="text-[#6A7A99] bg-white p-1 text-xl rounded-md cursor-pointer border">
                <IoMdMore />
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-28 p-2 rounded-md shadow-lg bg-white text-sm space-y-1">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;

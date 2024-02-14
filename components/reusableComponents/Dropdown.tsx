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
        <div className="relative">
            <div onClick={toggleDropdown}>
                <IoMdMore />
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-28 p-2 rounded-md shadow-lg bg-white text-sm">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;

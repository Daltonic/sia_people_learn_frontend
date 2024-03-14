// components/Dropdown.tsx
import React, { ReactNode, useState, useRef, useEffect } from 'react'
import { IoMdMore } from 'react-icons/io'

interface LayoutProps {
  children: ReactNode
}

const Dropdown: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative z-20" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="text-[#6A7A99] bg-white p-1 text-xl
        rounded-md cursor-pointer border"
      >
        <IoMdMore />
      </div>
      {isOpen && (
        <div
          className="flex flex-col justify-center items-start
        absolute right-0 mt-2 w-28 p-2 rounded-md shadow-lg
        bg-white text-sm space-y-1"
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown

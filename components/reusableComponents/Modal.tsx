import React, { FC, ReactNode } from 'react';

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 children?: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
     return null;
  }
 
  return (
    <div className="right-0 top-14 absolute shadow shadow-gray-300 p-6 w-56 h-44 rounded  bg-white ">
    <div 
      className=" cursor-pointer" 
      onClick={onClose}
    />
    <div className='flex flex-col text-base items-center'>
      {children}
    </div>
  </div>
  );
 };
 
 
export default Modal;
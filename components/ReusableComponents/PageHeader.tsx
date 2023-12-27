// PageHeader.jsx
import React from 'react';

interface PageHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className, children }) => {
  return (
    <div className={`text-violet-950 text-3xl md:text-4xl font-bold ${className}`}>
      {children}
    </div>
  );
};

export default PageHeader;

import React, { ReactNode } from 'react';
import Footer from "./footers/Footer";
import Header from "./headers/Header";
interface LayoutProps {
    children: ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >
      <Header />
      <div className='md:mb-24 '></div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

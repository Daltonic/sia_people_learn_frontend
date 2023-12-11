import React, { ReactNode } from 'react';
import Footer from "./footers/Footer";
import Header from "./headers/Header";
// Import AOS styles
import 'aos/dist/aos.css';

// Import AOS library
import AOS from 'aos';

// Initialize AOS
AOS.init();

interface LayoutProps {
    children: ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >
      <Header />
      <div className='mb-24 '></div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

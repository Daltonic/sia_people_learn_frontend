"use client";
import React, { ReactNode, useEffect } from "react";
import Footer from "./footers/Footer";
import Header from "./headers/Header";
import "aos/dist/aos.css";
import AOS from "aos";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
        <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

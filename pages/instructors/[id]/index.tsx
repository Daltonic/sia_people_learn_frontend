import Profile from "@/components/instructors/Profile";
import Tabs from "@/components/instructors/Tabs";
import Layout from "@/components/layout/Layout";
import React from 'react'



const Page: React.FC = () => {
  
  return (
    <Layout>
      <div className="md:px-20">
       <Profile/>
       <Tabs/>
      </div>
    </Layout>
  );
};

export default Page;

// components/BlogDetail.js
import React from 'react';
import { BlogStruct } from "@/utils/type.dt";

interface ComponentProps {
    blogData: BlogStruct;
    index?: number;
  }

const BlogDetail: React.FC<ComponentProps> = ({ blogData }) => {
 return (
   <>
     <section className="my-5 md:my-10">
       <div className="text-center">
         <div>
           <h1 className="text-[#C5165D] text-sm uppercase font-medium">
             {blogData.category.toUpperCase()}
           </h1>

           <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-medium md:leading-[55px] capitalize w-full md:mt-3 max-md:max-w-full">
             {blogData.title.split(" ").slice(0, 4).join(" ")}
             <br />
             {blogData.title.split(" ").slice(4, -1).join(" ")}
           </h1>

           <p className="text-xs text-[#4F547B] mt-3">{blogData.date}</p>
         </div>
       </div>
     </section>

     <section className="w-full">
       <div
         className="rounded-xl w-full h-[30vh] md:h-[100vh]"
         style={{
           backgroundImage: `url(${blogData.imageSrc})`,
           backgroundSize: "cover",
           backgroundPosition: "center",
          
         }}
         data-bg="/assets/img/coursesCards/1.png"
       />
     </section>
   </>
 );
};

export default BlogDetail;

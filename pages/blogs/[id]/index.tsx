"use client";

import React from "react";
import { tags } from "@/data/blogs";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import { ImQuotesLeft } from "react-icons/im";
import {
  FaCircle,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { GetServerSidePropsContext, NextPage } from "next";
import { IPost } from "@/utils/type.dt";
import { requirements } from "@/data/aboutcourses";
import BlogDetail from "@/components/blogs/BlogDetail";
import ReviewSection from "@/components/blogs/ReviewSection";
import ReviewForm from "@/components/blogs/ReviewForm";
import RelatedPosts from "@/components/blogs/RelatedPosts";
import Blog from "@/components/blogs/Blog";

const Page: NextPage<{ postData: IPost }> = ({ postData }) => {
  return (
    <Layout>
      <Blog post={postData} />
      <RelatedPosts />
    </Layout>
  );
};

// const Page: NextPage<{ postData: IPost }> = ({ postData }) => {
//   return (
//     <Layout>
//       <div className="flex flex-col items-center px-5 sm:px-10 md:px-20">
//         <BlogDetail post={postData} />

//         <section className="flex justify-center w-full mt-5 md:mt-16">
//           <div className="w-full md:w-4/5">
//             <div className="md:flex justify-center">
//               <div>
//                 <div>
//                   <h4 className="font-medium text-lg text-[#321463]">
//                     {postData.title}
//                   </h4>
//                   <p className="mt-2 md:mt-5 text-[#4F547B]">
//                     {postData.description}
//                   </p>

//                   <ul className="space-y-5 mt-2 md:mt-5">
//                     {requirements.map((elm, i: number) => (
//                       <div key={i} className="flex items-center gap-2 md:gap-5">
//                         <div>
//                           <FaCircle className="text-[10px] text-[#4F547B]" />
//                         </div>
//                         <p className="text-[#4F547B]">{elm}</p>
//                       </div>
//                     ))}
//                   </ul>

//                   <div className="hidden md:flex items-stretch gap-5 px-5 my-10 max-md:flex-wrap max-md:justify-center">
//                     <div className="bg-pink-700 flex w-[5px] shrink-0 h-[127px] flex-col" />
//                     <ImQuotesLeft className="text-6xl text-[#F9F9F9]" />
//                     <div className="text-violet-950 text-lg font-bold leading-8 capitalize self-center grow shrink basis-auto my-auto max-md:max-w-full">
//                       Smart contracts, self-executing code deployed on
//                       blockchains, automate and enforce agreements without the
//                       need for intermediaries.
//                     </div>
//                   </div>

//                   <p className="mt-10 text-[#4F547B]">
//                     Donec purus posuere nullam lacus aliquam egestas arcu. A
//                     egestas a, tellus massa, ornare vulputate. Erat enim eget
//                     laoreet ullamcorper lectus aliquet nullam tempus id.
//                     Dignissim convallis quam aliquam rhoncus, lectus nullam
//                     viverra. Bibendum dignissim tortor, phasellus pellentesque
//                     commodo, turpis vel eu. Donec consectetur ipsum nibh
//                     lobortis elementum mus velit tincidunt elementum. Ridiculus
//                     eu convallis eu mattis iaculis et, in dolor. Sem libero,
//                     tortor suspendisse et, purus euismod posuere sit. Risus dui
//                     ut viverra venenatis ipsum tincidunt non, proin. Euismod
//                     pharetra sit ac nisi. Erat lacus, amet quisque urna
//                     faucibus. Rhoncus praesent faucibus rhoncus nec adipiscing
//                     tristique sed facilisis velit.
//                     <br />
//                     <br />
//                     Neque nulla porta ut urna rutrum. Aliquam cursus arcu
//                     tincidunt mus dictum sit euismod cum id. Dictum integer
//                     ultricies arcu fermentum fermentum sem consectetur.
//                     Consectetur eleifend aenean eu neque euismod amet parturient
//                     turpis vitae. Faucibus ipsum felis et duis fames.
//                   </p>
//                 </div>

//                 <div className="sm:flex justify-between mt-5">
//                   <div className="w-full sm:w-[48%]">
//                     <Image
//                       width={530}
//                       height={450}
//                       src="/images/blog-list/1.svg"
//                       alt="image"
//                       className=" rounded-md"
//                     />
//                   </div>
//                   <div className="w-full sm:w-[48%] mt-5 sm:mt-0">
//                     <Image
//                       width={530}
//                       height={450}
//                       src="/images/blog-list/2.svg"
//                       alt="image"
//                       className=" rounded-md"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-5 text-[#4F547B]">
//                   <p>
//                     Donec purus posuere nullam lacus aliquam egestas arcu. A
//                     egestas a, tellus massa, ornare vulputate. Erat enim eget
//                     laoreet ullamcorper lectus aliquet nullam tempus id.
//                     Dignissim convallis quam aliquam rhoncus, lectus nullam
//                     viverra. Bibendum dignissim tortor, phasellus pellentesque
//                     commodo, turpis vel eu. Donec consectetur ipsum nibh
//                     lobortis elementum mus velit tincidunt elementum. Ridiculus
//                     eu convallis eu mattis iaculis et, in dolor. Sem libero,
//                     tortor suspendisse et, purus euismod posuere sit. Risus dui
//                     ut viverra venenatis ipsum tincidunt non, proin. Euismod
//                     pharetra sit ac nisi. Erat lacus, amet quisque urna
//                     faucibus. Rhoncus praesent faucibus rhoncus nec adipiscing
//                     tristique sed facilisis velit.
//                     <br />
//                     <br />
//                     Neque nulla porta ut urna rutrum. Aliquam cursus arcu
//                     tincidunt mus dictum sit euismod cum id. Dictum integer
//                     ultricies arcu fermentum fermentum sem consectetur.
//                     Consectetur eleifend aenean eu neque euismod amet parturient
//                     turpis vitae. Faucibus ipsum felis et duis fames.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="md:flex justify-between items-center border-b-2 border-[#EEEEEE] pb-5 mt-5 md:mt-16">
//               <div className="flex gap-5 items-center">
//                 <h1 className="">Share</h1>

//                 <div className="flex gap-2 items-center">
//                   <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
//                     <FaFacebookF />
//                   </div>
//                   <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
//                     <FaTwitter />
//                   </div>
//                   <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
//                     <FaInstagram />
//                   </div>
//                   <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
//                     <FaLinkedinIn />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-5 mt-5 md:mt-0">
//                 {tags.slice(0, 4).map((elm, i: number) => (
//                   <div key={i} className="">
//                     <a
//                       href={elm.href}
//                       className="text-violet-950 text-xs font-medium whitespace-nowrap items-stretch bg-stone-50 aspect-[2.1] justify-center px-4 py-2 rounded-[60px]"
//                     >
//                       {elm.name}
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="border-b-2 border-[#EEEEEE] flex gap-5 items-start py-5">
//               <Image
//                 width={0}
//                 height={0}
//                 src="/images/testimonials/testimonial2.svg"
//                 alt="image"
//                 className="w-12 h-12 object-cover rounded-full"
//               />
//               <div>
//                 <div>
//                   <h1 className="text-[#321463] font-medium">
//                     {" "}
//                     Brooklyn Simmons
//                   </h1>
//                   <p className="md:text-sm text-[#4F547B]">Medical Assistant</p>
//                 </div>
//                 <p className="text-[#4F547B] mt-2 md:mt-5">
//                   Etiam vitae leo et diam pellentesque porta. Sed eleifend
//                   ultricies risus, vel rutrum erat commodo ut. Praesent finibus
//                   congue euismod. Nullam scelerisque massa vel augue placerat, a
//                   tempor sem egestas. Curabitur placerat finibus lacus.
//                 </p>
//               </div>
//             </div>
//             <ReviewSection />
//             <ReviewForm />
//           </div>
//         </section>
//       </div>
//       <RelatedPosts />
//     </Layout>
//   );
// };

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const requestDetails = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts/${id}`,
      requestDetails
    );

    const post = await response.json();
    return {
      props: {
        postData: post,
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};

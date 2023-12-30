"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
      <div className="px-5 mt-10 text-center">
        <h1 className="text-violet-950 text-3xl md:text-4xl font-bold">
          Terms & Conditions
        </h1>
        <p className="text-slate-600 text-md mt-3 capitalize">
          We are on a mission to deliver engaging, curated courses at a
          reasonable price.
        </p>
      </div>
      <div className="md:w-4/5 px-5 md:px-0 my-10 md:my-16 space-y-10">
        <div>
          <h1 className="text-[#321463] font-medium text-xl md:text-lg mb-2"> Your content in our services</h1>
          <p className="text-[#4F547B] text-lg md:text-base">
          When you upload, submit, store, send or receive content to or through our Services, you give Front (and those we work with) a worldwide license to use, host, store, reproduce, modify, create derivative works (such as those resulting from translations, adaptations or other changes we make so that your content works better with our Services), communicate, publish, publicly perform, publicly display and distribute such content. The rights you grant in this license are for the limited purpose of operating, promoting, and improving our Services, and to develop new ones. This license continues even if you stop using our Services (for example, for a business listing you have added to Front Maps). Some Services may offer you ways to access and remove content that has been provided to that Service. Also, in some of our Services, there are terms or settings that narrow the scope of our use of the content submitted in those Services.
          </p>
        </div>
        <div>
          <h1 className="text-[#321463] font-medium text-xl md:text-lg mb-2"> Pay Attention</h1>
          <p className="text-[#4F547B] text-lg md:text-base">
          Our Services are very diverse, so sometimes additional terms or product requirements (including age requirements) may apply. Additional terms will be available with the relevant Services, and those additional terms become part of your agreement with us if you use.
          </p>
        </div>
        <div>
          <h1 className="text-[#321463] font-medium text-xl md:text-lg mb-2"> Using our services</h1>
          <p className="text-[#4F547B] text-lg md:text-base">
            You must follow any policies made available to you within the
            Services. Do not misuse our Services. For example, do not interfere
            with our Services or try to access them using a method other than
            the interface and the instructions that we provide. You may use our
            Services only as permitted by law, including applicable export and
            re-export control laws and regulations. We may suspend or stop
            providing our Services to you if you do not comply with our terms or
            policies or if we are investigating suspected misconduct. Using our
            Services does not give you ownership of any intellectual property
            rights in our Services or the content you access. You may not use
            content from our Services unless you obtain permission from its
            owner or are otherwise permitted by law. These terms do not grant
            you the right to use any branding or logos used in our Services.
            Do not remove, obscure, or alter any legal notices displayed in or
            along with our Services.
          </p>
        </div>
       
      </div>
      </div>
    </Layout>
  );
};

export default Page;

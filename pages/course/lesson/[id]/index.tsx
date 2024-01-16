"use client";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import { ILesson } from "@/utils/type.dt";

import { useRouter } from "next/navigation";
import { useRouter as QueryRouter } from "next/router";
import { _useContext } from "@/context/Context";
import { useEffect, useState } from "react";
import LessonDetails from "@/components/coursedetail/lesson/LessonDetails";

const Page: NextPage = () => {
  const router = useRouter();  
  const queryRouter = QueryRouter();
  const { user } = _useContext();
  const { id } = queryRouter.query;
  const [lesson, setLesson] = useState<ILesson | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  useEffect(() => {
    const getData = async () => {
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/lessons/${id}`,
          requestDetails
        );

        const lesson = (await response.json()) as ILesson;

        setLesson(lesson);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getData();
  });

  return (
    <Layout>
      <div className="md:px-14 md:py-10 p-5 sm:px-10 md:relative overflow-x-hidden">
        {lesson && <LessonDetails lesson={lesson} />}
      </div>
    </Layout>
  );
};

export default Page;

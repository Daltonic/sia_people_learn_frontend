"use client";

import LessonForm from "@/components/coursedetail/lesson/LessonForm";
import LessonHeader from "@/components/coursedetail/lesson/LessonHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { useRouter } from "next/navigation";
import { useRouter as QueryRouter } from "next/router";
import { _useContext } from "@/context/Context";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { ILesson } from "@/utils/type.dt";

const Page: NextPage<{ courseId: string }> = ({ courseId }) => {
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

        if (response.status === 400) {
          alert(await response.text());
        }

        const lesson = (await response.json()) as ILesson;

        setLesson(lesson);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getData();
  });
  return (
    <DashboardLayout>
      {lesson && (
        <>
          <LessonHeader
            headerHead="Edit Lesson"
            headerBody="Edit lesson for your Course"
          />
          <LessonForm
            courseId={lesson?.courseId!}
            lesson={lesson!}
            type="edit"
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default Page;

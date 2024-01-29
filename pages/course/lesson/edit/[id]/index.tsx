"use client";

import LessonForm from "@/components/coursedetail/lesson/LessonForm";
import LessonHeader from "@/components/coursedetail/lesson/LessonHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { useRouter as QueryRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { RootState } from "@/utils/type.dt";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { ILesson } from "@/utils/type.dt";

const Page: NextPage<{ courseId: string }> = ({ courseId }) => {
  const queryRouter = QueryRouter();

  const { id } = queryRouter.query;
  const [lesson, setLesson] = useState<ILesson | null>(null);

  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

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

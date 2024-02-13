import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { ILesson, RootState } from "@/utils/type.dt";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { createLesson, updateLesson } from "@/services/backend.services";

interface LessonProps {
  lesson?: ILesson;
  courseId: string;
  type: "create" | "edit";
}

const LessonForm: React.FC<LessonProps> = ({ lesson, courseId, type }) => {
  const router = useRouter();
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
  const [lessonDetails, setlessonDetails] = useState({
    title: lesson?.title || "",
    description: lesson?.description || "",
    overview: lesson?.overview || "",
    duration: lesson?.duration || 100,
    imageUrl: lesson?.imageUrl || "",
    videoUrl: lesson?.videoUrl || "",
    downloadableUrl: lesson?.downloadableUrl || "",
    order: lesson?.order || 0,
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setlessonDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (type === "create") {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          const status = await createLesson({
            title: lessonDetails.title,
            description: lessonDetails.description,
            overview: lessonDetails.overview,
            duration: Number(lessonDetails.duration),
            imageUrl: lessonDetails?.imageUrl,
            videoUrl: lessonDetails.videoUrl,
            downloadableUrl: lessonDetails.downloadableUrl,
            order: Number(lessonDetails.order),
            courseId: courseId,
          });
          if (status === 201) {
            setSubmitting(false);
            router.push(`/course/${courseId}`);
            resolve();
          } else {
            setSubmitting(false);
            reject();
          }
        }),
        {
          pending: "Saving ...",
          success: "Lesson saved successfully 👌",
          error: "Encountered error 🤯",
        }
      );
    } else {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          const status = await updateLesson(
            {
              title: lessonDetails.title,
              description: lessonDetails.description,
              overview: lessonDetails.overview,
              duration: Number(lessonDetails.duration),
              imageUrl: lessonDetails?.imageUrl,
              videoUrl: lessonDetails.videoUrl,
              downloadableUrl: lessonDetails.downloadableUrl,
              order: Number(lessonDetails.order),
            },
            lesson?._id!
          );
          if (status === 200) {
            setSubmitting(false);
            router.push(`/course/${courseId}`);
            resolve();
          } else {
            setSubmitting(false);
            reject();
          }
        }),
        {
          pending: "Updating ...",
          success: "Lesson updated successfully 👌",
          error: "Encountered error 🤯",
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-lg ">
      <h1 className="p-5 text-[#321463] font-medium border-b border-[#EDEDED] text-xl md:text-base">
        Lesson Details
      </h1>
      <form className="p-5" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter your product title"
          required
          inputType="text"
          value={lessonDetails.title}
          handleChange={handleChange}
        />
        <div className="md:flex gap-8">
          <TextAreaField
            label="Description"
            id="description"
            name="description"
            value={lessonDetails.description}
            handleChange={handleChange}
          />
          <TextAreaField
            label="Overview"
            id="overview"
            name="overview"
            value={lessonDetails.overview}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <InputField
            label="Duration (in minutes)"
            name="duration"
            placeholder="Lesson Duration"
            required
            inputType="number"
            value={lessonDetails.duration}
            handleChange={handleChange}
          />
          <InputField
            label="ImageURL"
            name="imageUrl"
            placeholder="Enter ImageURL"
            required={false}
            inputType="url"
            value={lessonDetails.imageUrl}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <InputField
            label="VideoURL"
            name="videoUrl"
            placeholder="Enter VideoUrl"
            required={false}
            inputType="url"
            value={lessonDetails.videoUrl}
            handleChange={handleChange}
          />
          <InputField
            label="Downloadable Url"
            name="downloadableUrl"
            placeholder="Enter DownloableURL"
            required={false}
            inputType="url"
            value={lessonDetails.downloadableUrl}
            handleChange={handleChange}
          />
          <InputField
            label="Order Number"
            name="order"
            placeholder="Enter Order"
            required
            inputType="number"
            value={lessonDetails.order}
            handleChange={handleChange}
          />
        </div>
        <Button variant="pink" className="mt-14" disabled={submitting}>
          {submitting
            ? type === "create"
              ? "Creating"
              : "Editting"
            : type === "create"
            ? "Create"
            : "Edit"}
        </Button>
      </form>
    </div>
  );
};

export default LessonForm;

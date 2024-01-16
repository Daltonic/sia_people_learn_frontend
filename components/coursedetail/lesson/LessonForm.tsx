import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import { _useContext } from "@/context/Context";
import { ILesson } from "@/utils/type.dt";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";

interface LessonProps {
  lesson?: ILesson;
  courseId: string;
  type: "create" | "edit";
}

const LessonForm: React.FC<LessonProps> = ({ lesson, courseId, type }) => {
  const router = useRouter();
  const { user } = _useContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  const [productDetails, setProductDetails] = useState({
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

    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);
    const {
      title,
      description,
      overview,
      duration,
      imageUrl,
      videoUrl,
      downloadableUrl,
      order,
    } = productDetails;

    const productInput = {
      title,
      description,
      overview,
      duration: Number(duration),
      imageUrl,
      videoUrl,
      downloadableUrl,
      order: Number(order),
    };

    const queryMethod = type === "create" ? "POST" : "PUT";
    const queryBody =
      type === "create" ? { ...productInput, courseId } : productInput;
    const url =
      type === "create"
        ? `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/lessons/create`
        : `${
            process.env.NEXT_PUBLIC_BACKEND_URI
          }/api/v1/lessons/update/${lesson?._id!}`;

    const requestDetails = {
      method: queryMethod,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(queryBody),
    };

    try {
      const response = await fetch(url, requestDetails);

      if (response.status === 400) {
        alert(await response.text());
      }

      await response.json();
      router.push(`/course/${courseId}`);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSubmitting(false);
      setProductDetails({
        title: "",
        description: "",
        overview: "",
        duration: 0,
        imageUrl: "",
        downloadableUrl: "",
        videoUrl: "",
        order: 0,
      });
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
          value={productDetails.title}
          handleChange={handleChange}
        />
        <div className="md:flex gap-8">
          <TextAreaField
            label="Description"
            id="description"
            name="description"
            value={productDetails.description}
            handleChange={handleChange}
          />
          <TextAreaField
            label="Overview"
            id="overview"
            name="overview"
            value={productDetails.overview}
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
            value={productDetails.duration}
            handleChange={handleChange}
          />
          <InputField
            label="ImageURL"
            name="imageUrl"
            placeholder="Enter ImageURL"
            required={false}
            inputType="url"
            value={productDetails.imageUrl}
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
            value={productDetails.videoUrl}
            handleChange={handleChange}
          />
          <InputField
            label="Downloadable Url"
            name="downloadableUrl"
            placeholder="Enter DownloableURL"
            required={false}
            inputType="url"
            value={productDetails.downloadableUrl}
            handleChange={handleChange}
          />
          <InputField
            label="Order Number"
            name="order"
            placeholder="Enter Order"
            required
            inputType="number"
            value={productDetails.order}
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

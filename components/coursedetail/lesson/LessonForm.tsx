import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import { _useContext } from "@/context/Context";
import { ICourse } from "@/utils/type.dt";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";

interface LessonProps {
  course?: ICourse;
  courseId: string;
  type: "create" | "edit";
}

const LessonForm: React.FC<LessonProps> = ({ course, courseId, type }) => {
  const router = useRouter();
  const { user } = _useContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    overview: "",
    duration: 100,
    imageUrl: "",
    videoUrl: "",
    downloadableUrl: "",
    order: 0,
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
      courseId,
    };

    const requestDetails = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(productInput),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/lessons/create`,
        requestDetails
      );

      if (response.status === 400) {
        alert(await response.text());
      }

      const { result } = await response.json();
      console.log(result);
      router.push(`/course/${courseId}`);
    } catch (e: any) {
      console.log(e.message);
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

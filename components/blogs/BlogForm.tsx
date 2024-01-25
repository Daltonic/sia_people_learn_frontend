import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import SelectField from "@/components/reusableComponents/SelectField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import { _useContext } from "@/context/Context";
import { IPost } from "@/utils/type.dt";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { categories } from "@/data/blogs";

interface PostProps {
  post?: IPost;
  type: "create" | "edit";
}

const postCategory = categories
  .map((category) => ({ label: category, value: category }))
  .filter((category) => category.label !== "All Categories");

const PostForm: React.FC<PostProps> = ({ post, type }) => {
  const router = useRouter();
  const { user } = _useContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  const [postDetails, setPostDetails] = useState({
    title: post?.title || "",
    description: post?.description || "",
    overview: post?.overview || "",
    imageUrl: post?.imageUrl || "",
    category: post?.category || "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setPostDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);
    const { title, description, overview, imageUrl, category } = postDetails;

    const postInput = {
      title,
      description,
      overview,
      imageUrl,
      category,
      userId: user?._id,
    };

    const queryMethod = type === "create" ? "POST" : "PUT";
    const queryBody =
      type === "create" ? { ...postInput, userId: user?._id } : postInput;

    const url =
      type === "create"
        ? `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts/create`
        : `${
            process.env.NEXT_PUBLIC_BACKEND_URI
          }/api/v1/posts/update/${post?._id!}`;

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
        const message = response.text();
        alert(message);
      }

      const { result } = await response.json();

      router.push("/(dashboard)/myBlogs");
    } catch (e: any) {
      console.log(e.message);
      alert(e.message);
    } finally {
      setSubmitting(false);
      setPostDetails({
        title: "",
        description: "",
        overview: "",
        category: "",
        imageUrl: "",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg ">
      <h1 className="p-5 text-[#321463] font-medium border-b border-[#EDEDED] text-xl md:text-base">
        Blog Details
      </h1>
      <form className="p-5" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter your product title"
          required
          inputType="text"
          value={postDetails.title}
          handleChange={handleChange}
        />
        <div className="md:flex gap-8">
          <TextAreaField
            label="Description"
            id="description"
            name="description"
            value={postDetails.description}
            handleChange={handleChange}
          />
          <TextAreaField
            label="Overview"
            id="overview"
            name="overview"
            value={postDetails.overview}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <InputField
            label="ImageURL"
            name="imageUrl"
            placeholder="Enter Product ImageURL"
            required={false}
            inputType="url"
            value={postDetails.imageUrl}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <SelectField
            label="Category"
            name="category"
            options={postCategory}
            value={postDetails.category}
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

export default PostForm;

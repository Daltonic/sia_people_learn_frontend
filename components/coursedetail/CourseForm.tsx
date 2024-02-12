import Badge from "@/components/reusableComponents/Badge";
import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import SelectField from "@/components/reusableComponents/SelectField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import { ICourse, RootState } from "@/utils/type.dt";
import { useRouter } from "next/navigation";
import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  SyntheticEvent,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import FilePicker from "../reusableComponents/FilePicker";
import WYSIWYG from "../reusableComponents/WYSIWYG";
import axios from "axios";
import { toast } from "react-toastify";
import { updateCourse } from "@/services/backend.services";

interface CourseProps {
  course: ICourse;
}

const CourseForm: React.FC<CourseProps> = ({ course }) => {
  const [editorContent, setEditorContent] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);
  const [productDetails, setProductDetails] = useState({
    title: course.name,
    description: course.description,
    overview: course.overview,
    price: course.price,
    imageUrl: course.imageUrl || "",
    difficulty: course.difficulty,
    productType: course.type,
    tags: course.tags ? course.tags.map((tag) => tag.name) : [],
    requirements: course.requirements ? course.requirements : [],
    highlights: course.highlights ? course.highlights : [],
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: "tags" | "requirements" | "highlights"
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const input = e.target as HTMLInputElement;
      const value = input.value.trim();

      if (value !== "") {
        switch (field) {
          case "highlights":
            if (!productDetails.highlights.includes(value)) {
              setProductDetails((prev) => ({
                ...prev,
                highlights: [...prev.highlights, value],
              }));
              input.value = "";
            } else {
              input.value = "";
            }
            break;
          case "requirements":
            if (!productDetails.requirements.includes(value)) {
              setProductDetails((prev) => ({
                ...prev,
                requirements: [...prev.requirements, value],
              }));
              input.value = "";
            } else {
              input.value = "";
            }
            break;

          case "tags":
            if (!productDetails.tags.includes(value)) {
              setProductDetails((prev) => ({
                ...prev,
                tags: [...prev.tags, value],
              }));
              input.value = "";
            } else {
              input.value = "";
            }
            break;
        }
      }
    }
  };

  const handleRemoveItem = (
    field: "highlights" | "requirements" | "tags",
    value: string
  ) => {
    switch (field) {
      case "highlights":
        const newHighlights = productDetails.highlights.filter(
          (highlight: string) => highlight !== value
        );
        setProductDetails((prev) => ({ ...prev, highlights: newHighlights }));
        break;
      case "requirements":
        const newRequirements = productDetails.requirements.filter(
          (requirement: string) => requirement !== value
        );
        setProductDetails((prev) => ({
          ...prev,
          requirements: newRequirements,
        }));
        break;
      case "tags":
        const newTags = productDetails.tags.filter(
          (tag: string) => tag !== value
        );
        setProductDetails((prev) => ({ ...prev, tags: newTags }));
        break;
    }
  };

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

    if (
      userData?.userType !== "instructor" &&
      String(userData?._id) === String(course.userId._id)
    ) {
      toast.warn("Only course instructor can update this course");
    }

    setSubmitting(true);

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await updateCourse(
          {
            name: productDetails.title,
            description: editorContent,
            overview: productDetails.overview,
            imageUrl: productDetails.imageUrl,
            price: Number(productDetails.price),
            difficulty: productDetails.difficulty,
            requirements: productDetails.requirements,
            tags: productDetails.tags,
            highlights: productDetails.highlights,
            type: productDetails.productType as "Book" | "Course",
          },
          course._id
        );

        if (status === 200) {
          router.push("/(dashboard)/myProducts");
          setSubmitting(false);
          resolve();
        } else {
          setSubmitting(false);
          reject();
        }
      }),
      {
        pending: `Updating your ${productDetails.productType}...`,
        success: `${productDetails.productType} updated successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  return (
    <div className="bg-white rounded-lg ">
      <h1 className="p-5 text-[#321463] font-medium border-b border-[#EDEDED] text-xl md:text-base">
        Product Details
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
            label="Overview"
            id="overview"
            name="overview"
            value={productDetails.overview}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <FilePicker
            type="Image"
            label="Image Url"
            fileName={imageUrl}
            setFileName={setImageUrl}
          />
          <InputField
            label="Price"
            name="price"
            placeholder="Course Price"
            required
            inputType="number"
            value={productDetails.price}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <SelectField
            label="Difficulty"
            name="difficulty"
            options={[
              { label: "Beginner", value: "Beginner" },
              { label: "Intermediate", value: "Intermediate" },
              { label: "Advance", value: "Advanced" },
            ]}
            value={productDetails.difficulty}
            handleChange={handleChange}
          />
        </div>

        <div className="md:flex gap-8">
          <SelectField
            label=" Product Type"
            name="productType"
            options={[
              { label: "Select", value: "option1" },
              { label: "Course", value: "Course" },
              { label: "Academy", value: "Academy" },
              { label: "Book", value: "Book" },
            ]}
            value={productDetails.productType}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <div className="flex flex-col gap-2 w-1/2">
            <InputField
              label="Product Requirements?"
              name="requirements"
              placeholder="Enter Product Requirements"
              required={false}
              inputType="text"
              handleKeyDown={(e) => handleInputKeyDown(e, "requirements")}
            />
            <div className="flex flex-wrap w-full gap-2">
              {productDetails.requirements.map((requirement, index) => (
                <Badge
                  key={index}
                  inputText={requirement}
                  imageUrl="/images/cancel.png"
                  handleIconClick={() =>
                    handleRemoveItem("requirements", requirement)
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <InputField
              label="Tags"
              name="tags"
              placeholder="Enter Tags"
              required={false}
              inputType="text"
              handleKeyDown={(e) => handleInputKeyDown(e, "tags")}
            />
            <div className="flex flex-wrap w-full gap-2">
              {productDetails.tags.map((tag, index) => (
                <Badge
                  key={index}
                  inputText={tag}
                  imageUrl="/images/cancel.png"
                  handleIconClick={() => handleRemoveItem("tags", tag)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <InputField
            label="What will students learn on your course?"
            name="highlights"
            placeholder="Enter Product Highlights"
            required={false}
            inputType="text"
            handleKeyDown={(e) => handleInputKeyDown(e, "highlights")}
          />
          <div className="flex flex-col gap-2 w-full">
            {productDetails.highlights.map((highlight, index) => (
              <Badge
                key={index}
                inputText={highlight}
                imageUrl="/images/cancel.png"
                handleIconClick={() =>
                  handleRemoveItem("highlights", highlight)
                }
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full my-3 relative">
          <WYSIWYG
            value={productDetails.description}
            handleChange={(content) => setEditorContent(content)}
          />
        </div>

        <Button variant="pink" className="mt-14" disabled={submitting}>
          {submitting ? "Editting" : "Edit"}
        </Button>
      </form>
    </div>
  );
};

export default CourseForm;

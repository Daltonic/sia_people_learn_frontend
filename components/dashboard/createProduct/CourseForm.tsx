import Badge from "@/components/reusableComponents/Badge";
import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import SelectField from "@/components/reusableComponents/SelectField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
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
import { RootState } from "@/utils/type.dt";
import WYSIWYG from "@/components/reusableComponents/WYSIWYG";
import { toast } from "react-toastify";
import { createAcademy, createCourse } from "@/services/backend.services";
import FileUploader from "@/components/reusableComponents/FileUploader";
import Image from "next/image";
import { uploaderActions } from "@/store/uploaderSlice";
import { FaArrowsRotate, FaTrashCan } from "react-icons/fa6";

const CourseForm: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { setUploaderModal } = uploaderActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    overview: "",
    price: 0,
    imageUrl: "",
    difficulty: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    productType: "Course" as "Academy" | "Course" | "Book",
    tags: [] as string[],
    requirements: [] as string[],
    highlights: [] as string[],
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

  const handleImageMount = (imageUrl: string) => {
    setProductDetails((prev) => ({
      ...prev,
      imageUrl,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (userData?.userType !== "instructor") {
      throw new Error("Only instructors can create products");
    }

    setSubmitting(true);

    if (productDetails.productType === "Academy") {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          const status = await createAcademy({
            name: productDetails.title,
            description: editorContent,
            overview: productDetails.overview,
            imageUrl: productDetails.imageUrl,
            price: Number(productDetails.price),
            difficulty: productDetails.difficulty,
            requirements: productDetails.requirements,
            tags: productDetails.tags,
            highlights: productDetails.highlights,
          });

          if (status === 201) {
            router.push("/(dashboard)/myProducts");
            setSubmitting(false);
            resetForm();
            resolve();
          } else {
            setSubmitting(false);
            reject();
          }
        }),
        {
          pending: "Saving your Academy...",
          success: "Academy saved successfully 👌",
          error: "Encountered error 🤯",
        }
      );
    } else {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          const status = await createCourse({
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
          });

          if (status === 201) {
            router.push("/(dashboard)/myProducts");
            setSubmitting(false);
            resetForm();
            resolve();
          } else {
            setSubmitting(false);
            reject();
          }
        }),
        {
          pending: `Saving your ${productDetails.productType}...`,
          success: `${productDetails.productType} saved successfully 👌`,
          error: "Encountered error 🤯",
        }
      );
    }
  };

  const resetForm = () => {
    setProductDetails({
      title: "",
      description: "",
      overview: "",
      price: 0,
      imageUrl: "",
      difficulty: "Beginner",
      productType: "Course",
      tags: [] as string[],
      requirements: [] as string[],
      highlights: [] as string[],
    });
  };

  return (
    <div className="bg-white rounded-lg ">
      <div className="p-5 border-b border-[#EDEDED]">
        {!productDetails.imageUrl && (
          <Button
            onClick={() => dispatch(setUploaderModal("scale-100"))}
            className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)]"
          >
            Add Image
          </Button>
        )}

        {productDetails.imageUrl && (
          <div className="relative">
            <div className="flex justify-start items-center space-x-2 absolute top-2 left-2">
              <Button
                onClick={() => dispatch(setUploaderModal("scale-100"))}
                className="bg-black bg-opacity-25 text-white"
              >
                <FaArrowsRotate size={20} />
              </Button>

              <Button
                onClick={() =>
                  setProductDetails((prev) => ({ ...prev, imageUrl: "" }))
                }
                className="bg-black bg-opacity-25 text-white"
              >
                <FaTrashCan size={20} />
              </Button>
            </div>
            <Image
              src={productDetails.imageUrl}
              alt={productDetails.title || "Product"}
              width={500}
              height={100}
              className="h-72 w-full object-cover"
            />
          </div>
        )}
      </div>
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
          <InputField
            label="Price"
            name="price"
            placeholder="Course Price"
            required
            inputType="number"
            value={productDetails.price}
            handleChange={handleChange}
          />
          <InputField
            label="ImageURL"
            name="imageUrl"
            placeholder="Enter Product ImageURL"
            required={false}
            inputType="url"
            value={productDetails.imageUrl}

            // handleChange={handleChange}
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
                  imageUrl="/images/general/cancel.png"
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
                  imageUrl="/images/general/cancel.png"
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
                imageUrl="/images/general/cancel.png"
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
          {submitting ? "Creating" : "Create"}
        </Button>
      </form>

      <FileUploader
        onUploadSuccess={(response) => handleImageMount(response.url)}
        accept="image/png,image/jpeg,image/jpg"
      />
    </div>
  );
};

export default CourseForm;

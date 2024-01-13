import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import SelectField from "@/components/reusableComponents/SelectField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import { _useContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  SyntheticEvent,
  useEffect,
} from "react";

const CourseForm: React.FC = () => {
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
    price: 0,
    imageUrl: "",
    difficulty: "Beginner",
    productType: "Course",
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

    if (user?.userType !== "instructor") {
      throw new Error("Only instructors can create products");
    }

    setSubmitting(true);
    const {
      title,
      description,
      overview,
      price,
      imageUrl,
      difficulty,
      productType,
      tags,
      highlights,
      requirements,
    } = productDetails;

    const productInput = {
      name: title,
      description,
      overview,
      imageUrl,
      price: Number(price),
      difficulty,
      requirements,
      tags,
      highlights,
    };

    if (productType === "Academy") {
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
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/create`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        }

        const { result } = await response.json();
        console.log(result);
        router.push("/(dashboard)/dashboard");
      } catch (e: any) {
        console.log(e.message);
        alert(e.message);
      } finally {
        setSubmitting(false);
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
      }
    } else {
      const requestDetails = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ ...productInput, type: productType }),
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/courses/create`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        }

        const { result } = await response.json();
        console.log(result);
        router.push("/(dashboard)/dashboard");
      } catch (e: any) {
        console.log(e.message);
        alert(e.message);
      } finally {
        setSubmitting(false);
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
      }
    }
  };

  console.log(productDetails);

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
            inputType="text"
            value={productDetails.imageUrl}
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
          {/* <SelectField
            name="language"
            label="Audio Language"
            options={[{ label: "English", value: "option1" }]}
            value=""
            handleChange={handleChange}
          /> */}
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
          <div className="flex flex-col gap-2">
            <InputField
              label="Product Requirements?"
              name="requirements"
              placeholder="Enter Product Requirements"
              required={false}
              inputType="text"
              handleKeyDown={(e) => handleInputKeyDown(e, "requirements")}
            />
            <ol>
              {productDetails.requirements.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ol>
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
            <ol>
              {productDetails.highlights.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-2">
            <InputField
              label="Tags"
              name="tags"
              placeholder="Enter Tags"
              required={false}
              inputType="text"
              handleKeyDown={(e) => handleInputKeyDown(e, "tags")}
            />
            <ol>
              {productDetails.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ol>
          </div>
        </div>
        {/* <div className="md:flex gap-8">
          <TextAreaField
            label="What will students learn in your course?"
            id="learn"
          />
          <TextAreaField label="Requirements" id="requirement" />
        </div> */}
        <Button
          variant="pink"
          className=""
          style={{ width: "100%", marginTop: "14px", padding: "16px" }}
          disabled={submitting}
        >
          {submitting ? "Creating" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default CourseForm;

import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import SelectField from "@/components/reusableComponents/SelectField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import { IPost, RootState } from "@/utils/type.dt";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { categories } from "@/data/blogs";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import WYSIWYG from "../reusableComponents/WYSIWYG";
import { toast } from "react-toastify";
import { createPost, updatePost } from "@/services/backend.services";
import FileUploader from "../reusableComponents/FileUploader";
import { FaArrowsRotate, FaTrashCan } from "react-icons/fa6";
import Image from "next/image";
import { uploaderActions } from "@/store/slices/uploaderSlice";

interface PostProps {
  post?: IPost;
  type: "create" | "edit";
  category?: string;
  isComment?: boolean;
  parentId?: string | null;
}

const postCategory = categories
  .map((category) => ({ label: category, value: category }))
  .filter((category) => category.label !== "All Categories");

const PostForm: React.FC<PostProps> = ({
  post,
  type,
  category,
  isComment = false,
  parentId,
}) => {
  const categoryOptions = isComment
    ? [{ label: category!, value: category! }]
    : postCategory;

  const router = useRouter();
  const [editorContent, setEditorContent] = useState<string>("");

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
  const [postDetails, setPostDetails] = useState({
    title: post?.title || "",
    description: post?.description || "",
    overview: post?.overview || "",
    imageUrl: post?.imageUrl || "",
    category: post?.category || category || "",
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

    if (!postDetails.title || !postDetails.overview || !postDetails.category) {
      alert("Missing required fields");
      return;
    }

    setSubmitting(true);

    const postInput = {
      parentId: "",
      description: editorContent,
      overview: postDetails.overview,
      category: postDetails.category,
      title: postDetails.title,
      imageUrl: postDetails.imageUrl,
    };

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        if (type === "create") {
          createPost(postInput)
            .then((result) => {
              const redirectUrl = parentId
                ? `/blogs/${parentId}`
                : "/(dashboard)/myBlogs";
              router.push(redirectUrl);
              resetForm();
              resolve(result);
              setSubmitting(false);
            })
            .catch((error) => {
              setSubmitting(false);
              reject(error);
            });
        } else {
          updatePost(postInput, String(post?._id))
            .then((result) => {
              router.push("/(dashboard)/myBlogs");
              resolve(result);
              setSubmitting(false);
            })
            .catch((error) => {
              setSubmitting(false);
              reject(error);
            });
        }
      }),
      {
        pending: "Processing...",
        success: "Successfully saved 👌",
        error: "Encountered error 🤯",
      }
    );
  };

  const handleImageMount = (imageUrl: string) => {
    setPostDetails((prev) => ({
      ...prev,
      imageUrl,
    }));
  };

  const resetForm = () => {
    setPostDetails({
      title: "",
      description: "",
      overview: "",
      category: "",
      imageUrl: "",
    });
  };

  return (
    <div className="bg-white rounded-lg ">
      <div className="p-5 border-b border-[#EDEDED]">
        {!postDetails.imageUrl && (
          <Button
            onClick={() => dispatch(setUploaderModal("scale-100"))}
            className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)]"
          >
            Add Image
          </Button>
        )}

        {postDetails.imageUrl && (
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
                  setPostDetails((prev) => ({ ...prev, imageUrl: "" }))
                }
                className="bg-black bg-opacity-25 text-white"
              >
                <FaTrashCan size={20} />
              </Button>
            </div>
            <Image
              src={postDetails.imageUrl}
              alt={postDetails.title || "Product"}
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
          value={postDetails.title}
          handleChange={handleChange}
        />
        <div className="md:flex gap-8">
          <TextAreaField
            label="Overview"
            id="overview"
            name="overview"
            value={postDetails.overview}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <SelectField
            label="Category"
            name="category"
            options={categoryOptions}
            value={postDetails.category}
            // defaultValue={postCategory[0].value}
            handleChange={handleChange}
          />
        </div>

        <div className="flex flex-col w-full my-3 relative">
          <label className="text-violet-950 font-medium">Description</label>
          <WYSIWYG
            value={postDetails.description}
            handleChange={(content) => setEditorContent(content)}
          />
        </div>

        <Button variant="pink" className="mt-14" disabled={submitting}>
          {submitting
            ? type === "create"
              ? "Creating"
              : "Updating"
            : type === "create"
            ? "Create"
            : "Update"}
        </Button>
      </form>

      <FileUploader
        onUploadSuccess={(response) => handleImageMount(response.url)}
        accept="image/png,image/jpeg,image/jpg"
      />
    </div>
  );
};

export default PostForm;

import { IPost, RootState } from "@/utils/type.dt";
import BlogDetail from "./BlogDetail";
import ReviewForm from "./ReviewForm";
import CommentsSection from "./CommentsSection";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Button from "../reusableComponents/Button";
import InputField from "../reusableComponents/InputField";
import TextAreaField from "../reusableComponents/TextAreaField";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {
  post: IPost;
}

const Blog: React.FC<Props> = ({ post }) => {
  const { userData } = useSelector((states: RootState) => states.userStates);
  const router = useRouter();
  const [openCommentForm, setOpenCommentForm] = useState<boolean>(false);
  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    overview: "",
    imageUrl: "",
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
    const { description, overview, imageUrl, title } = postDetails;

    const postInput = {
      title,
      description,
      overview,
      imageUrl,
      category: post.category,
      userId: userData?._id,
      parentId: post._id,
    };

    const queryBody = postInput;

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts/create`;

    const requestDetails = {
      method: "POST",
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

      router.push(`/blogs/${post._id}`);
      setPostDetails({
        description: "",
        overview: "",
        imageUrl: "",
        title: "",
      });
    } catch (e: any) {
      console.log(e.message);
      alert(e.message);
    } finally {
      setSubmitting(false);
      setOpenCommentForm(false);
    }
  };
  return (
    <div className="flex flex-col items-center px-5 sm:px-10 md:px-20">
      <BlogDetail post={post} />
      <section className="flex justify-center w-full mt-5 md:mt-16">
        <div className="w-full md:w-4/5">
          <div className="md:flex justify-center">
            <div>
              <div>
                <h4 className="font-medium text-lg text-[#321463]">
                  {post.overview}
                </h4>
                <p className="mt-2 md:mt-5 text-[#4F547B]">
                  {post.description}
                </p>
              </div>
            </div>
          </div>
          {userData && (
            <div
              className="mt-4 px-2 py-1 rounded-sm bg-slate-200 cursor-pointer w-fit"
              onClick={() => setOpenCommentForm((prev) => !prev)}
            >
              Add Comment
            </div>
          )}
          {openCommentForm && (
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

              <Button variant="pink" className="mt-14" disabled={submitting}>
                {submitting ? "Commenting" : "Comment"}
              </Button>
            </form>
          )}
          {post.comments && post.comments.length > 0 && (
            <CommentsSection comments={post.comments} />
          )}
          <ReviewForm />
        </div>
      </section>
    </div>
  );
};

export default Blog;

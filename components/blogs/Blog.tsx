import { IPost } from "@/utils/type.dt";
import BlogDetail from "./BlogDetail";
import ReviewForm from "./ReviewForm";
import CommentsSection from "./CommentsSection";
import { useState } from "react";

interface Props {
  post: IPost;
}

const Blog: React.FC<Props> = ({ post }) => {
  const [openCommentForm, setOpenCommentForm] = useState<boolean>(false);
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

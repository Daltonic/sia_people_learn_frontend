import { IPost, RootState } from "@/utils/type.dt";
import BlogDetail from "./BlogDetail";
import ReviewForm from "./ReviewForm";
import CommentsSection from "./CommentsSection";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import { userActions } from "@/store/userSlice";

interface Props {
  post: IPost;
}

const Blog: React.FC<Props> = ({ post }) => {
  const { userData } = useSelector((states: RootState) => states.userStates);
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const [openCommentForm, setOpenCommentForm] = useState<boolean>(false);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

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
                <div
                  dangerouslySetInnerHTML={{ __html: post.description }}
                  className="mt-2 md:mt-5 text-[#4F547B]"
                />
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
            <BlogForm
              type="create"
              category={post.category}
              isComment={true}
              parentId={post._id}
            />
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

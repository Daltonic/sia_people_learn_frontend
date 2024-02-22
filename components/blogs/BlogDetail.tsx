import React from "react";
import { IPost, RootState } from "@/utils/type.dt";
import { convertStringToDate } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deletePost } from "@/services/backend.services";

interface ComponentProps {
  post: IPost;
}

const BlogDetail: React.FC<ComponentProps> = ({ post }) => {
  const { userData } = useSelector((states: RootState) => states.userStates);
  const router = useRouter();

  const handleDelete = async () => {
    const token = sessionStorage.getItem("accessToken") as string;

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await deletePost(post._id, token);
        if (status === 200) {
          resolve(status);
          router.push("/blogs");
        } else {
          reject();
        }
      }),
      {
        pending: `Deleting Blog Post...`,
        success: `Blog post deleted successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };
  return (
    <>
      <section className="my-5 md:my-10">
        <div className="text-center">
          <div>
            <h1 className="text-[#C5165D] text-sm uppercase font-medium">
              {post.category}
            </h1>

            <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-medium md:leading-[55px] capitalize w-full md:mt-3 max-md:max-w-full">
              {post.title.split(" ").slice(0, 4).join(" ")}
              <br />
              {post.title.split(" ").slice(4, -1).join(" ")}
            </h1>

            <p className="md:text-xs text-[#4F547B] mt-3">
              {convertStringToDate(post.createdAt)}
            </p>
          </div>
        </div>
      </section>

      {userData?._id === post.userId._id && (
        <div className="flex justify-between items-center gap-2">
          <Link
            href={`/blogs/edit/${post._id}`}
            className="rounded-lg px-4 py-2 w-fit bg-slate-200"
          >
            Edit Post
          </Link>
          <div
            className="rounded-lg px-4 py-2 w-fit bg-red-300 cursor-pointer"
            onClick={handleDelete}
          >
            Delete Post
          </div>
        </div>
      )}

      <section className="w-full mt-4">
        <div
          className="rounded-xl w-full h-[30vh] md:h-[100vh]"
          style={{
            backgroundImage: `url(${
              post.imageUrl || "/images/blog-list/2.svg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          data-bg="/assets/img/coursesCards/1.png"
        />
      </section>
    </>
  );
};

export default BlogDetail;

import BlogCard from "@/components/blogs/BlogCard";
import { IPosts, RootState } from "@/utils/type.dt";
import { useEffect } from "react";
import DashboardHeading from "../dashboardLayout/DashboardHeading";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";

interface Props {
  postsData: IPosts;
}

const Blogs: React.FC<Props> = ({ postsData }) => {
  console.log(postsData);
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);
  return (
    <>
      <DashboardHeading title="Blogs" description="View and Manage all Blogs" />
      <div className="flex justify-between  w-full flex-wrap">
        {postsData.posts &&
          postsData.posts.map((post, index) => (
            <BlogCard key={post._id} blog={post} i={index} />
          ))}
      </div>
    </>
  );
};

export default Blogs;

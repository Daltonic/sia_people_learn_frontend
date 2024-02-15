interface Props {
  publishedPostsData: IPosts;
  unpublishedPostsData: IPosts;
}

import Tabs from "./Tabs";
import DashboardHeading from "../dashboardLayout/DashboardHeading";
import { IPosts } from "@/utils/type.dt";

const Blogs: React.FC<Props> = ({
  publishedPostsData,
  unpublishedPostsData,
}) => {
  return (
    <div className="">
      <DashboardHeading
        title="Blogs"
        description="Access your blogs, create new blogs, and view all blogs"
      />
      <Tabs
        publishedPostsData={publishedPostsData}
        unpublishedPostsData={unpublishedPostsData}
      />
    </div>
  );
};

export default Blogs;

import BlogCard from "@/components/blogs/BlogCard";
import { FetchPostsParams, IPosts, RootState } from "@/utils/type.dt";
import { useEffect, useRef, useState } from "react";
import DashboardHeading from "../dashboardLayout/DashboardHeading";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import { CiSearch } from "react-icons/ci";
import LocalFilters from "@/components/reusableComponents/LocalFilter";
import LocalPagination from "@/components/reusableComponents/LocalPagination";
import { fetchPosts } from "@/services/backend.services";

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

const booleanOptions = [
  { name: "Status", value: "All" },
  { name: "All", value: "All" },
  { name: "True", value: "true" },
  { name: "False", value: "false" },
];

interface Props {
  postsData: IPosts;
  options?: boolean
}

const Blogs: React.FC<Props> = ({ postsData }) => {
  
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

  const firstRender = useRef(true);

  const [postsObj, setPostsObj] = useState<IPosts>(postsData);

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("newest");
  const [deleted, setDeleted] = useState<string>("");
  const [published, setPublished] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const updateSearch = async () => {
    const token = sessionStorage.getItem("accessToken") as string;

    try {
      const result = await fetchPosts(
        {
          searchQuery: search,
          filter: sort as FetchPostsParams["filter"],
          page: Number(currentPage) || 1,
          deleted:
            deleted === "All" ? null : (deleted as FetchPostsParams["deleted"]),
          published:
            published === "All"
              ? null
              : (published as FetchPostsParams["published"]),
        },
        token
      );
      setPostsObj(result);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (search) {
      const delaydebounceFn = setTimeout(() => {
        updateSearch();
      }, 300);

      return () => clearTimeout(delaydebounceFn);
    } else {
      updateSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, currentPage, sort, deleted, published]);

  return (
    <>
      <DashboardHeading title="Blogs" description="View and Manage all Blogs" />
      <div className="bg-white p-5 rounded-xl">
        <div className="flex flex-wrap items-center gap-5 md:justify-between mb-4">
          <div className="flex gap-5 items-center border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2 w-full md:w-96">
            <CiSearch className="text-[#4F547B] text-xl" />
            <input
              type="text"
              placeholder="Search Blogs Here..."
              className="focus:outline-none w-full text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <LocalFilters
            label="Filter"
            options={booleanOptions}
            currFilter={published}
            setCurrFilter={setPublished}
          />
          <LocalFilters
            label="Filter"
            options={booleanOptions}
            currFilter={deleted}
            setCurrFilter={setDeleted}
          />
          <LocalFilters
            label="Order By"
            options={sortOptions}
            currFilter={sort}
            setCurrFilter={setSort}
          />
        </div>
        <div className="flex justify-between gap-5 w-full flex-wrap">
          {postsObj.posts &&
            postsObj.posts.map((post, index) => (
              <BlogCard key={post._id} blog={post} i={index} />
            ))}
        </div>
        {postsObj.numOfPages > 1 && (
          <LocalPagination
            totalPages={postsObj.numOfPages}
            activePage={currentPage}
            setActivePage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default Blogs;

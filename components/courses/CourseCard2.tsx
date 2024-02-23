import { ICourse, IWishlist, RootState } from "@/utils/type.dt";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/cartSlice";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createWishlist } from "@/services/backend.services";

interface Props {
  course: ICourse;
  bookMarkedCourses: IWishlist[];
}

const CourseCard: React.FC<Props> = ({ course, bookMarkedCourses }) => {
  const [rating, setRating] = useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [course]);
  const { userData } = useSelector((states: RootState) => states.userStates);

  const isBookmarkable = () => {
    const courseSaved = bookMarkedCourses.find(
      (wishlist) => wishlist.productId._id === course._id
    );
    const sub = userData?.subscribedCourses.find((id) => id === course._id);
    if (sub !== undefined || courseSaved !== undefined) {
      return false;
    } else {
      return true;
    }
  };

  const [canBookmark, setCanBookmark] = useState<boolean>(isBookmarkable());

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setCanBookmark(isBookmarkable());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course._id, userData, bookMarkedCourses]);

  const { cartCourseItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  );
  const { setCartCourseItems, setCartAmount } = cartActions;
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState<string>(() => {
    const currentCourse = cartCourseItems.find(
      (item) => item._id === course._id
    );
    return currentCourse ? "Remove from Cart" : "Add to Cart";
  });

  useEffect(() => {
    const currentCourse = cartCourseItems.find(
      (item) => item._id === course._id
    );
    setButtonText(currentCourse ? "Remove from Cart" : "Add to Cart");
  }, [cartCourseItems, course._id]);

  const handleAddToWishlist = async () => {
    if (!userData) {
      sessionStorage.setItem("prevPath", pathname);
      router.push("/login");
      return;
    }
    const token = sessionStorage.getItem("accessToken") as string;

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        createWishlist(
          { productType: "Course", productId: course._id },
          token
        ).then((status) => {
          if (status === 201) {
            setCanBookmark(false);
            resolve(status);
          } else {
            reject();
          }
        });
      }),
      {
        pending: "Adding to Wishlist",
        success: "Successfully saved 👌",
        error: "Encountered error 🤯",
      }
    );
  };

  const handleAddToCart = () => {
    const cartCourse = cartCourseItems.find((item) => item._id === course._id);
    if (cartCourse) {
      const updatedCourses = cartCourseItems.filter(
        (item) => item._id !== course._id
      );
      dispatch(setCartCourseItems(updatedCourses));
      sessionStorage.setItem("sessionCourses", JSON.stringify(updatedCourses));
      setButtonText("Add To Cart");
      const newCartAmount = cartAmount - course.price;
      sessionStorage.setItem("cartAmount", JSON.stringify(newCartAmount));
      dispatch(setCartAmount(newCartAmount));
    } else {
      const updatedCourses = [...cartCourseItems, course];
      dispatch(setCartCourseItems(updatedCourses));
      sessionStorage.setItem("sessionCourses", JSON.stringify(updatedCourses));
      setButtonText("Remove from Cart");
      const newCartAmount = cartAmount + course.price;
      sessionStorage.setItem("cartAmount", JSON.stringify(newCartAmount));
      dispatch(setCartAmount(newCartAmount));
    }
  };

  return (
    <div className=" flex md:flex-row flex-col w-full border-b border-[#EDEDED] py-5">
      <div className="flex flex-col items-stretch md:w-4/5">
        <div className="flex md:flex-row flex-col items-start">
          <Link
            className="w-full h-36 md:w-[28%]"
            key={course._id}
            href={`/coursedetail/${course._id}`}
          >
            <Image
              width={500}
              height={500}
              className="rounded-md object-cover w-full h-full"
              src={course.imageUrl || "/images/general/cardimg.svg"}
              alt="image"
            />
          </Link>

          <div className="md:ml-3 flex flex-col items-stretch md:w-[70%] mt-3 md:mt-0">
            <div className="flex flex-col gap-1.5 my-auto md:px-5 items-start">
              <div className="flex items-center text-sm gap-3">
                <div className="flex items-center gap-1">
                  <p className="text-[#E59819]">{course.rating}</p>
                  <div className="flex items-center">
                    {rating.map((itm, i: number) => (
                      <div key={i} className="text-[#E59819]">
                        <IoIosStar className="text-sm text-[#E59819] mx-0.5" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[#4F547B]">({course.reviewsCount})</div>
              </div>
              <Link
                key={course._id}
                href={`/coursedetail/${course._id}`}
                className="text-violet-950 text-lg font-medium capitalize self-stretch"
              >
                {course.name}
              </Link>

              <div className="text-slate-600 text-sm leading-6 self-stretch line-clamp-1">
                {course.overview}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {course.userId.imgUrl ? (
                  <Image
                    width={10}
                    height={10}
                    src={course.userId.imgUrl || "/images/courseCard/card1.svg"}
                    alt="image"
                    className="object-cover rounded-full w-8 h-8"
                  />
                ) : (
                  <div className="rounded-full w-8 h-8 text-white px-4 bg-[#C5165D] text-sm flex items-center justify-center">
                    {course.userId.firstName[0]}
                    {course.userId.lastName[0]}
                  </div>
                )}
                <p className="text-sm text-[#4F547B]">
                  {course.userId.firstName} {course.userId.lastName}
                </p>

                <div className=" flex items-center gap-1">
                  <Image
                    width={14}
                    height={14}
                    src="/images/home/coursesCards/icons/1.svg"
                    alt="icon"
                  />
                  <p className="text-sm text-[#4F547B]">
                    {course.lessons?.length || 0} lesson
                    {course.lessons?.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="mr-1">
                    <Image
                      width={14}
                      height={14}
                      src="/images/home/coursesCards/icons/2.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="text-sm text-[#4F547B]">{`${Math.floor(
                    course.duration / 60
                  )}h ${Math.floor(course.duration % 60)}m`}</div>
                </div>
                <div className="flex items-center">
                  <div className="mr-1">
                    <Image
                      width={14}
                      height={14}
                      src="/images/home/coursesCards/icons/3.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="text-sm text-[#4F547B]">
                    {course.difficulty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-col md:pl-5 my-auto items-center justify-between md:justify-normal md:items-end md:border-l md:border-[#EDEDED]">
        <div className="flex md:flex-col items-center gap-2 md:items-end">
          <p className="text-sm text-[#4F547B] line-through">${course.price}</p>
          <p className="text-2xl  text-[#321463]">${course.price}</p>
        </div>

        <div className="flex items-center justify-between gap-5 mt-3 text-pink-700">
          <button
            onClick={handleAddToCart}
            className="font-medium bg-violet-600 bg-opacity-10 justify-center h-12 px-3 rounded-lg "
          >
            {buttonText}
          </button>
          {canBookmark && (
            <div
              className="w-12 h-12 flex justify-center items-center rounded-full bg-[#F9F9F9]"
              onClick={handleAddToWishlist}
            >
              <FaBookmark />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

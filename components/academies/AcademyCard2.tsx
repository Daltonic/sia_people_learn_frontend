import { IAcademy, RootState } from "@/utils/type.dt";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";
import Button from "../reusableComponents/Button";
import { toast } from "react-toastify";
import { stripeSubscription } from "@/services/backend.services";
import { ViewRating } from "../reusableComponents/Rating";

interface Props {
  academy: IAcademy;
}

const AcademyCard: React.FC<Props> = ({ academy }) => {
  const { userData } = useSelector((states: RootState) => states.userStates);
  const router = useRouter();
  const pathname = usePathname();

  const { cartAcademyItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  );
  const { setCartAcademyItems, setCartAmount } = cartActions;
  const dispatch = useDispatch();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>(() => {
    const currentAcademy = cartAcademyItems.find(
      (item) => item._id === academy._id
    );
    return currentAcademy ? "Remove from Cart" : "Add to Cart";
  });

  useEffect(() => {
    const currentAcademy = cartAcademyItems.find(
      (item) => item._id === academy._id
    );
    setButtonText(currentAcademy ? "Remove from Cart" : "Add to Cart");
  }, [academy._id, cartAcademyItems]);

  const handleAddToCart = () => {
    const cartCourse = cartAcademyItems.find(
      (item) => item._id === academy._id
    );
    if (cartCourse) {
      const updatedAcademies = cartAcademyItems.filter(
        (item) => item._id !== academy._id
      );
      dispatch(setCartAcademyItems(updatedAcademies));
      setButtonText("Add To Cart");
      sessionStorage.setItem(
        "sessionAcademies",
        JSON.stringify(updatedAcademies)
      );
      const newCartAmount = cartAmount - academy.price;
      sessionStorage.setItem("cartAmount", JSON.stringify(newCartAmount));
      dispatch(setCartAmount(newCartAmount));
    } else {
      const updatedAcademies = [...cartAcademyItems, academy];
      dispatch(setCartAcademyItems(updatedAcademies));
      setButtonText("Remove from Cart");
      sessionStorage.setItem(
        "sessionAcademies",
        JSON.stringify(updatedAcademies)
      );
      const newCartAmount = cartAmount + academy.price;
      sessionStorage.setItem("cartAmount", JSON.stringify(newCartAmount));
      dispatch(setCartAmount(newCartAmount));
    }
  };

  const handleSubscribe = async () => {
    if (!userData) {
      sessionStorage.setItem("prevPath", pathname);
      router.push("/login");
      return;
    }

    try {
      const token = sessionStorage.getItem("accessToken") as string;
      await toast.promise(
        new Promise<void>((resolve, reject) => {
          stripeSubscription(academy._id, token)
            .then((result) => {
              router.push(result.url);
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        }),
        {
          pending: "Subscribing...",
          success: "Subscribed successfully 👌",
          error: "Encountered error 🤯",
        }
      );
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <div className=" flex md:flex-row flex-col w-full border-b border-[#EDEDED] py-5">
      <div className="flex flex-col items-stretch md:w-4/5">
        <div className="flex md:flex-row flex-col items-start">
          <Link
            key={academy._id}
            href={`/academies/${academy.name}`}
            className="w-full  h-36 md:w-[28%]"
          >
            <Image
              width={500}
              height={500}
              className="rounded-md object-cover w-full h-full"
              src={academy.imageUrl || "/images/courseCard/card1.svg"}
              alt="image"
            />
          </Link>

          <div className="md:ml-3 flex flex-col items-stretch md:w-[70%] mt-3 md:mt-0">
            <div className="flex flex-col gap-1.5 my-auto md:px-5 items-start">
              <div className="flex justify-start gap-[1px]">
                <ViewRating value={academy.rating || 0} />
                <p className="text-[#4F547B] text-sm">
                  ({academy.reviewsCount || 0})
                </p>
              </div>
              <Link
                key={academy._id}
                href={`/academies/${academy.name}`}
                className="text-violet-950 text-lg font-medium capitalize self-stretch"
              >
                {academy.name}
              </Link>
              <div className="text-slate-600 text-sm leading-6 self-stretch ">
                {academy.overview}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {academy.userId.imgUrl ? (
                  <Image
                    width={10}
                    height={10}
                    src={
                      academy.userId.imgUrl || "/images/courseCard/card1.svg"
                    }
                    alt="image"
                    className="object-cover rounded-full w-8 h-8"
                  />
                ) : (
                  <div className="rounded-full w-8 h-8 text-white px-4 bg-[#C5165D] text-sm flex items-center justify-center">
                    {academy.userId.firstName[0]}
                    {academy.userId.lastName[0]}
                  </div>
                )}
                <p className="text-sm text-[#4F547B]">
                  {academy.userId.firstName} {academy.userId.lastName}
                </p>

                <div className=" flex items-center gap-1">
                  <Image
                    width={14}
                    height={14}
                    src="/images/home/coursesCards/icons/1.svg"
                    alt="icon"
                  />
                  <p className="text-sm text-[#4F547B]">
                    Courses ({academy.courses?.length})
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
                    academy.duration / 60
                  )}h ${Math.floor(academy.duration % 60)}m`}</div>
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
                    {academy.difficulty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-col md:pl-5 my-auto items-center justify-between md:justify-normal md:items-end md:border-l md:border-[#EDEDED]">
        <div className="flex md:flex-col items-center gap-2 md:items-end">
          <p className="text-sm text-[#4F547B] line-through">
            ${academy.price}
          </p>
          <p className="text-2xl  text-[#321463]">${academy.price}</p>
        </div>

        <div className="flex items-center justify-between gap-5 mt-3">
          <div className="block ">
            {isSubscribed ? (
              <Button className="w-full mb-3 bg-[#C5165D] text-white" disabled>
                {academy.validity === 0
                  ? "Already Purchased"
                  : "Already Subscribed"}
              </Button>
            ) : (
              <>
                {academy.validity === 0 ? (
                  <Button
                    variant="pink"
                    className="w-full mb-3"
                    onClick={handleAddToCart}
                  >
                    {buttonText}
                  </Button>
                ) : (
                  <Button
                    variant="pink"
                    className="w-full mb-3"
                    onClick={handleSubscribe}
                  >
                    Subscribe
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyCard;

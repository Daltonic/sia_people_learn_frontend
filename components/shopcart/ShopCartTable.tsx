import { cartActions } from "@/store/cartSlice";
import { RootState } from "@/utils/type.dt";
import Image from "next/image";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface Product {
  imageUrl: string | null;
  name: string;
  type: "Academy" | "Course" | "Book";
  price: number;
  discountedPrice: number;
  _id: string;
}

const ShopCartTable: React.FC = () => {
  const router = useRouter();
  const { setCartAcademyItems, setCartCourseItems, setCartAmount } =
    cartActions;
  const dispatch = useDispatch();
  const { cartAcademyItems, cartCourseItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  );

  const subscriptionProducts: Product[] = [];
  const oneOffProducts: Product[] = [];

  for (let item of cartAcademyItems) {
    if (item.validity === 0) {
      oneOffProducts.push({
        imageUrl: item?.imageUrl,
        name: item.name,
        type: "Academy",
        price: item.price,
        discountedPrice: item.price,
        _id: item._id,
      });
    } else {
      subscriptionProducts.push({
        imageUrl: item?.imageUrl,
        name: item.name,
        type: "Academy",
        price: item.price,
        discountedPrice: item.price,
        _id: item._id,
      });
    }
  }

  for (let item of cartCourseItems) {
    if (item.validity === 0) {
      oneOffProducts.push({
        imageUrl: item?.imageUrl,
        name: item.name,
        type: "Course",
        price: item.price,
        discountedPrice: item.price,
        _id: item._id,
      });
    } else {
      subscriptionProducts.push({
        imageUrl: item?.imageUrl,
        name: item.name,
        type: "Academy",
        price: item.price,
        discountedPrice: item.price,
        _id: item._id,
      });
    }
  }

  let initialTotal = 0;
  for (let item of oneOffProducts) {
    initialTotal += item.price;
  }

  dispatch(setCartAmount(initialTotal));

  const handleRemoveFromCart = (
    _id: string,
    type: "Academy" | "Course" | "Book",
    price: number
  ) => {
    if (type === "Academy") {
      const updatedAcademies = cartAcademyItems.filter(
        (item) => item._id !== _id
      );
      dispatch(setCartAcademyItems(updatedAcademies));
      const currentAmount = cartAmount - price;
      dispatch(setCartAmount(currentAmount));
    } else {
      const updatedCourses = cartCourseItems.filter((item) => item._id !== _id);
      dispatch(setCartCourseItems(updatedCourses));
      const currentAmount = cartAmount - price;
      dispatch(setCartAmount(currentAmount));
    }
  };

  const handleCheckout = () => {
    const checkout = async () => {
      const requestDetails = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const products: {
          productId: string;
          productType: "Course" | "Academy";
        }[] = [];
        for (let item of oneOffProducts) {
          products.push({
            productId: item._id,
            productType: item.type === "Academy" ? "Academy" : "Course",
          });
        }
        const subscriptionBody = {
          products,
          paymentFrequency: "One-Off",
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/subscriptions/create`,
          { ...requestDetails, body: JSON.stringify(subscriptionBody) }
        );
        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const result = await response.json();
          console.log(result);
          const subscriptionIds: string[] = [];
          for (let item of result) {
            subscriptionIds.push(item?._id);
          }
          const stripeBody = {
            subscriptionIds,
            paymentType: "Stripe",
          };

          const stripeResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/processors/stripe/checkout`,
            { ...requestDetails, body: JSON.stringify(stripeBody) }
          );

          if (stripeResponse.status === 400) {
            const message = await stripeResponse.text();
            alert(message);
          } else {
            const result = await stripeResponse.json();
            console.log(result);
            router.push(result.url!);
          }
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    checkout();
  };

  const handleSubscribe = (
    productId: string,
    productType: "Course" | "Academy" | "Book",
    paymentFrequency: "Month" | "Year"
  ) => {
    const subscribe = async () => {
      const requestDetails = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const subscriptionBody = {
          products: [
            {
              productId,
              productType: productType === "Academy" ? "Academy" : "Course",
            },
          ],
          paymentFrequency,
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/subscriptions/create`,
          { ...requestDetails, body: JSON.stringify(subscriptionBody) }
        );
        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const result = await response.json();
          console.log(result);
          const subscriptionId = result[0]._id;
          console.log(subscriptionId);

          const stripeBody = {
            subscriptionId,
            paymentType: "Stripe",
            paymentFrequency,
          };

          const stripeResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/processors/stripe/subscribe`,
            { ...requestDetails, body: JSON.stringify(stripeBody) }
          );

          if (stripeResponse.status === 400) {
            const message = await stripeResponse.text();
            alert(message);
          } else {
            console.log("Success");
          }
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    subscribe();
  };

  return (
    <div className="w-full flex flex-col justify-center px-10 md:p-0">
      {subscriptionProducts.length > 0 && (
        <div className="flex flex-col items-center overflow-hidden w-full">
          <table className="mt-14 md:w-5/6">
            <thead className="bg-[#F5F7FE] text-[#C5165D] font-medium h-20 rounded-md">
              <tr>
                <th className="text-start pl-10">Product</th>
                <th className="px-10 w-1/8 text-start">Type</th>
                <th className="px-10 w-1/8 text-start">Price</th>
                <th className="px-10 w-1/8 text-start">Subtotal</th>
                <th className="px-10 w-1/8 text-start">Remove</th>
                <th className="px-10 w-1/8 text-start">Subscribe</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionProducts.map((item, i) => (
                <tr key={i} className="border-b border-[#EDEDED]">
                  <td className="flex items-center gap-5 pl-10 py-2 w-fit px-5">
                    <Image
                      className="w-20 rounded-md"
                      alt=""
                      width={0}
                      height={0}
                      src={item.imageUrl || "/images/shape.svg"}
                    />
                    <span className="text-[#321463] font-medium">
                      {item.name}
                    </span>
                  </td>
                  <td className="w-1/8 px-10 text-start text-[#4F547B]">
                    {item.type}
                  </td>
                  <td className="w-1/8 px-10 text-start text-[#4F547B]">
                    ${item.price}
                  </td>
                  <td className="w-1/8 px-10 text-start text-[#321463] font-medium">
                    ${item.price}
                  </td>
                  <td className="w-1/8 px-16 text-base text-[#1A3454]">
                    <div
                      onClick={() =>
                        handleRemoveFromCart(item._id, item.type, item.price)
                      }
                      className="cursor-pointer w-fit flex items-center justify-center bg-slate-400 rounded-full"
                    >
                      <LiaTimesSolid className="w-full" />
                    </div>
                  </td>
                  <td className="w-1/8 px-16 text-base text-[#1A3454]">
                    <div
                      onClick={() =>
                        handleSubscribe(item._id, item.type, "Month")
                      }
                      className="cursor-pointer w-fit flex items-center justify-center bg-green-400 rounded-full"
                    >
                      <LiaTimesSolid className="w-full" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {oneOffProducts.length > 0 && (
        <div className="flex flex-col items-center overflow-hidden w-full">
          <table className="mt-14 md:w-5/6">
            <thead className="bg-[#F5F7FE] text-[#C5165D] font-medium h-20 rounded-md">
              <tr>
                <th className="text-start pl-10">Product</th>
                <th className="px-10 w-1/8 text-start">Type</th>
                <th className="px-10 w-1/8 text-start">Price</th>
                <th className="px-10 w-1/8 text-start">Subtotal</th>
                <th className="px-10 w-1/8 text-start">Remove</th>
              </tr>
            </thead>
            <tbody>
              {oneOffProducts.map((item, i) => (
                <tr key={i} className="border-b border-[#EDEDED]">
                  <td className="flex items-center gap-5 pl-10 py-2 w-fit px-5">
                    <Image
                      className="w-20 rounded-md"
                      alt=""
                      width={0}
                      height={0}
                      src={item.imageUrl || "/images/shape.svg"}
                    />
                    <span className="text-[#321463] font-medium">
                      {item.name}
                    </span>
                  </td>
                  <td className="w-1/8 px-10 text-start text-[#4F547B]">
                    {item.type}
                  </td>
                  <td className="w-1/8 px-10 text-start text-[#4F547B]">
                    ${item.price}
                  </td>
                  <td className="w-1/8 px-10 text-start text-[#321463] font-medium">
                    ${item.price}
                  </td>
                  <td className="w-1/8 px-16 text-base text-[#1A3454]">
                    <div
                      onClick={() =>
                        handleRemoveFromCart(item._id, item.type, item.price)
                      }
                      className="cursor-pointer w-fit flex items-center justify-center bg-slate-400 rounded-full"
                    >
                      <LiaTimesSolid className="w-full" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col items-center md:items-end w-full md:w-5/6 mt-16 px-5 md:px-0">
            <div className="borderborder-[#EDEDED] bg-slate-50 p-5 rounded-lg w-full md:w-1/3">
              <div className="flex justify-between border-b border-[#EDEDED] py-2">
                <h1 className="text-[#321463] font-medium">Subtotal</h1>
                <p className="text-[#4F547B]">${cartAmount}</p>
              </div>
              <div className=" flex justify-between  py-2">
                <h1 className="text-[#321463] font-medium">Total </h1>
                <p className="text-[#4F547B]"> ${cartAmount}</p>
              </div>

              <button
                className="text-white text-center font-medium whitespace-nowrap bg-pink-700 justify-center items-center px-16 py-4 rounded-lg max-md:px-5 mt-6"
                onClick={handleCheckout}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopCartTable;

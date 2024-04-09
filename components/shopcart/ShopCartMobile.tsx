'use client'

import { cartActions } from '@/store/slices/cartSlice'
import { RootState } from '@/utils/type.dt'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'
import EmptyComponent from '../reusableComponents/EmptyComponent'
import Button from '../reusableComponents/Button'
import { toast } from 'react-toastify'
import { stripeCheckout } from '@/services/backend.services'
import { FaTimes } from 'react-icons/fa'
import Link from 'next/link'

const ShopCartMobile: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { setCartItems, setCartAmount } = cartActions
  const dispatch = useDispatch()
  const { cartItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  )
  const { userData } = useSelector((states: RootState) => states.userStates)

  const handleRemoveFromCart = (_id: string, price: number) => {
    const updatedItems = cartItems.filter((item) => item._id !== _id)
    dispatch(setCartItems(updatedItems))

    sessionStorage.setItem('sessionCartItems', JSON.stringify(updatedItems))
    const currentAmount = cartAmount - price
    sessionStorage.setItem('cartAmount', JSON.stringify(currentAmount))
    dispatch(setCartAmount(currentAmount))
  }

  const handleCheckout = async () => {
    if (!userData) {
      sessionStorage.setItem('prevPath', pathname)
      router.push('/login')
    }

    const products: {
      productId: string
      productType: 'Course' | 'Academy'
    }[] = []
    for (let item of cartItems) {
      products.push({
        productId: item._id,
        productType: (item.type as 'Course' | 'Academy') || 'Academy',
      })
    }

    const token = sessionStorage.getItem('accessToken') as string

    try {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          await stripeCheckout(products, token)
            .then((result) => {
              if (result.url) {
                router.push(result.url)
              } else {
                router.push('/payment-successful')
              }

              resolve(result)
            })
            .catch((error) => {
              console.log(error)
              reject(error)
            })
        }),
        {
          pending: `Processing...`,
          success: `Payment successful 👌`,
          error: 'Encountered error 🤯',
        }
      )
    } catch (e: any) {
      console.log(e.message)
    }
  }

  return (
    <div className="">
      <div className="px-5 mt-10">
        {cartItems.length === 0 && (
          <div className="w-5/6 mt-10 mx-auto">
            <EmptyComponent
              title="Cart is Empty"
              buttonText="Add an Item to Cart"
            />
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="">
            {cartItems.map((item, index) => (
              <div
                className="border border-gray-300 rounded-md mb-4 relative z-20"
                key={index}
              >
                <div className="absolute top-1 right-2">
                  <div
                    onClick={() => handleRemoveFromCart(item._id, item.price)}
                    className="text-[#6A7A99] bg-white p-1 text-xl
                    rounded-md cursor-pointer border"
                  >
                    <FaTimes />
                  </div>
                </div>
                <Link
                  href={
                    item.type !== 'Academy'
                      ? `/course/${item.slug}`
                      : `/academies/${item.slug}`
                  }
                  className="flex flex-col justify-center items-center gap-3"
                >
                  <Image
                    className="w-full h-24 object-cover rounded-md"
                    alt=""
                    width={100}
                    height={100}
                    src={item.imageUrl || '/images/general/shape.svg'}
                  />
                  <span className="text-[#321463] font-medium">
                    {item.name}
                  </span>
                  <span className="text-[#111112] font-medium">
                    {item.type ? item.type : 'Academy'}
                  </span>
                </Link>

                <div className="flex flex-col items-center justify-center pb-4">
                  <h1 className="text-start text-[#4F547B] line-through">
                    ${item.price}
                  </h1>
                  <p className="text-start text-[#321463] font-medium text-2xl">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center md:items-end w-full md:w-5/6 mt-16 px-5 md:px-0">
        <div className="border border-[#EDEDED] bg-slate-50 p-5 rounded-lg w-full md:w-1/3">
          <div className=" flex justify-between  border-b border-[#EDEDED] py-2">
            <h1 className="text-[#321463] font-medium">Total </h1>
            <p className="text-[#4F547B]"> ${cartAmount}</p>
          </div>

          <Button
            variant="pink"
            className="w-full my-4"
            onClick={handleCheckout}
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShopCartMobile

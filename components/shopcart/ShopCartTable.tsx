'use client'

import { cartActions } from '@/store/slices/cartSlice'
import { RootState } from '@/utils/type.dt'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'
import EmptyComponent from '../reusableComponents/EmptyComponent'
import { toast } from 'react-toastify'
import { stripeCheckout } from '@/services/backend.services'
import { FaTimes } from 'react-icons/fa'
import Button from '../reusableComponents/Button'
import Link from 'next/link'

const ShopCartTable: React.FC = () => {
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
    <div
      className="w-full flex flex-col justify-center px-10 md:p-0"
      suppressHydrationWarning
    >
      {cartItems.length === 0 && (
        <div className="w-5/6 mt-10 mx-auto">
          <EmptyComponent
            title="Cart is Empty"
            buttonText="Add an Item to Cart"
          />
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="flex flex-col items-center overflow-hidden w-full">
          <table className="mt-14 md:w-5/6">
            <thead className="bg-[#F5F7FE] text-[#C5165D] font-medium h-20 rounded-md">
              <tr>
                <th className="text-start pl-10">Product</th>
                <th className="px-10 w-1/6 text-start">Type</th>
                <th className="px-10 w-1/6 text-start">Price</th>
                <th className="px-10 w-1/6 text-center pr-10">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i} className="border-b border-[#EDEDED]">
                  <td className="py-2 w-fit px-5">
                    <Link
                      className="flex items-center gap-5 pl-10"
                      href={
                        item.type !== 'Academy'
                          ? `/course/${item.slug}`
                          : `/academies/${item.slug}`
                      }
                    >
                      <Image
                        className="w-20 h-14 object-cover rounded-md"
                        alt=""
                        width={100}
                        height={100}
                        src={item.imageUrl || '/images/general/shape.svg'}
                      />
                      <span className="text-[#321463] font-medium">
                        {item.name}
                      </span>
                    </Link>
                  </td>
                  <td className="w-1/6 px-10 text-start text-[#4F547B]">
                    {item.type ? item.type : 'Academy'}
                  </td>
                  <td className="w-1/6 px-10 text-start text-[#4F547B]">
                    ${item.price}
                  </td>
                  <td className="w-1/6 px-16 text-base text-[#1A3454]">
                    <div
                      onClick={() => handleRemoveFromCart(item._id, item.price)}
                      className="cursor-pointer flex justify-center"
                    >
                      <FaTimes className="w-full" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      )}
    </div>
  )
}

export default ShopCartTable

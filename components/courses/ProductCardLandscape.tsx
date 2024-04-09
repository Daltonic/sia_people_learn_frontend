import { IAcademy, ICourse, RootState } from '@/utils/type.dt'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '@/store/slices/cartSlice'
import { ViewRating } from '../reusableComponents/Rating'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { toast } from 'react-toastify'
import { stripeSubscription } from '@/services/backend.services'

interface Props {
  data: ICourse | IAcademy
  type: 'Course' | 'Academy'
}

const ProductCardLandscape: React.FC<Props> = ({ data, type }) => {
  const { userData } = useSelector((states: RootState) => states.userStates)
  const router = useRouter()
  const pathname = usePathname()

  const [course, setCourse] = useState<ICourse>(data as ICourse)
  const [academy, setAcademy] = useState<IAcademy>(data as IAcademy)

  const { cartCourseItems, cartAcademyItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  )
  const { setCartCourseItems, setCartAcademyItems, setCartAmount } = cartActions
  const dispatch = useDispatch()
  const [buttonText, setButtonText] = useState<string>(() => {
    const currentCourse = cartCourseItems.find((item) => item._id === data._id)
    return currentCourse ? 'Remove from Cart' : 'Add to Cart'
  })

  const addCourseToCart = () => {
    const cartCourse = cartCourseItems.find((item) => item._id === data._id)
    if (cartCourse) {
      const updatedCourses = cartCourseItems.filter(
        (item) => item._id !== data._id
      )
      dispatch(setCartCourseItems(updatedCourses))
      sessionStorage.setItem('sessionCourses', JSON.stringify(updatedCourses))
      setButtonText('Add To Cart')
      const newCartAmount = cartAmount - data.price
      sessionStorage.setItem('cartAmount', JSON.stringify(newCartAmount))
      dispatch(setCartAmount(newCartAmount))
    } else {
      // Ensure only ICourse objects are included
      const updatedCourses = cartCourseItems.filter(
        (item) => 'type' in item && 'lessons' in item
      )
      updatedCourses.push(data as ICourse) // Assuming 'data' is an ICourse object
      dispatch(setCartCourseItems(updatedCourses))
      sessionStorage.setItem('sessionCourses', JSON.stringify(updatedCourses))
      setButtonText('Remove from Cart')
      const newCartAmount = cartAmount + data.price
      sessionStorage.setItem('cartAmount', JSON.stringify(newCartAmount))
      dispatch(setCartAmount(newCartAmount))
    }
  }

  const addAcademyToCart = () => {
    const cartCourse = cartAcademyItems.find((item) => item._id === academy._id)
    if (cartCourse) {
      const updatedAcademies = cartAcademyItems.filter(
        (item) => item._id !== academy._id
      )
      dispatch(setCartAcademyItems(updatedAcademies))
      setButtonText('Add To Cart')
      sessionStorage.setItem(
        'sessionAcademies',
        JSON.stringify(updatedAcademies)
      )
      const newCartAmount = cartAmount - academy.price
      sessionStorage.setItem('cartAmount', JSON.stringify(newCartAmount))
      dispatch(setCartAmount(newCartAmount))
    } else {
      const updatedAcademies = [...cartAcademyItems, academy]
      dispatch(setCartAcademyItems(updatedAcademies))
      setButtonText('Remove from Cart')
      sessionStorage.setItem(
        'sessionAcademies',
        JSON.stringify(updatedAcademies)
      )
      const newCartAmount = cartAmount + academy.price
      sessionStorage.setItem('cartAmount', JSON.stringify(newCartAmount))
      dispatch(setCartAmount(newCartAmount))
    }
  }

  const handleSubscribe = async () => {
    if (!userData) {
      sessionStorage.setItem('prevPath', pathname)
      router.push('/login')
      return
    }

    try {
      const token = sessionStorage.getItem('accessToken') as string
      await toast.promise(
        new Promise<void>((resolve, reject) => {
          stripeSubscription(academy._id, token)
            .then((result) => {
              router.push(result.url)
              resolve(result)
            })
            .catch((error) => {
              reject(error)
            })
        }),
        {
          pending: 'Subscribing...',
          success: 'Subscribed successfully 👌',
          error: 'Encountered error 🤯',
        }
      )
    } catch (e: any) {
      console.log(e.message)
    }
  }

  return (
    <div className="flex md:flex-row flex-col w-full  md:w-full border-b border-[#EDEDED] py-5">
      <div className="flex flex-col items-stretch md:w-4/5">
        <div className="flex md:flex-row flex-col items-start">
          <Link
            className="w-full h-96 sm:h-40 md:w-[28%]"
            key={data._id}
            href={`/${type === 'Course' ? 'coursedetail' : 'academies'}/${
              data.slug
            }`}
          >
            <Image
              width={200}
              height={200}
              className="rounded-md object-cover w-full h-full"
              src={data.imageUrl || '/images/general/cardimg.svg'}
              alt="image"
            />
          </Link>

          <div className="md:ml-3 flex flex-col items-stretch md:w-[70%] mt-3 md:mt-0">
            <div className="flex flex-col gap-1.5 my-auto md:px-5 items-start">
              <div className="flex justify-start gap-[1px]">
                <ViewRating value={data.rating || 0} />
                <p className="text-[#4F547B] text-sm">
                  ({data.reviewsCount || 0})
                </p>
              </div>

              <Link
                key={data._id}
                href={`/${type === 'Course' ? 'coursedetail' : 'academies'}/${
                  data.slug
                }`}
                className="text-violet-950 text-lg font-medium capitalize self-stretch"
              >
                {data.name}
              </Link>

              <div className="text-slate-600 text-sm leading-6 self-stretch line-clamp-1">
                {data.overview}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {data.userId.imgUrl ? (
                  <Image
                    width={10}
                    height={10}
                    src={data.userId.imgUrl || '/images/courseCard/card1.svg'}
                    alt="image"
                    className="object-cover rounded-full w-8 h-8"
                  />
                ) : (
                  <div className="rounded-full w-8 h-8 text-white px-4 bg-[#C5165D] text-sm flex items-center justify-center">
                    {data.userId.firstName[0]}
                    {data.userId.lastName[0]}
                  </div>
                )}
                <p className="text-sm text-[#4F547B]">
                  {data.userId.firstName} {data.userId.lastName}
                </p>

                <div className=" flex items-center gap-1">
                  <Image
                    width={14}
                    height={14}
                    src="/images/home/coursesCards/icons/1.svg"
                    alt="icon"
                  />
                  {type !== 'Academy' ? (
                    <p className="text-sm text-[#4F547B]">
                      {course.lessons?.length || 0} lesson
                      {course.lessons?.length !== 1 ? 's' : ''}
                    </p>
                  ) : (
                    <p className="text-sm text-[#4F547B]">
                      {academy.courses?.length || 0} course
                      {academy.courses?.length !== 1 ? 's' : ''}
                    </p>
                  )}
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
                    data.duration / 60
                  )}h ${Math.floor(data.duration % 60)}m`}</div>
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
                    {data.difficulty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-col md:pl-5 my-auto items-center justify-between md:justify-normal md:items-end md:border-l md:border-[#EDEDED]">
        {data.price === 0 ? (
          <p className="text-2xl  text-[#321463]">Free</p>
        ) : (
          <div className="flex md:flex-col items-center gap-2 md:items-end">
            <p className="text-sm text-[#4F547B] line-through">${data.price}</p>
            <p className="text-2xl  text-[#321463]">${data.price}</p>
          </div>
        )}

        <div className="flex items-center justify-between gap-5 mt-3 text-pink-700">
          {type !== 'Academy' && (
            <button
              onClick={addCourseToCart}
              className="font-medium bg-violet-600 bg-opacity-10 justify-center h-12 px-3 rounded-lg"
            >
              {buttonText}
            </button>
          )}

          {type === 'Academy' && academy.validity === 0 && (
            <button
              onClick={addAcademyToCart}
              className="font-medium bg-violet-600 bg-opacity-10 justify-center h-12 px-3 rounded-lg"
            >
              {buttonText}
            </button>
          )}

          {type === 'Academy' && academy.validity !== 0 && (
            <button
              onClick={handleSubscribe}
              className="font-medium bg-violet-600 bg-opacity-10 justify-center h-12 px-3 rounded-lg"
            >
              Subscribe
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCardLandscape

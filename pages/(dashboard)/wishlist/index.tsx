import DashboardHeading from '@/components/dashboard/dashboardLayout/DashboardHeading'
import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import Tabs from '@/components/dashboard/wishList/Tabs'
import { fetchWishlists } from '@/services/backend.services'
import { productActions } from '@/store/slices/productSlice'
import { IAcademy, ICourse, IWishlist, RootState } from '@/utils/type.dt'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const WishList: React.FC<{
  academiesData: IAcademy[]
  coursesData: ICourse[]
}> = ({ coursesData, academiesData }) => {
  const { courses, academies } = useSelector(
    (states: RootState) => states.productStates
  )
  const [loaded, setLoaded] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { setCourses, setAcademies } = productActions

  useEffect(() => {
    dispatch(setCourses(coursesData))
    dispatch(setAcademies(academiesData))
    setLoaded(true)
  }, [dispatch, setCourses, setAcademies, coursesData, academiesData])

  return (
    <DashboardLayout>
      <DashboardHeading
        title="Bookmarks"
        description=" Save your favorite courses and academies for quick access later."
      />
      {loaded && <Tabs academiesData={academies} coursesData={courses} />}
    </DashboardLayout>
  )
}

export default WishList

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken as string

  try {
    let wishedAcademies: IWishlist[] = await fetchWishlists(
      { productType: 'Academy' },
      token
    )
    let wishedCourses: IWishlist[] = await fetchWishlists(
      { productType: 'Course' },
      token
    )

    const academiesData = wishedAcademies.map(({ productId, _id }) => ({
      ...productId,
      wishId: _id,
    }))
    const coursesData = wishedCourses.map(({ productId, _id }) => ({
      ...productId,
      wishId: _id,
    }))

    return {
      props: {
        academiesData: JSON.parse(JSON.stringify(academiesData)) as IAcademy[],
        coursesData: JSON.parse(JSON.stringify(coursesData)) as ICourse[],
      },
    }
  } catch (e: any) {
    console.log(e)
    return {
      props: {
        academiesData: {} as IAcademy[],
        coursesData: {} as ICourse[],
      },
    }
  }
}

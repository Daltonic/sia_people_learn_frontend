import React from 'react'
import Tabs from './Tabs'
import DashboardHeading from '../dashboardLayout/DashboardHeading'
import { IAcademies, ICourses } from '@/utils/type.dt'
import DeleteModal from '@/components/reusableComponents/DeleteModal'

interface Props {
  academiesData: IAcademies
  coursesData: ICourses
  booksData: ICourses
}

const MyProducts: React.FC<Props> = ({
  academiesData,
  coursesData,
  booksData,
}) => {
  return (
    <div className="">
      <DashboardHeading
        title="My Products"
        description="Access and manage all your products in one place."
      />
      <Tabs
        academiesData={academiesData}
        coursesData={coursesData}
        booksData={booksData}
      />
      <DeleteModal />
    </div>
  )
}

export default MyProducts

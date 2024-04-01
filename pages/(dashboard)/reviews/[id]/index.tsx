'use client'

import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import ProductReview from '@/components/dashboard/reviews/ProductReview'
import { useRouter } from 'next/router'

const Reviews: React.FC = () => {
  const router = useRouter()
  const { id, product, name } = router.query
  const productId = id as string
  const productType = product as 'Course' | 'Academy' | 'Book'
  const productName = name as string

  return (
    <>
      <DashboardLayout>
        <ProductReview id={productId} type={productType} name={productName} />
      </DashboardLayout>
    </>
  )
}

export default Reviews

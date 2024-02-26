'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IPost, RootState } from '@/utils/type.dt'
import { convertStringToDate } from '@/utils'
import { useSelector } from 'react-redux'
import Dropdown from '../reusableComponents/Dropdown'
import { toast } from 'react-toastify'
import { deletePost, publishPost } from '@/services/backend.services'

interface BlogCardProps {
  blog: IPost
  i: number
  option?: boolean
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, i, option }) => {
  const { userData } = useSelector((states: RootState) => states.userStates)

  const handlePublish = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await publishPost(blog)
          .then((res: any) => {
            resolve(res)
          })
          .catch((error: any) => reject(error))
      }),
      {
        pending: `Publishing...`,
        success: `Blog published successfully 👌`,
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleDelete = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await deletePost(blog._id)
          .then((res: any) => {
            resolve(res)
          })
          .catch((error: any) => reject(error))
      }),
      {
        pending: `Deleting...`,
        success: `Blog deleted successfully 👌`,
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div
      className="w-full sm:w-[48%] md:w-52 mb-6"
      data-aos="fade-left"
      data-aos-duration={(i + 1) * 500}
    >
      <div className="w-full relative">
        {option && (
          <div className="absolute top-1 right-2">
            <Dropdown>
              <Link
                href={`/blogs/edit/${String(blog._id)}`}
                className="p-1 hover:bg-gray-100 w-full text-left"
              >
                Edit
              </Link>
              {userData?.userType === 'admin' && !blog.published && (
                <button
                  onClick={handlePublish}
                  className="p-1 hover:bg-gray-100 w-full text-left"
                >
                  Publish
                </button>
              )}
              <button
                onClick={handleDelete}
                className="p-1 hover:bg-red-500 hover:text-white w-full text-left"
              >
                Delete
              </button>
            </Dropdown>
          </div>
        )}

        <Link className="linkCustom" href={`/blogs/${blog._id}`}>
          <div className="h-48">
            <Image
              width={100}
              height={100}
              src={blog.imageUrl || '/images/general/cardimg.svg'}
              alt="image"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
      <div className="mt-3 pr-2">
        <h1 className="text-[#C5165D] text-sm uppercase font-medium">
          {blog.category}
        </h1>
        <Link className="linkCustom" href={`/blogs/${blog._id}`}>
          <h4 className="text-[#321463] font-medium md:text-sm">
            {blog.title}
          </h4>
        </Link>

        <p className="mt-1 text-[#4F547B] text-sm md:text-xs">
          {convertStringToDate(blog.createdAt)}
        </p>
      </div>
    </div>
  )
}

export default BlogCard

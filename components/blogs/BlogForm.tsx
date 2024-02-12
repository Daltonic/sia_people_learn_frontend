import Button from '@/components/reusableComponents/Button'
import InputField from '@/components/reusableComponents/InputField'
import SelectField from '@/components/reusableComponents/SelectField'
import TextAreaField from '@/components/reusableComponents/TextAreaField'
import { IPost, RootState } from '@/utils/type.dt'
import { useRouter } from 'next/navigation'
import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react'
import { categories } from '@/data/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '@/store/userSlice'
import WYSIWYG from '../reusableComponents/WYSIWYG'
import { toast } from 'react-toastify'
import { createPost, updatePost } from '@/services/backend.services'

interface PostProps {
  post?: IPost
  type: 'create' | 'edit'
}

const postCategory = categories
  .map((category) => ({ label: category, value: category }))
  .filter((category) => category.label !== 'All Categories')

const PostForm: React.FC<PostProps> = ({ post, type }) => {
  const router = useRouter()
  const [editorContent, setEditorContent] = useState<string>('')

  const dispatch = useDispatch()
  const { setUserData } = userActions
  const { userData } = useSelector((states: RootState) => states.userStates)

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem('user')!)
      if (sessionUser) {
        dispatch(setUserData(sessionUser))
      }
    }
  }, [dispatch, setUserData, userData])
  const [postDetails, setPostDetails] = useState({
    title: post?.title || '',
    description: post?.description || '',
    overview: post?.overview || '',
    imageUrl: post?.imageUrl || '',
    category: post?.category || '',
  })

  const [submitting, setSubmitting] = useState<boolean>(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget

    setPostDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (!postDetails.title || !postDetails.overview || !postDetails.category) {
      alert('Missing required fields')
      return
    }

    setSubmitting(true)

    const postInput = {
      ...postDetails,
      description: editorContent,
      userId: userData?._id,
    }

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        if (type === 'create') {
          createPost(postInput)
            .then((result) => {
              router.push('/(dashboard)/myBlogs')
              resetForm()
              resolve(result)
            })
            .catch((error) => reject(error))
        } else {
          updatePost(postInput, String(post?._id))
            .then((result) => {
              router.push('/(dashboard)/myBlogs')
              resolve(result)
            })
            .catch((error) => reject(error))
        }
      }),
      {
        pending: 'Processing...',
        success: 'Successfully saved 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const resetForm = () => {
    setPostDetails({
      title: '',
      description: '',
      overview: '',
      category: '',
      imageUrl: '',
    })
  }

  return (
    <div className="bg-white rounded-lg ">
      <h1 className="p-5 text-[#321463] font-medium border-b border-[#EDEDED] text-xl md:text-base">
        Blog Details
      </h1>
      <form className="p-5" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter your product title"
          required
          inputType="text"
          value={postDetails.title}
          handleChange={handleChange}
        />
        <div className="md:flex gap-8">
          <TextAreaField
            label="Overview"
            id="overview"
            name="overview"
            value={postDetails.overview}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <InputField
            label="ImageURL"
            name="imageUrl"
            placeholder="Enter Product ImageURL"
            required={false}
            inputType="url"
            value={postDetails.imageUrl}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <SelectField
            label="Category"
            name="category"
            options={postCategory}
            value={postDetails.category}
            defaultValue={postCategory[0].value}
            handleChange={handleChange}
          />
        </div>

        <div className="flex flex-col w-full my-3 relative">
          <label className="text-violet-950 font-medium">Description</label>
          <WYSIWYG
            value={postDetails.description}
            handleChange={(content) => setEditorContent(content)}
          />
        </div>

        <Button variant="pink" className="mt-14" disabled={submitting}>
          {submitting
            ? type === 'create'
              ? 'Creating'
              : 'Editting'
            : type === 'create'
            ? 'Create'
            : 'Edit'}
        </Button>
      </form>
    </div>
  )
}

export default PostForm

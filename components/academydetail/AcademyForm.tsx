import Badge from '@/components/reusableComponents/Badge'
import Button from '@/components/reusableComponents/Button'
import InputField from '@/components/reusableComponents/InputField'
import SelectField from '@/components/reusableComponents/SelectField'
import TextAreaField from '@/components/reusableComponents/TextAreaField'
import { IAcademy, RootState } from '@/utils/type.dt'
import { useRouter } from 'next/navigation'
import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '@/store/userSlice'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'

interface AcademyProps {
  academy: IAcademy
}

const AcademyForm: React.FC<AcademyProps> = ({ academy }) => {
  const editorRef = useRef<any>(null)
  const router = useRouter()
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
  const [productDetails, setProductDetails] = useState({
    title: academy.name,
    description: academy.description,
    overview: academy.overview,
    price: academy.price,
    imageUrl: academy.imageUrl || '',
    difficulty: academy.difficulty,
    tags: academy.tags ? academy.tags.map((tag) => tag.name) : [],
    requirements: academy.requirements ? academy.requirements : [],
    highlights: academy.highlights ? academy.highlights : [],
  })

  const [submitting, setSubmitting] = useState<boolean>(false)

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: 'tags' | 'requirements' | 'highlights'
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const input = e.target as HTMLInputElement
      const value = input.value.trim()

      if (value !== '') {
        switch (field) {
          case 'highlights':
            if (!productDetails.highlights.includes(value)) {
              setProductDetails((prev) => ({
                ...prev,
                highlights: [...prev.highlights, value],
              }))
              input.value = ''
            } else {
              input.value = ''
            }
            break
          case 'requirements':
            if (!productDetails.requirements.includes(value)) {
              setProductDetails((prev) => ({
                ...prev,
                requirements: [...prev.requirements, value],
              }))
              input.value = ''
            } else {
              input.value = ''
            }
            break

          case 'tags':
            if (!productDetails.tags.includes(value)) {
              setProductDetails((prev) => ({
                ...prev,
                tags: [...prev.tags, value],
              }))
              input.value = ''
            } else {
              input.value = ''
            }
            break
        }
      }
    }
  }

  const handleRemoveItem = (
    field: 'highlights' | 'requirements' | 'tags',
    value: string
  ) => {
    switch (field) {
      case 'highlights':
        const newHighlights = productDetails.highlights.filter(
          (highlight: string) => highlight !== value
        )
        setProductDetails((prev) => ({ ...prev, highlights: newHighlights }))
        break
      case 'requirements':
        const newRequirements = productDetails.requirements.filter(
          (requirement: string) => requirement !== value
        )
        setProductDetails((prev) => ({
          ...prev,
          requirements: newRequirements,
        }))
        break
      case 'tags':
        const newTags = productDetails.tags.filter(
          (tag: string) => tag !== value
        )
        setProductDetails((prev) => ({ ...prev, tags: newTags }))
        break
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget

    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (
      userData?.userType !== 'instructor' &&
      String(userData?._id) === String(academy.userId._id)
    ) {
      throw new Error('Only instructors can create products')
    }

    setSubmitting(true)
    const {
      title,
      overview,
      price,
      imageUrl,
      difficulty,
      tags,
      highlights,
      requirements,
    } = productDetails

    const productInput = {
      name: title,
      description: editorRef.current.getContent(),
      overview,
      imageUrl,
      price: Number(price),
      difficulty,
      requirements,
      tags,
      highlights,
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/update/${academy._id}`
      const config = {
        method: 'put',
        url,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
        data: productInput, // Pass the stream as the data
      }

      const response = await axios.request(config)

      const { result } = response.data
      console.log(result)
      // router.push('/(dashboard)/myProducts')
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  return (
    <div className="bg-white rounded-lg ">
      <h1 className="p-5 text-[#321463] font-medium border-b border-[#EDEDED] text-xl md:text-base">
        Product Details
      </h1>
      <form className="p-5" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter your product title"
          required
          inputType="text"
          value={productDetails.title}
          handleChange={handleChange}
        />
        <div className="md:flex gap-8">
          <TextAreaField
            label="Overview"
            id="overview"
            name="overview"
            value={productDetails.overview}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <InputField
            label="Price"
            name="price"
            placeholder="Course Price"
            required
            inputType="number"
            value={productDetails.price}
            handleChange={handleChange}
          />
          <InputField
            label="ImageURL"
            name="imageUrl"
            placeholder="Enter Product ImageURL"
            required={false}
            inputType="url"
            value={productDetails.imageUrl}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <SelectField
            label="Difficulty"
            name="difficulty"
            options={[
              { label: 'Beginner', value: 'Beginner' },
              { label: 'Intermediate', value: 'Intermediate' },
              { label: 'Advance', value: 'Advanced' },
            ]}
            value={productDetails.difficulty}
            handleChange={handleChange}
          />
          {/* <SelectField
            name="language"
            label="Audio Language"
            options={[{ label: "English", value: "option1" }]}
            value=""
            handleChange={handleChange}
          /> */}
        </div>

        <div className="md:flex gap-8">
          <div className="flex flex-col gap-2 w-1/2">
            <InputField
              label="Product Requirements?"
              name="requirements"
              placeholder="Enter Product Requirements"
              required={false}
              inputType="text"
              handleKeyDown={(e) => handleInputKeyDown(e, 'requirements')}
            />
            <div className="flex flex-wrap w-full gap-2">
              {productDetails.requirements.map((requirement, index) => (
                <Badge
                  key={index}
                  inputText={requirement}
                  imageUrl="/images/cancel.png"
                  handleIconClick={() =>
                    handleRemoveItem('requirements', requirement)
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <InputField
              label="Tags"
              name="tags"
              placeholder="Enter Tags"
              required={false}
              inputType="text"
              handleKeyDown={(e) => handleInputKeyDown(e, 'tags')}
            />
            <div className="flex flex-wrap w-full gap-2">
              {productDetails.tags.map((tag, index) => (
                <Badge
                  key={index}
                  inputText={tag}
                  imageUrl="/images/cancel.png"
                  handleIconClick={() => handleRemoveItem('tags', tag)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <InputField
            label="What will students learn on your course?"
            name="highlights"
            placeholder="Enter Product Highlights"
            required={false}
            inputType="text"
            handleKeyDown={(e) => handleInputKeyDown(e, 'highlights')}
          />
          <div className="flex flex-col gap-2 w-full">
            {productDetails.highlights.map((highlight, index) => (
              <Badge
                key={index}
                inputText={highlight}
                imageUrl="/images/cancel.png"
                handleIconClick={() =>
                  handleRemoveItem('highlights', highlight)
                }
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full my-3 relative">
          <label className="text-violet-950 font-medium">Description</label>

          <Editor
            apiKey="h3r0yb4wltqwanftl730o5x9ybrxhz9mxuoeu5keq71mrcyx"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={productDetails.description}
            init={{
              height: 250,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </div>
        {/* <div className="md:flex gap-8">
          <TextAreaField
            label="What will students learn in your course?"
            id="learn"
          />
          <TextAreaField label="Requirements" id="requirement" />
        </div> */}
        <Button variant="pink" className="mt-14" disabled={submitting}>
          {submitting ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </div>
  )
}

export default AcademyForm

import { IPost, RootState } from '@/utils/type.dt'
import BlogDetail from './BlogDetail'
import ReviewForm from './ReviewForm'
import CommentsSection from './CommentsSection'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import { userActions } from '@/store/slices/userSlice'
import Button from '../reusableComponents/Button'
import TextAreaField from '../reusableComponents/TextAreaField'
import { generateAlphanumeric } from '@/utils'
import { toast } from 'react-toastify'
import { createPost } from '@/services/backend.services'

interface Props {
  post: IPost
}

const Blog: React.FC<Props> = ({ post }) => {
  const { userData } = useSelector((states: RootState) => states.userStates)
  const dispatch = useDispatch()
  const { setUserData } = userActions
  const [openCommentForm, setOpenCommentForm] = useState<boolean>(false)
  const [comments, setComments] = useState<IPost['comments']>(
    post.comments || []
  )

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem('user')!)
      if (sessionUser) {
        dispatch(setUserData(sessionUser))
      }
    }
  }, [dispatch, setUserData, userData])

  const [comment, setComment] = useState<string>()
  const [submitting, setSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    setSubmitting(true)
    const postInput = {
      parentId: post._id,
      userId: userData?._id,
      overview: comment,
      title: post._id + generateAlphanumeric(6),
      category: post.category,
      description: post.description,
    }

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        createPost(postInput)
          .then((result) => {
            resolve(result)
            setSubmitting(false)
            setOpenCommentForm(false)
            setComment('')
            setComments((prev) => [result, ...prev!])
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Submitting...',
        success: 'Successfully submitted 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div className="flex flex-col items-center px-5 sm:px-10 md:px-20">
      <BlogDetail post={post} />
      <section className="flex justify-center w-full mt-5 md:mt-16">
        <div className="w-full md:w-4/5">
          <div className="md:flex justify-center">
            <h4 className="font-medium text-lg text-[#321463]">
              {post.overview}
            </h4>
            <div
              dangerouslySetInnerHTML={{ __html: post.description }}
              className="mt-2 md:mt-5 text-[#4F547B]"
            />
          </div>
          {userData && (
            <Button
              variant="pink"
              className="mt-14"
              onClick={() => setOpenCommentForm((prev) => !prev)}
            >
              {openCommentForm ? 'Close comment form' : 'Comment on Post'}
            </Button>
          )}
          {openCommentForm && (
            <form className="w-full" onSubmit={handleSubmit}>
              <TextAreaField
                label="Overview"
                id="overview"
                name="overview"
                value={comment}
                required={true}
                handleChange={(e) => setComment(e.currentTarget.value)}
              />
              <Button variant="pink" className="mt-1" disabled={submitting}>
                {submitting ? 'Submitting' : 'Submit'}
              </Button>
            </form>
          )}
          {comments && comments.length > 0 && (
            <CommentsSection comments={comments} />
          )}
        </div>
      </section>
    </div>
  )
}

export default Blog

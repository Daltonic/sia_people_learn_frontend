import { genericActions } from '@/store/slices/genericSlice'
import { RootState } from '@/utils/type.dt'
import { TfiClose } from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { toast } from 'react-toastify'
import {
  deleteAcademy,
  deleteCourse,
  deletePost,
} from '@/services/backend.services'

const DeleteModal: React.FC = () => {
  const { deleteModal, data } = useSelector(
    (states: RootState) => states.genericStates
  )
  const dispatch = useDispatch()
  const { setDeleteModal, setData } = genericActions

  const close = () => {
    dispatch(setDeleteModal('scale-0'))
    dispatch(setData(null))
  }

  const handleDelete = () => {
    if (data && data.type === 'course') {
      onDeleteCourse()
    }

    if (data && data.type === 'academy') {
      onDeleteAcademy()
    }

    if (data && data.type === 'blog') {
      onDeleteBlog()
    }
  }

  const onDeleteCourse = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await deleteCourse(data._id)
          .then((res: any) => {
            close()
            resolve(res)
          })
          .catch((error: any) => reject(error))
      }),
      {
        pending: `Deleting...`,
        success: `Academy deleted successfully 👌`,
        error: 'Encountered error 🤯',
      }
    )
  }

  const onDeleteAcademy = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await deleteAcademy(data._id)
          .then((res: any) => {
            close()
            resolve(res)
          })
          .catch((error: any) => reject(error))
      }),
      {
        pending: `Deleting...`,
        success: `Academy deleted successfully 👌`,
        error: 'Encountered error 🤯',
      }
    )
  }

  const onDeleteBlog = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await deletePost(data._id)
          .then((res: any) => {
            close()
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
      className={`fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center
      bg-black bg-opacity-50 transform z-[3000] transition-transform duration-300 ${deleteModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-row justify-end items-center relative">
          <button
            type="button"
            onClick={close}
            className="bg-white p-1.5 rounded-full border-0 bg-transparent
            focus:outline-none absolute shadow-md"
          >
            <TfiClose size={16} className="text-black" />
          </button>
        </div>

        <div className="text-center p-5 md:px-16 space-y-2">
          <h4 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
            Are you sure?
          </h4>
          <p className="text-slate-600 text-center text-md capitalize w-full">
            {data && data.name}
          </p>
          <Button onClick={handleDelete} variant="pink">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal

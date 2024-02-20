import Button from '@/components/reusableComponents/Button'
import { uploadFile } from '@/services/backend.services'
import { uploaderActions } from '@/store/uploaderSlice'
import { RootState } from '@/utils/type.dt'
import { AxiosProgressEvent } from 'axios'
import { useRef, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdCancel, MdOutlineFileCopy } from 'react-icons/md'
import { TfiClose } from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

interface FileUploaderProps {
  onUploadSuccess: (response: any) => void
  accept: string
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onUploadSuccess,
  accept,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileData, setFileData] = useState<File>()
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState<boolean>(false)
  const { uploaderModal } = useSelector(
    (states: RootState) => states.uploaderStates
  )
  const dispatch = useDispatch()
  const { setUploaderModal } = uploaderActions

  const handleUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const { loaded, total } = progressEvent
    const percentCompleted = Math.round((loaded / Number(total)) * 100)
    console.log(`Upload progress: ${percentCompleted}%`)
    setProgress(percentCompleted)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.items) {
      const file = e.dataTransfer.items[0].getAsFile()
      if (file && isFileTypeAccepted(file, accept)) {
        setFileData(file)
        console.log('File dropped')
        handleUpload(file)
      } else {
        console.log('File type not accepted')
        // Optionally, you can show a message to the user here
      }
    }
  }

  const isFileTypeAccepted = (file: File, accept: string): boolean => {
    const fileType = file.type
    const acceptedTypes = accept.split(',').map((type) => type.trim())
    return acceptedTypes.includes(fileType)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file) {
        setFileData(file)
        console.log('File selected')
        handleUpload(file)
      }
    }
  }

  const truncateFileName = (
    fileName: string,
    maxLength: number = 20
  ): string => {
    const extension = fileName.split('.').pop() || ''
    const nameWithoutExtension = fileName.slice(0, -extension.length)
    const truncatedName = nameWithoutExtension.slice(0, maxLength)
    return truncatedName.length < nameWithoutExtension.length
      ? `${truncatedName}...${extension}`
      : fileName
  }

  const formatFileSize = (size: number): string => {
    const units = ['Bytes', 'KB', 'MB', 'GB']
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`
  }

  const handleUpload = async (file: File) => {
    setUploading(true)

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await uploadFile(file, handleUploadProgress)
          .then((response) => {
            onUploadSuccess(response)
            resetUpload()
            console.log(response)
            resolve(response)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Uploading...',
        success: 'File successfully uploaded 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const resetUpload = () => {
    setFileData(undefined)
    setProgress(0)
    setUploading(false)
    dispatch(setUploaderModal('scale-0'))
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center
      bg-black bg-opacity-50 transform z-[3000] transition-transform duration-300 ${uploaderModal}`}
    >
      <div className="flex flex-row justify-end items-center relative">
        <button
          type="button"
          onClick={resetUpload}
          className="bg-white p-2 rounded-full border-0 bg-transparent
            focus:outline-none absolute -top-14 shadow-md"
        >
          <TfiClose size={20} className="text-black" />
        </button>
      </div>

      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-3/5 h-7/12 p-6">
        <div className="text-center mb-14 p-5 md:px-16">
          <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
            UPLOAD FILES
          </h1>
          <p className="text-slate-600 text-center text-md mt-3 capitalize w-full">
            Lets take care of your file for you.
          </p>

          <div className="w-3/5 mx-auto">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center border-dashed border-2 border-[#EDEDED] w-full mx-auto gap-5 p-10 mt-5 rounded-lg"
            >
              <FaCloudUploadAlt size={50} className="w-28 text-gray-400" />

              <p className=" text-lg text-gray-600 text-center">
                Drag and drop your files <br /> OR
              </p>

              <label htmlFor="file-upload" className="cursor-pointer">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="pink"
                  disabled={uploading}
                >
                  Browse Files
                </Button>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept={accept}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {fileData && (
              <div className="space-y-2">
                <h4 className="text-violet-950 text-lg font-medium text-start my-5">
                  Uploaded File
                </h4>

                <div className="flex gap-2 items-center">
                  <MdOutlineFileCopy size={20} />

                  <div className="flex-1 flex justify-start items-center space-x-2 text-gray-600">
                    <p>{truncateFileName(fileData.name)}</p>
                    <p className="text-sm">({formatFileSize(fileData.size)})</p>
                  </div>
                  <p>{progress}%</p>

                  <MdCancel className="text-gray-600" />
                </div>

                <div className="h-1 bg-gray-400 w-full">
                  <div
                    className="h-full bg-pink-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUploader

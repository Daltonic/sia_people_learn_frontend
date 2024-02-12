import axios from 'axios'

const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URI

const createPost = async (data: any): Promise<any> => {
  const url = `${BASE_URI}/api/v1/posts/create`

  try {
    const config = {
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
      data,
    }

    const response = await axios.request(config)
    return Promise.resolve(response)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const updatePost = async (data: any, id: string): Promise<any> => {
  const url = `${BASE_URI}/api/v1/posts/update/${id}`

  try {
    const config = {
      method: 'PUT',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
      data,
    }

    const response = await axios.request(config)
    return Promise.resolve(response)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

export { createPost, updatePost }

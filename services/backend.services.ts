import axios from "axios";

const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

const createPost = async (data: any): Promise<any> => {
  const url = `${BASE_URI}/api/v1/posts/create`;

  try {
    const config = {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      data,
    };

    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const updatePost = async (data: any, id: string): Promise<any> => {
  const url = `${BASE_URI}/api/v1/posts/update/${id}`;

  try {
    const config = {
      method: "PUT",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      data,
    };

    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const updateAcademy = async (data: any, id: string): Promise<any> => {
  try {
    const url = `${BASE_URI}/api/v1/academies/update/${id}`;
    const config = {
      method: "PUT",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      data, // Pass the stream as the data
    };

    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const login = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  const url = `${BASE_URI}/api/v1/sessions/login`;

  try {
    const config = {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const logout = async (): Promise<any> => {
  const url = `${BASE_URI}/api/v1/sessions/logout`;

  const config = {
    method: "DELETE",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    Promise.resolve(error);
  }
};

const createAccount = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<any> => {
  const url = `${BASE_URI}/api/v1/users/register`;

  const config = {
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const createAcademy = async (data: {
  name: string;
  description: string;
  overview: string;
  imageUrl: string;
  price: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  requirements: string[];
  tags: string[];
  highlights: string[];
}): Promise<any> => {
  const url = `${BASE_URI}/api/v1/academies/create`;
  const config = {
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data,
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const createCourse = async (data: {
  name: string;
  description: string;
  overview: string;
  imageUrl: string;
  price: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  requirements: string[];
  tags: string[];
  highlights: string[];
  type: "Book" | "Course";
}): Promise<any> => {
  const url = `${BASE_URI}/api/v1/courses/create`;
  const config = {
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data,
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const updateCourse = async (
  data: {
    name: string;
    description: string;
    overview: string;
    imageUrl: string;
    price: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    requirements: string[];
    tags: string[];
    highlights: string[];
    type: "Book" | "Course";
  },
  courseId: string
): Promise<any> => {
  const url = `${BASE_URI}/api/v1/courses/update/${courseId}`;
  const config = {
    method: "PUT",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data,
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const createLesson = async (data: {
  title: string;
  description: string;
  overview: string;
  duration: number;
  imageUrl: string;
  videoUrl: string;
  downloadableUrl: string;
  order: number;
  courseId: string;
}): Promise<any> => {
  const url = `${BASE_URI}/api/v1/lessons/create`;
  const config = {
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data,
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const updateLesson = async (
  data: {
    title: string;
    description: string;
    overview: string;
    duration: number;
    imageUrl: string;
    videoUrl: string;
    downloadableUrl: string;
    order: number;
  },
  lessonId: string
): Promise<any> => {
  const url = `${BASE_URI}/api/v1/lessons/update/${lessonId}`;
  const config = {
    method: "PUT",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data,
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const submitCourse = async (
  data: {
    submitted: boolean;
  },
  courseId: string
): Promise<any> => {
  const url = `${BASE_URI}/api/v1/courses/submit/${courseId}`;

  const config = {
    method: "PUT",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data,
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const deleteCourse = async (courseId: string): Promise<any> => {
  const url = `${BASE_URI}/api/v1/courses/delete/${courseId}`;

  const config = {
    method: "DELETE",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

export {
  createPost,
  updatePost,
  updateAcademy,
  login,
  logout,
  createAccount,
  createAcademy,
  createCourse,
  updateCourse,
  createLesson,
  updateLesson,
  submitCourse,
  deleteCourse,
};

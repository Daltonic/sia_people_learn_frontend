import {
  CreateReviewBody,
  FetchPostsParams,
  FetchProductsParams,
  FetchReviewsParams,
  FetchUserSubscriptionsParams,
  FetchUsersParams,
  IPost,
  UpgradeUserBody,
  UpgradeUserRequestBody,
} from "@/utils/type.dt";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";

const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/v1";

const createPost = async (data: any): Promise<any> => {
  const url = `${BASE_URI}/posts/create`;

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
  const url = `${BASE_URI}/posts/update/${id}`;

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

const deletePost = async (postId: string): Promise<any> => {
  const url = `${BASE_URI}/posts/delete/${postId}`;

  try {
    const config = {
      method: "DELETE",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };

    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const publishPost = async (blog: IPost) => {
  const url = `${BASE_URI}/posts/publish/${blog._id}`;
  const config = {
    method: "PUT",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: blog,
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error: any) {
    reportError(error);
    return Promise.reject(error);
  }
};

const updateAcademy = async (data: any, id: string): Promise<any> => {
  try {
    const url = `${BASE_URI}/academies/update/${id}`;
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
  const url = `${BASE_URI}/sessions/login`;

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
  } catch (error: any) {
    reportError(error);

    return Promise.reject(error.response.data.message);
  }
};

const logout = async (): Promise<any> => {
  const url = `${BASE_URI}/sessions/logout`;

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
  const url = `${BASE_URI}/users/register`;

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

const createAcademy = async (data: any): Promise<any> => {
  const url = `${BASE_URI}/academies/create`;
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
  const url = `${BASE_URI}/courses/create`;
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
  const url = `${BASE_URI}/courses/update/${courseId}`;
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
  duration: number;
  videoUrl: string;
  downloadableUrl: string;
  order: number;
  courseId: string;
}): Promise<any> => {
  const url = `${BASE_URI}/lessons/create`;
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
    duration: number;
    videoUrl: string;
    downloadableUrl: string;
    order: number;
  },
  lessonId: string
): Promise<any> => {
  const url = `${BASE_URI}/lessons/update/${lessonId}`;
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
  const url = `${BASE_URI}/courses/submit/${courseId}`;

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
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const deleteCourse = async (courseId: string): Promise<any> => {
  const url = `${BASE_URI}/courses/delete/${courseId}`;

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

const orderCourseLessons = async (
  courseId: string,
  data: any
): Promise<any> => {
  const url = `${BASE_URI}/courses/orderLessons/${courseId}`;

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

const addCourseToAcademy = async (academyId: string, courseId: string) => {
  const url = `${BASE_URI}/academies/addCourse`;

  const config = {
    method: "PATCH",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    params: {
      academyId,
      courseId,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const removeCourseFromAcademy = async (academyId: string, courseId: string) => {
  const url = `${BASE_URI}/academies/removeCourse`;

  const config = {
    method: "PATCH",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    params: {
      academyId,
      courseId,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchAcademy = async (slug: string, token?: string) => {
  const url = `${BASE_URI}/academies/${slug}`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchCourses = async (query: FetchProductsParams, token?: string) => {
  const url = `${BASE_URI}/courses`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...query,
      approved: query.approved || null,
      deleted: query.deleted || null,
      difficulty: query.difficulty || null,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchBooks = async (query: FetchProductsParams, token?: string) => {
  const url = `${BASE_URI}/courses`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...query,
      approved: query.approved || null,
      deleted: query.deleted || null,
      difficulty: query.difficulty || null,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
    reportError(error);
    return Promise.reject(error);
  }
};

const submitAcademy = async (academyId: string): Promise<any> => {
  const url = `${BASE_URI}/academies/submit/${academyId}`;

  const config = {
    method: "PUT",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const deleteAcademy = async (academyId: string): Promise<any> => {
  const url = `${BASE_URI}/academies/delete/${academyId}`;

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

const approveAcademy = async (academyId: string): Promise<any> => {
  const url = `${BASE_URI}/academies/approve/${academyId}`;

  const config = {
    method: "PUT",
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

const approveCourse = async (courseId: string): Promise<any> => {
  const url = `${BASE_URI}/courses/approve/${courseId}`;

  const config = {
    method: "PUT",
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

const fetchAcademies = async (query: FetchProductsParams, token?: string) => {
  const url = `${BASE_URI}/academies`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...query,
      approved: query.approved || null,
      deleted: query.deleted || null,
      difficulty: query.difficulty || null,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchPosts = async (query: FetchPostsParams, token?: string) => {
  const url = `${BASE_URI}/posts`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...query,
      published: query.published || null,
      deleted: query.deleted || null,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchUserPosts = async (query: FetchPostsParams, token?: string) => {
  const url = `${BASE_URI}/posts/user/posts`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: { ...query },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error: any) {
    console.log(error.message);
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchPost = async (slug: string, token?: string) => {
  const url = `${BASE_URI}/posts/${slug}`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchCourse = async (slug: string, token?: string) => {
  const url = `${BASE_URI}/courses/${slug}`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchReviews = async (query: FetchReviewsParams, token?: string) => {
  const url = `${BASE_URI}/reviews`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: { ...query },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchLesson = async (lessonId: string, token: string) => {
  const url = `${BASE_URI}/lessons/${lessonId}`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error: any) {
    reportError(error);
    return Promise.reject(error);
  }
};

const deleteLesson = async (lessonId: string): Promise<any> => {
  const url = `${BASE_URI}/lessons/delete/${lessonId}`;

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

const fetchUsers = async (query: FetchUsersParams, token?: string) => {
  const url = `${BASE_URI}/users`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...query,
      userType: query.userType || null,
      requestStatus: query.requestStatus || null,
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
    reportError(error);
    return Promise.reject(error);
  }
};

const upgradeUser = async (data: UpgradeUserBody, token?: string) => {
  const url = `${BASE_URI}/users/upgrade`;

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
    console.log(error);
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchUserSubscriptions = async (
  query: FetchUserSubscriptionsParams,
  token: string
) => {
  const url = `${BASE_URI}/subscriptions/user`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: { ...query },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
    reportError(error);
    return Promise.reject(error);
  }
};

const upgradeUserRequest = async (
  body: UpgradeUserRequestBody,
  token: string
) => {
  const url = `${BASE_URI}/users/requestUpgrade`;
  const config = {
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: body,
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error: any) {
    reportError(error);
    return Promise.reject(error);
  }
};

const stripeSubscription = async (productId: string, token: string) => {
  const url = `${BASE_URI}/processors/stripe/subscribe`;
  const config = {
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: { productId, paymentType: "Stripe" },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error: any) {
    reportError(error);
    return Promise.reject(error);
  }
};

const stripeCheckout = async (
  products: { productId: string; productType: "Course" | "Academy" }[],
  token: string
) => {
  const url = `${BASE_URI}/processors/stripe/checkout`;
  const config = {
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: { products, paymentType: "Stripe" },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error: any) {
    reportError(error);
    return Promise.reject(error);
  }
};

const uploadFile = async (
  file: File,
  onProgress: (progressEvent: AxiosProgressEvent) => void
): Promise<any> => {
  const url = `https://file.dappmentors.duckdns.org/upload`;
  // const url = `http://localhost:8000/upload`
  const formData = new FormData();
  formData.append("file", file);

  const config: AxiosRequestConfig<FormData> = {
    method: "POST",
    url,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: formData,
    onUploadProgress: onProgress, // Add this line to handle progress events
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const createWishlist = async (
  data: { productType: "Course" | "Academy"; productId: string },
  token: string
): Promise<any> => {
  const url = `${BASE_URI}/wishlists/create`;
  console.log(data);

  try {
    const config = {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

const deleteWishlist = async (
  wishlistId: string,
  token: string
): Promise<any> => {
  const url = `${BASE_URI}/wishlists/delete/${wishlistId}`;

  try {
    const config = {
      method: "DELETE",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    return Promise.resolve(response.status);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const fetchWishlists = async (
  query: { productType: "Course" | "Academy" },
  token: string
): Promise<any> => {
  const url = `${BASE_URI}/wishlists`;

  try {
    const config = {
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: query,
    };

    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    reportError(error);
    return Promise.reject(error);
  }
};

const createReview = async (
  data: CreateReviewBody,
  token: string
): Promise<any> => {
  const url = `${BASE_URI}/reviews/create`;

  try {
    const config = {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

const createSiteSettings = async (
  data: { bannerUrl: string; bannerCaption: string; bannerText: string },
  token: string
): Promise<any> => {
  const url = `${BASE_URI}/site-settings/create`;

  try {
    const config = {
      method: "PATCH",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

const fetchSiteSettings = async () => {
  const url = `${BASE_URI}/site-settings`;

  const config = {
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);
    return Promise.resolve(response.data);
  } catch (error) {
    console.log(error);
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
  addCourseToAcademy,
  removeCourseFromAcademy,
  fetchAcademy,
  fetchCourses,
  deleteAcademy,
  submitAcademy,
  approveAcademy,
  approveCourse,
  fetchAcademies,
  fetchBooks,
  fetchPosts,
  fetchPost,
  fetchCourse,
  fetchReviews,
  fetchLesson,
  deleteLesson,
  fetchUsers,
  upgradeUser,
  fetchUserSubscriptions,
  fetchUserPosts,
  upgradeUserRequest,
  stripeSubscription,
  uploadFile,
  deletePost,
  createWishlist,
  deleteWishlist,
  fetchWishlists,
  stripeCheckout,
  publishPost,
  createReview,
  orderCourseLessons,
  createSiteSettings,
  fetchSiteSettings,
};

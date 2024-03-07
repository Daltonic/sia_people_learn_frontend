export interface IAcademy {
  _id: string;
  name: string;
  slug: string;
  description: string;
  overview: string;
  imageUrl: string | null;
  price: number;
  validity: number;
  difficulty: "Advanced" | "Intermediate" | "Beginner";
  duration: number;
  submitted: boolean;
  approved: boolean;
  deleted: boolean;
  orderCount: number;
  rating: number | null;
  reviews: {
    starRating: number;
    comment: string;
    userId: { firstName: string; lastName: string; username: string };
  }[];
  reviewsCount: number;
  courses: ICourse[];
  highlights: string[];
  requirements: string[];
  tags: { _id: string; name: string }[];
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    imgUrl: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IAcademies {
  academies: IAcademy[];
  isNext: boolean;
  numOfPages: number;
}

export interface ICourse {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  overview: string;
  type: "Book" | "Course";
  difficulty: "Advanced" | "Intermediate" | "Beginner";
  duration: number;
  imageUrl: string | null;
  validity: number;
  submitted: boolean;
  approved: boolean;
  deleted: boolean;
  highlights: string[];
  requirements: string[];
  rating: number | null;
  lessons: ILesson[];
  reviews: {
    starRating: number;
    comment: string;
    userId: { firstName: string; lastName: string; username: string };
  }[];
  reviewsCount: number;
  tags: { _id: string; name: string }[];
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    imgUrl: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ICourses {
  courses: ICourse[];
  isNext: boolean;
  numOfPages: number;
}

export interface ILesson {
  _id: string;
  title: string;
  overview?: string | null;
  description: string;
  duration: number;
  imageUrl?: string | null;
  videoUrl?: string | null;
  downloadableUrl?: string | null;
  order: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  _id: string;
  category: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    imgUrl?: string;
  };
  title: string;
  slug: string;
  overview: string;
  description: string;
  imageUrl?: string;
  parentId?: string;
  comments?: {
    _id: string;
    name: string;
    category: string;
    imageUrl: string;
    description: string;
    overview: string;
  }[];
  commentsCount: number;
  deleted?: boolean;
  published?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPosts {
  posts: IPost[];
  isNext: boolean;
  numOfPages: number;
}

export interface CartState {
  cartAcademyItems: IAcademy[];
  cartAcademyItem: IAcademy | null;
  cartCourseItems: ICourse[];
  cartCourseItem: ICourse | null;
  cartAmount: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userType: "admin" | "user" | "instructor";
  lastLogin: boolean;
  createdAt: string;
  updatedAt: string;
  imgUrl?: string;
  _id: string;
  subscriptions: string[];
  subscribedCourses: string[];
  subscribedAcademies: string[];
  reviewedAcademies: string[];
  reviewedCourses: string[];
  requests: {
    _id: string;
    requestType: "UserUpgradeRequent" | "UserDowngradeRequest";
    status: "pending" | "approved" | "rejected";
  }[];
}

export interface IUsers {
  users: Partial<IUser>[];
  isNext: boolean;
  numOfPages: number;
}

export interface UserState {
  userData: IUser | null;
}

export interface UploaderState {
  uploaderModal: string;
}
export interface GenericState {
  deleteModal: string;
  data: any;
}

export interface RootState {
  cartStates: CartState;
  userStates: UserState;
  uploaderStates: UploaderState;
  genericStates: GenericState;
}

export interface IUserSubscription {
  _id: string;
  productType: "Course" | "Academy";
  productId: {
    _id: string;
    name: string;
    slug: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    overview: string;
    description: string;
    rating: number;
    imageUrl?: string;
    email: string;
    userId: {
      _id: string;
      firstName: string;
      lastName: string;
    };
  };
  currentCourse: any[];
  currentLesson: any[];
}

export interface IUserSubscriptions {
  subscriptions: IUserSubscription[];
  isNext: boolean;
  numOfPages: number;
}

export interface IReview {
  _id: string;
  starRating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  approved: boolean;
  userId: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    imgUrl?: string;
  };
  productId: {
    _id: string;
    name: string;
  };
}

export interface IReviews {
  reviews: IReview[];
  isNext: boolean;
  numOfPages: number;
}

export interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface FetchProductsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: "newest" | "oldest";
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | null;
  deleted?: "true" | "false" | null;
  approved?: "true" | "false" | null;
  type?: "Course" | "Book";
  instructor?: "true" | "false";
}

export interface FetchPostsParams {
  parentsOnly?: "true" | "false";
  page?: number;
  pageSize?: number;
  searchQuery?: string | null;
  filter?: "newest" | "oldest";
  deleted?: "true" | "false" | null;
  published?: "true" | "false" | null;
  parentId?: string;
  category?: string | null;
}

export interface FetchReviewsParams {
<<<<<<< HEAD
  name?: string;
=======
  productSlug: string;
>>>>>>> 1a92bc3baae2064580427604a0bed0fee7f7b8c2
  productType?: "Academy" | "Course";
  approved?: "true" | "false";
  page?: number;
  pageSize?: number;
  filter?: "newest" | "oldest";
}

export interface FetchUsersParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: "newest" | "oldest";
  userType?: "admin" | "instructor" | "user" | null;
  requestStatus?: "true" | "false" | null;
}

export interface UpgradeUserBody {
  userId: string;
  upgradeUserTo: "instructor" | "admin";
  requestId: string;
  status: "approved" | "rejected";
}

export interface UpgradeUserRequestBody {
  upgradeUserTo: "instructor" | "admin";
  specialty: string;
  linkedInProfile: string;
  tutorialTitle: string;
  samplesLink: string;
}

export interface FetchSubscriptionsParams {
  page?: number;
  pageSize?: number;
  filter?: "newest" | "oldest";
  productType?: "Academy" | "Course";
  status: "Pending" | "Completed";
  searchQuery?: string;
}

export interface FetchUserSubscriptionsParams {
  page?: number;
  pageSize?: number;
  filter?: "newest" | "oldest";
  productType?: "Academy" | "Course";
  searchQuery?: string;
}

export interface IWishlist {
  _id: string;
  productType: "Course" | "Academy";
  productId: {
    _id: string;
    slug: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    description: string;
    name: string;
    duration: number;
    price: number;
    overview: string;
    imageUrl?: string;
    rating?: number;
    reviews?: any[];
    reviewsCount?: number;
    userId: {
      firstName: string;
      lastName: string;
      username: string;
      _id: string;
      imgUrl?: string;
    };
  };
  createdAt: string;
}

export interface CreateReviewBody {
  productId: string | undefined;
  productType: "Academy" | "Course";
  comment: string;
  starRating: number;
}

export interface ISiteSettings {
  bannerUrl: string | null;
  bannerText: string;
  bannerCaption: string;
}

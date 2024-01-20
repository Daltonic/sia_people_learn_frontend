export interface CourseStruct {
  id: number;
  imageSrc: string;
  authorImageSrc: string;
  title: string;
  rating: number;
  ratingCount: number;
  lessonCount: number;
  duration: number;
  level: string;
  originalPrice: number;
  discountedPrice: number;
  paid: boolean;
  category: string;
  state: string;
  languange: string;
  authorName: string;
  viewStatus: string;
  difficulty: string;
  quantity: number;
  desc?: string;
  description: string;
  overview: string;
  reviews: string[];
  price: number;
  name?: string;
}

export interface BlogStruct {
  id: number;
  imageSrc: string;
  category: string;
  title: string;
  date: string;
  desc: string;
}

export interface ReviewStruct {
  id: number;
  avatarSrc: string;
  name: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
}

export interface IAcademy {
  _id: string;
  name: string;
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
  courses: { _id: string; name: string; imageUrl?: string }[];
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
  price: number;
  description: string;
  overview: string;
  type: "Book" | "Course";
  difficulty: "Advanced" | "Intermediate" | "Beginner";
  duration: number;
  imageUrl: string | null;
  submitted: boolean;
  approved: boolean;
  deleted: boolean;
  highlights: string[];
  requirements: string[];
  rating: number | null;
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
  lessons: { _id: string; title: string }[];
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
  overview: string;
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
  numofPages: number;
}

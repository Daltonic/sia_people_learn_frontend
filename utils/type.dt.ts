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

// export interface AcademyStruct {
//   id: string;
//   imageUrl: string;
//   authorImageSrc?: string;
//   name: string;
//   rating: number;
//   reviewsCount: number;
//   duration: number;
//   difficulty: string;
//   originalPrice: number;
//   discountedPrice: number;
//   paid: boolean;
//   category: string;
//   state: string;
//   languange: string;
//   authorName: string;
//   viewStatus: string;
//   quantity?: number;
//   description: string;
// }

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
  courses: { _id: string; name: string }[];
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

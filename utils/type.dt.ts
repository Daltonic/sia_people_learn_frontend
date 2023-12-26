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
  desc: string;
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
  comment:string;
}

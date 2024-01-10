const requestStatuses = ["Requested", "Accepted", "Declined"];

export const teamMembers = [
  {
    id: 1,
    name: "Floyd Miles",
    role: "President of Sales",
    image: "/images/instructors/instructor1.svg",
    category: 'Animation',
    rating: 4.5,
    reviews: 3545,
    students: 692,
    courses: 15,
    type: "Student",
    request: requestStatuses[Math.floor(Math.random() * requestStatuses.length)],
    socialProfile: [
      {
        icon: "icon-facebook",
        url: "https://www.facebook.com/",
      },
      {
        icon: "icon-twitter",
        url: "https://twitter.com/?lang=en",
      },
      {
        icon: "icon-instagram",
        url: "https://www.instagram.com/",
      },
      {
        icon: "icon-linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
  },
  {
    id: 2,
    name: "Cameron Williamson",
    role: "Web Designer",
    image: "/images/instructors/instructor1.svg",
    category: 'Design',
    rating: 3.5,
    reviews: 3545,
    students: 692,
    courses: 15,
    type: "Admin",
    request: requestStatuses[Math.floor(Math.random() * requestStatuses.length)],
    socialProfile: [
      {
        icon: "icon-facebook",
        url: "https://www.facebook.com/",
      },
      {
        icon: "icon-twitter",
        url: "https://twitter.com/?lang=en",
      },
      {
        icon: "icon-instagram",
        url: "https://www.instagram.com/",
      },
      {
        icon: "icon-linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
  },
  {
    id: 3,
    name: "Brooklyn Simmons",
    role: "Dog Trainer",
    image: "/images/instructors/instructor2.svg",
    category: 'Illustration',
    rating: 5,
    reviews: 3545,
    students: 692,
    courses: 15,
    type: "Student",
    request: requestStatuses[Math.floor(Math.random() * requestStatuses.length)],
    socialProfile: [
      {
        icon: "icon-facebook",
        url: "https://www.facebook.com/",
      },
      {
        icon: "icon-twitter",
        url: "https://twitter.com/?lang=en",
      },
      {
        icon: "icon-instagram",
        url: "https://www.instagram.com/",
      },
      {
        icon: "icon-linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
  },
  {
    id: 4,
    name: "Wade Warren",
    role: "Marketing Coordinator",
    image: "/images/instructors/instructor2.svg",
    category: 'Illustration',
    rating: 4,
    reviews: 3545,
    students: 692,
    courses: 15,
    type: "Instructor",
    request: requestStatuses[Math.floor(Math.random() * requestStatuses.length)],
    socialProfile: [
      {
        icon: "icon-facebook",
        url: "https://www.facebook.com/",
      },
      {
        icon: "icon-twitter",
        url: "https://twitter.com/?lang=en",
      },
      {
        icon: "icon-instagram",
        url: "https://www.instagram.com/",
      },
      {
        icon: "icon-linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
  },
  {
    id: 5,
    name: "Bessie Cooper",
    role: "Marketing Coordinator",
    image: "/images/instructors/instructor2.svg",
    category: 'Illustration',
    rating: 4,
    reviews: 3545,
    students: 692,
    courses: 15,
    type: "Admin",
    request: requestStatuses[Math.floor(Math.random() * requestStatuses.length)],
    socialProfile: [
      {
        icon: "icon-facebook",
        url: "https://www.facebook.com/",
      },
      {
        icon: "icon-twitter",
        url: "https://twitter.com/?lang=en",
      },
      {
        icon: "icon-instagram",
        url: "https://www.instagram.com/",
      },
      {
        icon: "icon-linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
  },
  {
    id: 6,
    name: "Albert Flores",
    role: "Dog Trainer",
    image: "/images/instructors/instructor1.svg",
    category: 'Animation',
    rating: 4.5,
    reviews: 3545,
    students: 692,
    courses: 15,
    type: "Admin",
    request: requestStatuses[Math.floor(Math.random() * requestStatuses.length)],
    socialProfile: [
      {
        icon: "icon-facebook",
        url: "https://www.facebook.com/",
      },
      {
        icon: "icon-twitter",
        url: "https://twitter.com/?lang=en",
      },
      {
        icon: "icon-instagram",
        url: "https://www.instagram.com/",
      },
      {
        icon: "icon-linkedin",
        url: "https://www.linkedin.com/",
      },
    ],
  },

];
export const rating = [
  { id: 1, star: 5, text: "4.5 & up", range: [4.5, 5] },
  { id: 2, star: 5, text: "4.0 & up", range: [4, 5] },
  { id: 3, star: 5, text: "3.5 & up", range: [3.5, 5] },
  { id: 4, star: 5, text: "3.0 & up", range: [3, 5] },
];
export const categories = [
  { id: 1, title: "Animation", },
  { id: 2, title: "Design", },
  { id: 3, title: "Illustration", },

  { id: 5, title: "Business", },


];

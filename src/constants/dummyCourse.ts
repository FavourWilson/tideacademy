import type { CourseApiItem } from "../services/courseService";

export const dummyCourses: CourseApiItem[] = [
  {
    _id: "dummy-1",
    title: "Digital Assets",
    slug: "digital-assets",
    description: "Learn the foundations of digital assets and modern finance.",
    category: "Digital Assets",
    duration: "3hrs",
    instructor: "TIDE Academy",
    lessonsCount: 3,
    thumbnail: "",
    isPublished: true,
    lessons: [
      {
        _id: "lesson-1",
        title: "Introduction to Digital Assets",
        order: 1,
        duration: "15 mins",
        isPreview: true,
      },
      {
        _id: "lesson-2",
        title: "Types of Digital Assets",
        order: 2,
        duration: "20 mins",
        isPreview: false,
      },
      {
        _id: "lesson-3",
        title: "Use Cases and Risks",
        order: 3,
        duration: "18 mins",
        isPreview: false,
      },
    ],
  },
  {
    _id: "dummy-2",
    title: "Trading & Investing",
    slug: "trading-investing",
    description: "Understand trading principles, market structure, and risk.",
    category: "Trading",
    duration: "5hrs",
    instructor: "TIDE Academy",
    lessonsCount: 3,
    thumbnail: "",
    isPublished: true,
    lessons: [
      {
        _id: "lesson-4",
        title: "Market Basics",
        order: 1,
        duration: "12 mins",
        isPreview: true,
      },
      {
        _id: "lesson-5",
        title: "Risk Management",
        order: 2,
        duration: "25 mins",
        isPreview: false,
      },
      {
        _id: "lesson-6",
        title: "Long-term Investing",
        order: 3,
        duration: "22 mins",
        isPreview: false,
      },
    ],
  },
  {
    _id: "dummy-3",
    title: "Cybersecurity",
    slug: "cybersecurity",
    description: "Protect digital identity, wallets, and online accounts.",
    category: "Cybersecurity",
    duration: "3hrs",
    instructor: "TIDE Academy",
    lessonsCount: 3,
    thumbnail: "",
    isPublished: true,
    lessons: [
      {
        _id: "lesson-7",
        title: "Password Safety",
        order: 1,
        duration: "10 mins",
        isPreview: true,
      },
      {
        _id: "lesson-8",
        title: "Wallet Security",
        order: 2,
        duration: "20 mins",
        isPreview: false,
      },
      {
        _id: "lesson-9",
        title: "Avoiding Scams",
        order: 3,
        duration: "17 mins",
        isPreview: false,
      },
    ],
  },
];

export const getDummyCourseBySlug = (slug: string) => {
  return dummyCourses.find((course) => course.slug === slug) || null;
};
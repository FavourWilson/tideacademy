import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export interface CourseApiItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  duration: string;
  thumbnail?: string;
  instructor: string;
  price?: number;
  level?: string;
  lessonsCount?: number;
  hasCertificate?: boolean;
  isPublished?: boolean;
  lessons?: LessonItem[];
}

export interface LessonItem {
  _id: string;
  title: string;
  content?: string;
  videoUrl?: string;
  duration?: string;
  order: number;
  isPreview?: boolean;
  isPublished?: boolean;
}

export interface CoursesResponse {
  success: boolean;
  count: number;
  data: CourseApiItem[];
}

export interface CourseResponse {
  success: boolean;
  data: CourseApiItem;
}

export const getCourses = async (): Promise<CoursesResponse> => {
  const response = await axios.get(`${API_BASE_URL}/courses`);
  return response.data;
};

export const getCourseBySlug = async (slug: string): Promise<CourseResponse> => {
  const response = await axios.get(`${API_BASE_URL}/courses/slug/${slug}`);
  return response.data;
};
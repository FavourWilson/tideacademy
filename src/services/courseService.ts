import { apiClient } from "../libs/apiClient";


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

export interface CreateCoursePayload {
  title: string;
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
}

export const getCourses = async (): Promise<CoursesResponse> => {
  const response = await apiClient.get("/courses");
  return response.data;
};

export const getCourseBySlug = async (
  slug: string
): Promise<CourseResponse> => {
  const response = await apiClient.get(`/courses/slug/${slug}`);
  return response.data;
};

export const createCourse = async (payload: CreateCoursePayload) => {
  const response = await apiClient.post<CourseResponse>("/courses", payload);
  return response.data;
};

export const updateCourse = async (
  courseId: string,
  payload: Partial<CreateCoursePayload>
) => {
  const response = await apiClient.put<CourseResponse>(
    `/courses/${courseId}`,
    payload
  );
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await apiClient.delete(`/courses/${courseId}`);
  return response.data;
};
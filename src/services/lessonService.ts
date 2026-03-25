import { apiClient } from "../libs/apiClient";

export interface LessonItem {
  _id: string;
  title: string;
  content?: string;
  videoUrl?: string;
  duration?: string;
  order: number;
  isPreview?: boolean;
  isPublished?: boolean;
  course?: {
    _id: string;
    title: string;
    slug: string;
    category?: string;
  };
}

export interface LessonResponse {
  success: boolean;
  data: LessonItem;
  message?: string;
}

export interface LessonsResponse {
  success: boolean;
  count: number;
  data: LessonItem[];
}

export interface LessonPayload {
  course: string;
  title: string;
  content?: string;
  videoUrl?: string;
  duration?: string;
  order: number;
  isPreview?: boolean;
  isPublished?: boolean;
}

export const getLessonById = async (lessonId: string) => {
  const response = await apiClient.get<LessonResponse>(`/lessons/${lessonId}`);
  return response.data;
};

export const getLessonsByCourse = async (courseId: string) => {
  const response = await apiClient.get<LessonsResponse>(
    `/lessons/course/${courseId}`
  );
  return response.data;
};

export const getAdminLessonsByCourse = async (courseId: string) => {
  const response = await apiClient.get<LessonsResponse>(
    `/lessons/admin/course/${courseId}`
  );
  return response.data;
};

export const createLesson = async (payload: LessonPayload) => {
  const response = await apiClient.post<LessonResponse>("/lessons", payload);
  return response.data;
};

export const updateLesson = async (
  lessonId: string,
  payload: Partial<LessonPayload>
) => {
  const response = await apiClient.put<LessonResponse>(
    `/lessons/${lessonId}`,
    payload
  );
  return response.data;
};

export const deleteLesson = async (lessonId: string) => {
  const response = await apiClient.delete(`/lessons/${lessonId}`);
  return response.data;
};
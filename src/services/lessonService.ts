import { apiClient } from "../libs/apiClient";
// or "../lib/apiClient" if your folder is named lib

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
}

export const getLessonById = async (lessonId: string) => {
  const response = await apiClient.get<LessonResponse>(`/lessons/${lessonId}`);
  return response.data;
};
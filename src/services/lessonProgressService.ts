import { apiClient } from "../libs/apiClient";

export interface LessonProgressStatusResponse {
  success: boolean;
  data: {
    lessonId: string;
    completed: boolean;
    completedAt: string | null;
  };
}

export interface CourseProgressLesson {
  _id: string;
  title: string;
  order: number;
  duration?: string;
  isPreview?: boolean;
  completed: boolean;
}

export interface CourseProgressResponse {
  success: boolean;
  data: {
    progress: number;
    status: string;
    completedAt: string | null;
    totalLessons: number;
    completedLessons: number;
    lessons: CourseProgressLesson[];
  };
}

export const getLessonProgressStatus = async (lessonId: string) => {
  const response = await apiClient.get<LessonProgressStatusResponse>(
    `/lesson-progress/lesson/${lessonId}`
  );

  return response.data;
};

export const completeLesson = async (lessonId: string) => {
  const response = await apiClient.put(
    `/lesson-progress/complete/${lessonId}`,
    {}
  );

  return response.data;
};

export const uncompleteLesson = async (lessonId: string) => {
  const response = await apiClient.put(
    `/lesson-progress/uncomplete/${lessonId}`,
    {}
  );

  return response.data;
};

export const getMyCourseProgress = async (courseId: string) => {
  const response = await apiClient.get<CourseProgressResponse>(
    `/lesson-progress/course/${courseId}`
  );

  return response.data;
};
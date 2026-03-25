import { apiClient } from "../libs/apiClient";
export interface EnrollmentCourse {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  duration?: string;
  thumbnail?: string;
  instructor?: string;
  lessonsCount?: number;
}

export interface EnrollmentItem {
  _id: string;
  user: string;
  course: string | EnrollmentCourse;
  status: "active" | "completed" | "cancelled";
  progress: number;
  enrolledAt: string;
  completedAt: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface EnrollmentResponse {
  success: boolean;
  message?: string;
  data: EnrollmentItem;
}

export interface MyEnrollmentResponse {
  success: boolean;
  data: EnrollmentItem;
}

export interface MyEnrollmentsResponse {
  success: boolean;
  count: number;
  data: EnrollmentItem[];
}

export const enrollInCourse = async (courseId: string) => {
  const response = await apiClient.post<EnrollmentResponse>("/enrollments", {
    courseId,
  });

  return response.data;
};

export const getMyEnrollmentByCourse = async (courseId: string) => {
  const response = await apiClient.get<MyEnrollmentResponse>(
    `/enrollments/mine/course/${courseId}`
  );

  return response.data;
};

export const getMyEnrollments = async () => {
  const response = await apiClient.get<MyEnrollmentsResponse>(
    "/enrollments/mine"
  );

  return response.data;
};
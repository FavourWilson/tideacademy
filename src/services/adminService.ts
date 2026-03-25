import { apiClient } from "../libs/apiClient";

export interface AdminStats {
  totalUsers: number;
  totalStudents: number;
  totalInstructors: number;
  totalAdmins: number;
  totalCourses: number;
  totalEnrollments: number;
  totalCompletedEnrollments: number;
  totalCertificates: number;
}

export interface AdminStatsResponse {
  success: boolean;
  data: AdminStats;
}

export interface AdminUser {
  _id: string;
  fullname: string;
  email: string;
  role: "student" | "admin" | "instructor";
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUsersResponse {
  success: boolean;
  count: number;
  data: AdminUser[];
}

export interface AdminUserResponse {
  success: boolean;
  message?: string;
  data: AdminUser;
}

export interface AdminEnrollment {
  _id: string;
  status: "active" | "completed" | "cancelled";
  progress: number;
  enrolledAt: string;
  completedAt: string | null;
  user: {
    _id: string;
    fullname: string;
    email: string;
    role: string;
  };
  course: {
    _id: string;
    title: string;
    slug: string;
    category?: string;
    duration?: string;
    instructor?: string;
  };
}

export interface AdminEnrollmentsResponse {
  success: boolean;
  count: number;
  data: AdminEnrollment[];
}

export interface AdminCertificate {
  _id: string;
  certificateNumber: string;
  issuedAt: string;
  user: {
    _id: string;
    fullname: string;
    email: string;
  };
  course: {
    _id: string;
    title: string;
    slug: string;
    category?: string;
    instructor?: string;
    duration?: string;
  };
  enrollment?: {
    status: string;
    progress: number;
    completedAt: string | null;
  };
}

export interface AdminCertificatesResponse {
  success: boolean;
  count: number;
  data: AdminCertificate[];
}

export const getAdminStats = async () => {
  const response = await apiClient.get<AdminStatsResponse>("/admin/stats");
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await apiClient.get<AdminUsersResponse>("/admin/users");
  return response.data;
};

export const updateAdminUserRole = async (
  userId: string,
  role: "student" | "admin" | "instructor"
) => {
  const response = await apiClient.put<AdminUserResponse>(
    `/admin/users/${userId}/role`,
    { role }
  );
  return response.data;
};

export const deleteAdminUser = async (userId: string) => {
  const response = await apiClient.delete(`/admin/users/${userId}`);
  return response.data;
};

export const getAdminEnrollments = async () => {
  const response = await apiClient.get<AdminEnrollmentsResponse>(
    "/admin/enrollments"
  );
  return response.data;
};

export const getAdminCourseEnrollments = async (courseId: string) => {
  const response = await apiClient.get<AdminEnrollmentsResponse>(
    `/admin/courses/${courseId}/enrollments`
  );
  return response.data;
};

export const getAdminCertificates = async () => {
  const response = await apiClient.get<AdminCertificatesResponse>(
    "/admin/certificates"
  );
  return response.data;
};

export const issueAdminCertificate = async (
  userId: string,
  courseId: string
) => {
  const response = await apiClient.post("/admin/certificates/issue", {
    userId,
    courseId,
  });
  return response.data;
};
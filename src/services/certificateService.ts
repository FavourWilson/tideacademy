import { apiClient } from "../libs/apiClient";

export interface CertificateCourse {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  thumbnail?: string;
  instructor?: string;
  duration?: string;
}

export interface CertificateUser {
  _id?: string;
  fullname: string;
  email: string;
}

export interface CertificateEnrollment {
  _id?: string;
  status: string;
  progress: number;
  completedAt: string | null;
  enrolledAt?: string;
}

export interface CertificateItem {
  _id: string;
  certificateNumber: string;
  issuedAt: string;
  certificateUrl?: string;
  user: CertificateUser;
  course: CertificateCourse;
  enrollment?: CertificateEnrollment;
}

export interface MyCertificatesResponse {
  success: boolean;
  count: number;
  data: CertificateItem[];
}

export interface CertificateResponse {
  success: boolean;
  data: CertificateItem;
}

export const getMyCertificates = async () => {
  const response = await apiClient.get<MyCertificatesResponse>(
    "/certificates/mine"
  );
  return response.data;
};

export const getMyCertificateByCourse = async (courseId: string) => {
  const response = await apiClient.get<CertificateResponse>(
    `/certificates/mine/course/${courseId}`
  );
  return response.data;
};

export const getCertificateById = async (certificateId: string) => {
  const response = await apiClient.get<CertificateResponse>(
    `/certificates/${certificateId}`
  );
  return response.data;
};

export const issueCertificate = async (courseId: string) => {
  const response = await apiClient.post<CertificateResponse>(
    "/certificates/issue",
    { courseId }
  );
  return response.data;
};
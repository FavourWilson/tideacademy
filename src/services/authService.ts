import { apiClient } from "../libs/apiClient";

export interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullname: string;
  email: string;
  dateOfBirth: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
  };
}

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await apiClient.post("/users/register", payload);
  return response.data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await apiClient.post("/users/login", payload);
  return response.data;
};

export const updateProfile = async (payload: { fullname?: string }) => {
  const response = await apiClient.put("/users/profile", payload);
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get("/users/profile");
  return response.data;
};
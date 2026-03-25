export interface StoredUser {
  id: string;
  fullname: string;
  email: string;
  dateOfBirth: string;
  role: string;
}

const TOKEN_KEY = "tide_token";
const USER_KEY = "tide_user";

export const saveAuth = (token: string, user: StoredUser) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUser = (): StoredUser | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
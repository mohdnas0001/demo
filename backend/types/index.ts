export interface ErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

export interface LoginResponse {
  accessToken?: string;
  message?: string;
}


export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  password: string;
}

export interface Item {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  userId: string;
  user: User;
}
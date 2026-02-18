// Use relative URL for production (nginx will proxy), or env variable for development
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  age: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

// Get all users
export const getUsers = async (): Promise<ApiResponse<User[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch users',
    };
  }
};

// Create a new user
export const createUser = async (userData: CreateUserData): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user',
    };
  }
};

// Health check
export const healthCheck = async (): Promise<ApiResponse<{ status: string; message: string }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Health check failed',
    };
  }
};

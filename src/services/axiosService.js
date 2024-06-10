import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Set Authorization header for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    if (status === 400 && data.error === 'Invalid email or password') {
      throw new Error('Invalid email or password');
    }
    throw new Error(data.error || 'An error occurred');
  }
  throw new Error('API is not reachable');
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const token = response.data.token;
    Cookies.set('token', token);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (email, username, password) => {
  try {
    const response = await axiosInstance.post('/auth/register', { email, username, password });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const logout = () => {
  Cookies.remove('token');
};

export const checkTokenValidity = async () => {
  try {
    const response = await axiosInstance.get('/fetch/account/');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


export default {
  login,
  register,
  logout,
  checkTokenValidity
};

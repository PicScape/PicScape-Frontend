import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.VUE_APP_API_URL;
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
      config.headers.Authorization = `${token}`;
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
  const token = Cookies.get('token');
  if (token){
    try {
      const response = await axiosInstance.get('/fetch/account/');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }else{
    return false;
  }
  
};

export const uploadWallpaper = async (title, image, tags) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    tags.forEach(tag => {
      formData.append('tags', tag);
    });

    const response = await axiosInstance.post('/upload/wallpaper', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const uploadProfilePicture = async (title, image, tags) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    tags.forEach(tag => {
      formData.append('tags', tag);
    });

    const response = await axiosInstance.post('/upload/pfp', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};



export default {
  login,
  register,
  logout,
  checkTokenValidity,
  uploadProfilePicture,
  uploadWallpaper
};

import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.VUE_APP_API_URL;
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

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

export const getAccounts = async () => {
  try {
    const response = await axiosInstance.get('/admin/fetch/getAccounts');

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};







export default {

    getAccounts
};
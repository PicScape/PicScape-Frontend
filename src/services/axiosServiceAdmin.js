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

export const getAccounts = async (sortField, sortOrder, searchValue) => {
  try {
    const response = await axiosInstance.get('/admin/fetch/getAccounts', {
      params: {
        sortField: sortField,
        sortOrder: sortOrder,
        searchValue: searchValue

      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};



export const deleteAccount = async (accountId) => {
  try {
    const response = await axiosInstance.delete('/admin/action/delete', {
      params: {
        accountId: accountId 
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};





export default {

    getAccounts,
    deleteAccount
};

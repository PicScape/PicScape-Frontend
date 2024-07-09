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






export const verifyLoginCode = async (email, code) => {
  try {
    const response = await axiosInstance.post('/auth/verify', { email, code });
    const token = response.data.token;
    Cookies.set('token', token);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


export const ActivateAccount = async (activationToken) => {
    try {
      const response = await axiosInstance.get(`/auth/activate?activationToken=${activationToken}`);
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

export const uploadWallpaper = async (title, image, tags, description) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

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

export const uploadProfilePicture = async (title, image, tags, description) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

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

export const updateCredentials = async (username, email, password) => {
  try {
    const response = await axiosInstance.put('/auth/edit', { username, email, password });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getNewestUploads = async (type, page = 1) => {
  try {
    const response = await axiosInstance.get('/image/newest/', {
      params: {
        type: type,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export const getUploadsQuery = async (type, page = 1, searchQuery) => {
  try {
    const response = await axiosInstance.get('/image/search/', {
      params: {
        searchQuery: searchQuery,
        type: type,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getUploadsFromUser = async (type, page = 1, userid) => {
  try {
    const response = await axiosInstance.get('/image/myscape/', {
      params: {
        type: type,
        page: page,
        userid: userid
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export const getImageDetails = async (imageId) => {
  try {
    const response = await axiosInstance.get(`/image/data/${imageId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export const deleteUpload = async (imgId) => {
  try {

    const response = await axiosInstance.delete(`/image/delete/${imgId}`, {

      
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUser = async (identifier, value) => {
  try {
    let response;
    if (identifier === 'userId') {
      response = await axiosInstance.get(`/fetch/user`, {
        params: {
          userId: value
        }
      });
    } else if (identifier === 'username') {
      response = await axiosInstance.get(`/fetch/user`, {
        params: {
          username: value
        }
      });
    } else {
      throw new Error('Invalid identifier. Use "userId" or "username".');
    }
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
  uploadWallpaper,
  updateCredentials,
  getNewestUploads,
  getImageDetails,
  deleteUpload,
  getUser,
  verifyLoginCode,
  ActivateAccount,
  getUploadsFromUser,
  getUploadsQuery
};

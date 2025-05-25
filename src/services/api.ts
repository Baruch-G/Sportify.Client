import axios from 'axios';

const baseURL = import.meta.env.VITE_SPORTIFY_SERVER_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication if needed
api.interceptors.request.use(
  (config) => {
    console.log('[API Interceptor] Running for URL:', config.url);
    const token = localStorage.getItem('accessToken');
    console.log('[API Interceptor] Token from localStorage (accessToken):', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[API Interceptor] Authorization header set.');
    } else {
      console.warn('[API Interceptor] No token found in localStorage.');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          console.error('Unauthorized access');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api; 
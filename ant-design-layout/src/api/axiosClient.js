const axios = require('axios');

const axiosClient = axios.create({
    //timeout: 5000,
    baseURL: 'http://localhost:4000',
    headers: {
      'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return config;
  });
  
axiosClient.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    (error) => {
      debugger;
      notifFailure(error);
      throw error;
    },
  );
  
export default axiosClient;
  

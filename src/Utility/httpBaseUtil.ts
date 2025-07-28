import axios from 'axios';

export const httpBase = () => {
  const baseURL3001 = import.meta.env.VITE_APP_URL;
  const getApiKey = import.meta.env.VITE_NEWS_API_KEY;

  const V2Headers = {
    Accept: '*',
    'X-Api-Key':getApiKey
  };

  const api = axios.create({
    baseURL: `${baseURL3001}`,
    headers: { ...V2Headers },
    responseType: 'json',
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (401 === error.response.status) {
        console.log(error, '401');
      }
      if (404 === error.response.status) {
        console.log(error, '404');
      }
      if (500 === error.response.status) {
        console.log(error, '500');
      }
      return Promise.reject(JSON.stringify(error));
    }
  );

  return api;
};
// export default httpBase;

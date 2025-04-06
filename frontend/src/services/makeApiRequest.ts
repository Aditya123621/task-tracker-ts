import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = null;
  document.body.style.cursor = "wait";
  return config;
});
instance.interceptors.response.use(
  (response) => {
    document.body.style.cursor = "default";
    return response;
  },
  async (error) => {
    document.body.style.cursor = "default";
    return Promise.reject(error);
  }
);
export default instance;

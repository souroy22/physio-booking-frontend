import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { customLocalStorage } from "../utils/localStorage";

// interface CommonHeaderProperties extends HeadersDefaults {
//   "Content-Type"?: string;
//   Authorization?: string;
// }

// const token = customLocalStorage.getData("token");

// const headers: CommonHeaderProperties = {
//   ...axios.defaults.headers,
//   "Content-Type": "application/json",
// };

// headers["Authorization"] = `Bearer ${token}`;

// console.log("Token", token);

// const AXIOS = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: headers,
// });

// export default AXIOS;

const getToken = () => customLocalStorage.getData("token");

// Function to create a new Axios instance with updated headers
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor to update headers before each request
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create an initial Axios instance
const AXIOS = createAxiosInstance();

export default AXIOS;

import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { customLocalStorage } from "../utils/localStorage";

interface ErrorResponseData {
  error: string; // Define the structure based on your API error response
  // Add other properties if needed
}

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

  instance.interceptors.response.use(
    (response) => {
      // If request is successful, return response
      return response;
    },
    (error: AxiosError<ErrorResponseData>) => {
      // If there's an error, handle it
      console.log("Error", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
        console.error("Status code:", error.response.status);
        if (error.response?.data && error.response?.data.error) {
          error.message = error.response?.data?.error;
        }
        // Handle error response as needed, e.g., show error message to the user
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
      // Return a rejected promise so the error can be caught further
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create an initial Axios instance
const AXIOS = createAxiosInstance();

export default AXIOS;

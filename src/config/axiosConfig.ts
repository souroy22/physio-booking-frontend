import axios, { HeadersDefaults } from "axios";
import { customLocalStorage } from "../utils/localStorage";

interface CommonHeaderProperties extends HeadersDefaults {
  "Content-Type"?: string;
  Authorization?: string;
}

const token = customLocalStorage.getData("token");
const headers: CommonHeaderProperties = {
  ...axios.defaults.headers,
  "Content-Type": "application/json",
};

headers["Authorization"] = `Bearer ${token}`;

console.log("Token", token);

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: headers,
});

export default AXIOS;

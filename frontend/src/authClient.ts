import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.VITE_ERGHI_API_URL}/auth`,
  withCredentials: true
});
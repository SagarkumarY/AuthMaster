import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // replace with your API URL
  withCredentials: true, // set to true to use the credentials returned
  timeout: 10000,
});



export default axiosInstance;
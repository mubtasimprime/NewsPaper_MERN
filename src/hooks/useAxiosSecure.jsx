import axios from "axios";
// import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;

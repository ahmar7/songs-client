import axios from "axios";
import { baseUrl } from "../utils/Constant.js";
const axiosService = axios.create({
  baseURL: baseUrl,
});

export const postApi = async (endpoint, data) => {
  try {
    const response = await axiosService.post(endpoint, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return (
      error?.response?.data || {
        success: false,
        msg: error?.message,
      }
    );
  }
};

import { deleteApi, getApi, putApi, postApi, patchApi } from "./axiosService";

export const addMovieApi = (data) => {
  return postApi("addCategory", data);
};
export const getAuthApi = (data) => {
  return getApi("adminAuth", data);
};
export const isSelectedApi = (data, id) => {
  return putApi(`isSelected/${id}`, data);
};

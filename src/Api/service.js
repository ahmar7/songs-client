import { deleteApi, getApi, putApi, postApi, patchApi } from "./axiosService";

export const addMovieApi = (data) => {
  return postApi("addCategory", data);
};

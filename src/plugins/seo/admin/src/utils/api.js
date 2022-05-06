// ./admin/src/utils/api.js
import instance from "./axiosInstance";
import pluginId from "../pluginId";

const fetchContentTypes = async () => {
  try {
    const data = await instance.get(`/${pluginId}/content-types`);
    return data;
  } catch (error) {
    return null;
  }
};

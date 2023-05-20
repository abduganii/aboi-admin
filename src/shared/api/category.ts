import urls from "../constants/urls";
import api from "./axios";

export const GetCategory = async () => {
    const response = await api.get(urls.CATEGORY);
    return response.data;
}

export const GetCategorybyid = async (id: any) => {
    const response = await api.get(urls.CATEGORY + `/${id}`);
    return response.data;
}
export const creatCategory = (data: any) => api.post(urls.CATEGORY, data)

export const UpdatCategory = (data: any, id: any) => api.put(urls.CATEGORY + `/${id}`, data)


export const deletCategory = (id: any) => api.delete(urls.CATEGORY + `/${id}`)
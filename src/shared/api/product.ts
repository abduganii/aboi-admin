import urls from "../constants/urls";
import api from "./axios";

export const GetPRODUCTS = async () => {
    const response = await api.get(urls.PRODUCTS);
    return response.data;
}

export const GetPRODUCTSbyid = async (id: any) => {
    const response = await api.get(urls.PRODUCTS + `/${id}`);
    return response.data;
}
export const creatPRODUCTS = (data: any) => api.post(urls.PRODUCTS, data)

export const UpdatPRODUCTS = (data: any, id: any) => api.put(urls.PRODUCTS + `/${id}`, data)


export const deletPRODUCTS = (id: any) => api.delete(urls.PRODUCTS + `/${id}`)
import urls from "../constants/urls";
import api from "axios";

export const UploadImg = async (data: any) => await api.post('https://storage-oboi.getter.uz/upload/image', data)
export const DeleteImg = async (data: any) => await api.delete('https://storage-oboi.getter.uz/remove', data)
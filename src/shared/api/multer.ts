import urls from "../constants/urls";
import api from "axios";

export const UploadImg = async (data: any) => await api.post('http://localhost:5000/upload/image', data)
export const DeleteImg = async (data: any) => await api.delete('http://localhost:5000/remove', data)
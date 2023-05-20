import urls from "../constants/urls";
import api from "./axios";

export const Loginuser = async (data: any,) =>
    api.post(urls.LOGIN, data)
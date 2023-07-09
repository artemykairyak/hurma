import { handleResponse, instance } from "@services/apiService/apiService";
import { BaseResponse } from "@services/apiService/types";
import { AxiosRequestConfig } from "axios";

interface Profile {
  chatId: string;
  email: string;
  subscription: boolean;
}

export const getProfile = async (config?: AxiosRequestConfig) => {
  return await handleResponse<Profile>(instance.get(`/profile`, { ...config }));
};

export const subscribe = async (config?: AxiosRequestConfig) => {
  return await handleResponse<BaseResponse>(
    instance.post("/subscribe", {}, { ...config })
  );
};

export const unsubscribe = async (config?: AxiosRequestConfig) => {
  return await handleResponse<BaseResponse>(
    instance.post("/unsubscribe", {}, { ...config })
  );
};

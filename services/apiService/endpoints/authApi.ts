import { handleResponse, instance } from "@services/apiService/apiService";
import { BaseResponse } from "@services/apiService/types";
import { AxiosRequestConfig } from "axios";

export const login = async (
  email: string,
  password: string,
  config?: AxiosRequestConfig
) => {
  return await handleResponse<BaseResponse>(
    instance.post(
      "/login",
      {
        email,
        password,
      },
      { ...config }
    )
  );
};

export const signUp = async (email, password, config?: AxiosRequestConfig) => {
  return await handleResponse<BaseResponse>(
    instance.post(
      "/sign-up",
      {
        email,
        password,
      },
      { ...config }
    )
  );
};

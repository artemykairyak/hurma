import { handleResponse, instance } from "@services/apiService/apiService";
import { BaseResponse } from "@services/apiService/types";
import { AxiosRequestConfig } from "axios";

export interface CreateLink {
  createdAt: string;
  expiresAt: string;
  fullUrl: string;
  title: string;
}

export interface Link {
  clicksTotal: number;
  expiresAt: string;
  id: string;
  shortUrl: string;
  title: string;
}

export interface LinksResponse {
  data: Link[];
  total: 0;
}

type EditLink = Pick<CreateLink, "title" | "expiresAt">;

export const getLinks = async (
  page: number = 1,
  config?: AxiosRequestConfig
) => {
  return await handleResponse<LinksResponse>(
    instance.get(`/links?page=${page}`, { ...config })
  );
};

export const createLink = async (
  data: CreateLink,
  config?: AxiosRequestConfig
) => {
  return await handleResponse<BaseResponse>(
    instance.post("/links", data, { ...config })
  );
};

export const editLink = async (data: EditLink, config?: AxiosRequestConfig) => {
  return await handleResponse<BaseResponse>(
    instance.patch("/links", data, { ...config })
  );
};

export const deleteLink = async (
  linkId: string,
  config?: AxiosRequestConfig
) => {
  return await handleResponse<BaseResponse>(
    instance.delete(`/links/${linkId}`, { ...config })
  );
};

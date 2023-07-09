import { handleResponse, instance } from "@services/apiService/apiService";
import { AxiosRequestConfig } from "axios";

interface StatisticsItem {
  clicks: number;
  date: string;
}

export const getStatistics = async (
  period: number,
  config?: AxiosRequestConfig
) => {
  return await handleResponse<StatisticsItem[]>(
    instance.get(`/statistics?period=${period}`, { ...config })
  );
};

export const getStatisticsByLink = async (
  link: string,
  period: number,
  config?: AxiosRequestConfig
) => {
  return await handleResponse<StatisticsItem[]>(
    instance.get(`/statistics/${link}?period=${period}`, { ...config })
  );
};

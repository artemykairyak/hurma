import axios, { AxiosResponse } from 'axios';

const params = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const instance = axios.create({
  ...params,
});

const authInstance = axios.create({
  ...params,
});

const authInterceptor = (config) => {
  // config.headers.Cookie = getCookie('token');
  return config;
};

authInstance.interceptors.request.use(authInterceptor);

export const handleResponse = async <T>(
  res: Promise<AxiosResponse<T>>,
): Promise<[T | null, string | null]> => {
  try {
    const result = await res;
    return [result.data, null];
  } catch (error) {
    return [null, error?.message || ''];
  }
};

export { instance, authInstance };

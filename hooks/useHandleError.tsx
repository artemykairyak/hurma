import { BaseResponse } from "@services/apiService/types";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export const useHandleError = () => {
  const router = useRouter();

  return (error: BaseResponse) => {
    if (error.code === 401) {
      document.cookie = `hurmaLogged=""; Path=/; Expires=${dayjs().subtract(
        1,
        "day"
      )};`;
      router.replace("/login");
      return error.message;
    }

    return error.message;
  };
};

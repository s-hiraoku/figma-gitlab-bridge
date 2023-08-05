import { HTTP_STATUS_CODES } from "@utils/http";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type UseHttpErrorHandlerReturnType = {
  handleHttpError: <E extends AxiosError>(error: E) => void;
};

export const useHttpErrorHandler = (): UseHttpErrorHandlerReturnType => {
  const router = useRouter();

  const handleHttpError = <E extends AxiosError>(error: E) => {
    toast.error("エラーが発生しました。");
    switch (error.response?.status) {
      case HTTP_STATUS_CODES.UNAUTHORIZED:
        // TODO: Uncomment this line when login page is ready.
        // router.push("/login");
        return Promise.reject(error.response?.data);
      case HTTP_STATUS_CODES.NOT_FOUND:
        console.log("404 error");
        router.push("/404");
        return Promise.reject(error.response?.data);
      default:
        console.log(error);
        router.push("/unexpectedError");
        return Promise.reject(error.response?.data);
    }
  };

  return { handleHttpError };
};

import { HTTP_STATUS_CODES } from "@utils/httpStatusCodes";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

type UseHttpErrorHandlerReturnType = {
  handleHttpError: <E extends AxiosError>(error: E) => void;
};

export const useHttpErrorHandler = (): UseHttpErrorHandlerReturnType => {
  const router = useRouter();

  const handleHttpError = <E extends AxiosError>(error: E) => {
    switch (error.response?.status) {
      case HTTP_STATUS_CODES.UNAUTHORIZED:
        // TODO: Uncomment this line when login page is ready.
        // router.push("/login");
        return Promise.reject(error.response?.data);
      case HTTP_STATUS_CODES.NOT_FOUND:
        console.log("404 error");
        router.push("/404");
        return Promise.reject(error.response?.data);
    }
  };

  return { handleHttpError };
};

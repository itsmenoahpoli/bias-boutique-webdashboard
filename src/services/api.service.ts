import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    /**
     * Set Headers
     */
    config.headers["Accept"] = "application/json";
    // config.headers["Content-Type"] = "application/json";

    /**
     * Force HTTPS
     */
    if (
      !config.url?.includes("localhost") &&
      config.url &&
      !config.url.startsWith("https://")
    ) {
      config.url = config.url.replace("http://", "https://");
    }
    if (
      !config.baseURL?.includes("localhost") &&
      config.baseURL &&
      !config.baseURL.startsWith("https://")
    ) {
      config.baseURL = config.baseURL.replace("http://", "https://");
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      const { status } = error.response;

      if (status === 500) {
        console.error({
          message: "Error",
          description: "Server error occured!",
        });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

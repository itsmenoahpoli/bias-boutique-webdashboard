import $httpClient from "./api.service";

export type SigninApiResponse = {
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      account_type: string;
    };
    token: string;
  };
};

export const useAuthService = () => {
  const signinUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    return await $httpClient.post<SigninApiResponse>(
      "/auth/signin",
      credentials
    );
  };

  return {
    signinUser,
  };
};

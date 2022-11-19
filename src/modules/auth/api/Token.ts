import { api } from "../../common/api/api";

type PostRegistrationQuery = {
  email: string;
  password: string;
};

type PostRegistrationQueryResponse = string;

const extendedApi = api.injectEndpoints({
  endpoints: build => ({
    authenticateUser: build.mutation<PostRegistrationQueryResponse, PostRegistrationQuery>({
      query: body => ({
        url: "/authentication_token",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAuthenticateUserMutation } = extendedApi;

import { api } from "../../common/api/api";

type PostRegistrationQuery = {
  email: string;
  phonenumber: string;
  password: string;
};

type PostRegistrationQueryResponse = string;

const extendedApi = api.injectEndpoints({
  endpoints: build => ({
    registerUser: build.mutation<PostRegistrationQueryResponse, PostRegistrationQuery>({
      query: body => ({
        url: "/registration",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = extendedApi;

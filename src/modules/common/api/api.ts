import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TAGS = {};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hackyeah.dev.volt.io/",
    prepareHeaders: (headers, { getState }) => {
      const states: any = getState();
      headers.set("authorization", `Bearer ${states.authReducer.authUser.token}`);

      return headers;
    },
  }),
  endpoints: builder => ({
    auth: builder.query({
      query: () => ({
        url: "authentication_token",
        method: "POST",
      }),
    }),
  }),
});

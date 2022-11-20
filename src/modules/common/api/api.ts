import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TAGS = {};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hackyeah.dev.volt.io/api" }),
  endpoints: () => ({}),
});

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TAGS = {};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://3.73.125.250:8000/" }),
  endpoints: () => ({}),
});

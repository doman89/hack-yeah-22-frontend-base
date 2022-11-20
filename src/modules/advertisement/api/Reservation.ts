import { api } from "../../common/api/api";

type PostReserveFoodQuery = {
  id: string;
};

type PostReserveFoodQueryResponse = string;

const extendedApi = api.injectEndpoints({
  endpoints: build => ({
    reserveFood: build.mutation<PostReserveFoodQueryResponse, PostReserveFoodQuery>({
      query: body => ({
        url: `/api/food/${body.id}/reserve`,
        method: "POST",
      }),
    }),
  }),
});

export const { useReserveFoodMutation } = extendedApi;

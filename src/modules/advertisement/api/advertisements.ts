import { api } from "../../common/api/api";

type Food = {
  id: number;
  name: string;
  description?: string;
  image: string;
  dueDate: string;
  reservation: string;
};

type FoodOwner = {
  id: number;
  email: string;
};

type PostAdvertisementQuery = {
  lat: number;
  lng: number;
  food: Omit<Food, "id" | "reservation">[];
};

type PostAdvertisementQueryResponse = {};

type GetAdvertisementQuery = {
  id: string;
};

type GetAdvertisementQueryResponse = {
  id: number;
  lat: number;
  lng: number;
  description: string;
  food: Food[];
  owner: FoodOwner;
  createdAt: string;
  updatedAt: string;
};

const extendedApi = api.injectEndpoints({
  endpoints: build => ({
    postAdvertisement: build.mutation<PostAdvertisementQueryResponse, PostAdvertisementQuery>({
      query: body => ({
        url: "/api/advertisements",
        method: "POST",
        body,
      }),
    }),
    getAdvertisement: build.query<GetAdvertisementQueryResponse, GetAdvertisementQuery>({
      query: ({ id }) => ({
        url: `/api/advertisement/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { usePostAdvertisementMutation, useGetAdvertisementQuery } = extendedApi;

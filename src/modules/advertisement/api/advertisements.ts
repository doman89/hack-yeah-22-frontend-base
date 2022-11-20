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

export type GetAdvertisementQueryResponse = {
  id: number;
  lat: number;
  lng: number;
  description: string;
  food: Food[];
  owner: FoodOwner;
  createdAt: string;
  updatedAt: string;
};

type GetAdvertisementsQuery = {
  page: number;
  latGt: string;
  latLt: string;
  lngGt: string;
  lngLt: string;
};

export type GetAdvertisementsQueryResponse = GetAdvertisementQueryResponse[];

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
        url: `/api/advertisements/${id}`,
        method: "GET",
      }),
    }),
    getAdvertisements: build.query<GetAdvertisementsQueryResponse, GetAdvertisementsQuery>({
      query: ({ page, latGt, latLt, lngGt, lngLt }) => ({
        url: `/api/advertisements?page=${page}&lat[gt]=${latGt}&lat[lt]=${latLt}&lng[gt]=${lngGt}&lng[lt]=${lngLt}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  usePostAdvertisementMutation,
  useGetAdvertisementQuery,
  useGetAdvertisementsQuery,
  useLazyGetAdvertisementsQuery,
} = extendedApi;

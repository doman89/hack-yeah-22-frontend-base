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

type GetAdvertisementsQuery = {
  page: number;
  latBetween: string;
  latGt: string;
  latGte: string;
  latLt: string;
  latLte: string;
  lngBetween: string;
  lngGt: string;
  lngGte: string;
  lngLt: string;
  lngLte: string;
};

type GetAdvertisementsQueryResponse = GetAdvertisementQueryResponse[];

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
      query: ({
        page,
        latBetween,
        latGt,
        latGte,
        latLt,
        latLte,
        lngBetween,
        lngGt,
        lngGte,
        lngLt,
        lngLte,
      }) => ({
        url: `/api/advertisements?page=${page}&lat[Between]=${latBetween}&lat[gt]=${latGt}&lat[gte]=${latGte}&lat[lt]=${latLt}&lat[lte]=${latLte}&lng[between]=${lngBetween}&lng[gt]=${lngGt}&lng[gte]=${lngGte}&lng[lt]=${lngLt}&lng[lte]=${lngLte}`,
        method: "GET",
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

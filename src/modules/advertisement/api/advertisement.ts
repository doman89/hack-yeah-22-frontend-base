import { api } from "../../common/api/api";

type Food = {
  name: string;
  description: string;
  image: string;
  dueDate: string;
};

type PostAdvertisementQuery = {
  lat: 0;
  lng: 0;
  image: string;
  description: string;
  food: Food[];
};

type PostAdvertisementQueryResponse = string;

const extendedApi = api.injectEndpoints({
  endpoints: build => ({
    postAdvertisement: build.mutation<PostAdvertisementQueryResponse, PostAdvertisementQuery>({
      query: body => ({
        url: "/api/advertisement",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostAdvertisementMutation } = extendedApi;

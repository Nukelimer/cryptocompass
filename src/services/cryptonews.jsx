import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoNewsHeader = {
  "x-rapidapi-key":  '9998929253msh4acd3dc6ebeb49cp1afdf9jsncc26a5273dac',
  "x-rapidapi-host": 'cryptocurrency-news2.p.rapidapi.com',
};

const baseUrl = "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk?limit=10";

const createRequest = (url) => ({ url, headers: cryptoNewsHeader });


export const cryptoNewsAPI = createApi({
  reducerPath: "cryptoNewsAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest(),
    }),
  }),
});

// export const { useGetCryptoNews } = cryptoNewsAPI;
export const useGetCryptoNews = cryptoNewsAPI.endpoints.getCryptoNews.useQuery;





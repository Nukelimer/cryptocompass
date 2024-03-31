import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",

  "x-rapidapi-key": "9998929253msh4acd3dc6ebeb49cp1afdf9jsncc26a5273dac",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";





const createRequest = (url, options = {}) => {
  const { timePeriod } = options;
  return {
    url,
    headers: cryptoApiHeaders,
    timePeriod,
  };
};


export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId , timePeriod }) =>
        createRequest(`/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`),
        // params: {
        //   referenceCurrencyUuid: 'yhjMzLPhuIDl',
        //   timePeriod: '3m'
        // },
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;

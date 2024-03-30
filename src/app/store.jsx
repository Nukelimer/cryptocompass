import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoapp";
import { cryptoNewsAPI } from "../services/cryptonews";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsAPI.reducerPath]: cryptoNewsAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsAPI.middleware),
});

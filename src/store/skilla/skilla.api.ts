import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.skilla.ru/mango/',
    headers: { Authorization: `Bearer testtoken` },
  }),
  endpoints: (build) => ({
    getList: build.mutation({
      query: () => ({
        url: `getList`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetListMutation } = api;

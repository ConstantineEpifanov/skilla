import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { today, twoDaysAgo } from '../../utils/constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.skilla.ru/mango/',
    headers: { Authorization: `Bearer testtoken` },
  }),
  endpoints: (build) => ({
    getList: build.mutation({
      query: ({
        date_start = twoDaysAgo,
        date_end = today,
        in_out = 'all',
      }) => ({
        url: `getList`,
        method: 'POST',
        params: {
          date_start,
          date_end,
          in_out,
        },
      }),
    }),
    getSortedList: build.mutation({
      query: ({
        order,
        sort_by,
        date_start = twoDaysAgo,
        date_end = today,
        in_out = 'all',
      }) => ({
        url: `getList`,
        method: 'POST',
        params: {
          date_start,
          date_end,
          in_out,
          sort_by,
          order,
        },
      }),
    }),
    getRecord: build.mutation({
      query: ({ record, partnership_id }) => ({
        url: `getRecord`,
        method: 'POST',
        params: {
          record,
          partnership_id,
        },
        headers: {
          Authorization: `Bearer testtoken`,
          'Content-type': 'record.mp3',
          'Content-Transfer-Encoding': 'binary',
          'Content-Type':
            'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
        },
        responseHandler: (response: Response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetListMutation,
  useGetSortedListMutation,
  useGetRecordMutation,
} = api;

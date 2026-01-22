import { baseApi } from '@/redux/api/baseApi';

export interface IShipping {
  _id: string
  name: string;
  type: string;
  amount: number;
  global: string;
}

const ShippingsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllShippings: builder.query({
      query: params => ({
        url: '/shipping',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: IShipping[] }) => response.data,
    }),
    getAllShippingStats: builder.query({
      query: () => ({
        url: '/shipping/stats/all',
        method: 'GET'
      }),
      transformResponse: (response: { data: IShipping[] }) => response.data,
    }),
    getSingleShipping: builder.query<IShipping, string>({
      query: id => ({
        url: `/shipping/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IShipping }) => response.data,
    }),
    createShipping: builder.mutation<IShipping, Partial<IShipping>>({
      query: newShippings => ({
        url: '/shipping/create-shipping',
        method: 'POST',
        body: newShippings,
      }),
      transformResponse: (response: { data: IShipping }) => response.data,
    }),
    updateShipping: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/shipping/update-shipping/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
    deleteShipping: builder.mutation({
      query: id => ({
        url: `/shipping/delete-shipping/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateShippingMutation,
  useGetAllShippingsQuery,
  useGetSingleShippingQuery,
  useUpdateShippingMutation,
  useDeleteShippingMutation,
  useGetAllShippingStatsQuery
} = ShippingsApi;

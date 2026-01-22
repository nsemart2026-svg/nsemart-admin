import { baseApi } from '@/redux/api/baseApi';

const vendorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createVendor: builder.mutation({
      query: data => ({
        url: '/vendor/create-vendor',
        method: 'POST',
        body: data,
      }),
    }),
    getVendors: builder.query({
      query: () => ({
        url: '/vendor',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateVendorMutation,useGetVendorsQuery } = vendorApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShops: builder.query<any, void>({
      query: () => ({
        url: "/shop",
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),

    createShop: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `/shop/create-shop/${userId}`,
        method: "POST",
        body: formData,
      }),
    }),

    getSingleShop: builder.query<any, string>({
      query: (id) => ({
        url: `/shop/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),

    getVendorShops: builder.query<any, string>({
      query: (id) => ({
        url: `/shop/vendorId/${id}`,
        method: "GET",
      }),
    }),

    getMyShop: builder.query<any, string>({
      query: (vendorId) => ({
        url: `/shop/my-shop/${vendorId}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),


    getAllShopStats: builder.query<any, void>({
      query: () => ({
        url: "/shop/stats/all-shop-stats",
        method: "GET",
      }),
    }),

    patchShopStats: builder.mutation<any, { id: string; status: string; updatedBy: string }>({
      query: ({ id, status, updatedBy }) => ({
        url: `/shop/update-status/${id}`,
        method: "PATCH",
        body: { status, updatedBy },
      }),
    }),

    updateShop: builder.mutation<any, { shopId: string; userId: string; formData: any }>({
      query: ({ shopId, userId, formData }) => ({
        url: `/shop/update-shop/${shopId}/${userId}`,
        method: "PATCH",
        body: formData,
      }),
    }),

   deleteShop: builder.mutation<any, { shopId: string; deletedBy: string }>({
  query: ({ shopId, deletedBy }) => ({
    url: `/shop/delete-shop/${shopId}`,
    method: "DELETE",
    body: { deletedBy },
  }),
}),

  }),
});

export const {
  useGetAllShopsQuery,
  useGetSingleShopQuery,
  useCreateShopMutation,
  useGetVendorShopsQuery,
  useGetMyShopQuery, 
  useGetAllShopStatsQuery,
  usePatchShopStatsMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
} = shopApi;

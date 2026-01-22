/* eslint-disable @typescript-eslint/no-explicit-any */
import { IInventoryStats } from "@/app/(dashboard)/(dashboardLayout)/admin/inventory-management/page";
import { baseApi } from "@/redux/api/baseApi";
import { Product } from "@/types/Product";

const productApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllProducts: builder.query<Product[], Record<string, any>>({
      query: params => ({
        url: `/product`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: Product[] }) => response.data,
    }),

    getSingleProduct: builder.query<Product, string>({
      query: id => ({
        url: `/product/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: Product }) => response.data,
    }),
    productInventory: builder.query({
      query: () => ({
        url: `/product/inventory/stats`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IInventoryStats }) => response.data,
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: formData => ({
        url: '/product/create-product',
        method: 'POST',
        body: formData,
      }),
    }),
    updateProduct: builder.mutation<Product, { id: string; formData: any }>({
      query: ({ id, formData }) => ({
        url: `/product/update-product/${id}`,
        method: 'PATCH',
        body: formData,
      }),
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `/product/delete-product/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { message: string }) => response,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useProductInventoryQuery
} = productApi;

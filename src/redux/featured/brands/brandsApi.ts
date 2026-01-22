import { baseApi } from "@/redux/api/baseApi";
import { IBrand } from "@/types/brands";

const brandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all brands
    getAllBrands: builder.query<IBrand[], void>({
      query: () => ({
        url: "/brand",
        method: "GET",
      }),
      transformResponse: (response: { data: IBrand[] }) => response.data,
    }),

    // ✅ Get single brand
    getSingleBrand: builder.query<IBrand, string>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: IBrand }) => response.data,
    }),

    // ✅ Create brand (accept FormData)
    createBrand: builder.mutation<IBrand, FormData>({
      query: (formData) => ({
        url: "/brand/create-brand",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: { data: IBrand }) => response.data,
    }),

    // ✅ Update brand (accept FormData)
    updateBrand: builder.mutation<
      IBrand,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/brand/edit-brand/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: { data: IBrand }) => response.data,
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useGetSingleBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
} = brandsApi;

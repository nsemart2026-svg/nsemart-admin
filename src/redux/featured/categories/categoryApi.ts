/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/redux/api/baseApi';
import { ICategory } from '@/types/Category';

const categoriesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: '/category',
        method: 'GET',
      }),
      transformResponse: (response: { data: ICategory[] }) => response.data,
    }),
    getSingleCategory: builder.query<ICategory, string>({
      query: id => ({
        url: `/category/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: ICategory }) => response.data,
    }),
    createCategory: builder.mutation<ICategory, any>({
      query: newCategory => ({
        url: '/category/create-category',
        method: 'POST',
        body: newCategory,
      }),
      transformResponse: (response: { data: ICategory }) => response.data,
    }),
    EditCategory: builder.mutation<ICategory, { id: string; updateDetails: any } >({
      query: ({ id, updateDetails }) => ({
        url: `/category/edit-category/${id}`,
        method: 'PATCH',
        body: updateDetails,
      }),
      transformResponse: (response: { data: ICategory }) => response.data,
    }),
    getMainCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: '/category/main-categories',
        method: 'GET',
      }),
      transformResponse: (response: { data: ICategory[] }) => response.data,
    }),
    getSubCategories: builder.query<ICategory[], string>({
      query: (parentId) => ({
        url: `/category/subcategories/${parentId}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: ICategory[] }) => response.data,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useEditCategoryMutation,
  useGetMainCategoriesQuery,
  useGetSubCategoriesQuery
} = categoriesApi;

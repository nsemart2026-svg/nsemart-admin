/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/redux/api/baseApi';
import { IAttribute } from '@/types/attribute';

interface AttributeData {
  data: IAttribute[],
  meta: any
}


export const attributeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAttributes: builder.query({
      query: params => ({
        url: '/attribute',
        method: 'GET',
        params,
      }),
      transformResponse: (response: { data: AttributeData }) => response.data,
    }),
    getAttributeById: builder.query<IAttribute[], void>({
      query: id => ({
        url: `/attribute/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: IAttribute[] }) => response.data,
    }),
    createAttribute: builder.mutation({
      query: newAttribute => ({
        url: '/attribute/create-attribute',
        method: 'POST',
        body: newAttribute,
      }),
    }),
    getAttributeStatus: builder.query({
      query: () => ({
        url: '/attribute/stats/all',
        method: 'GET',
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    updateAttribute: builder.mutation<
      IAttribute,
      { id: string; updateDetails: any }
    >({
      query: ({ id, updateDetails }) => ({
        url: `/attribute/update-attribute/${id}`,
        method: 'PATCH',
        body: updateDetails,
      }),
      transformResponse: (response: { data: IAttribute }) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAttributesQuery,
  useGetAttributeByIdQuery,
  useCreateAttributeMutation,
  useUpdateAttributeMutation,
  useGetAttributeStatusQuery
} = attributeApi;

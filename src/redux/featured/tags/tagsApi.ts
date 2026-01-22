/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { ITag } from "@/types/tags";

interface TagsData {
  data: ITag[];
  meta: any;
}

const tagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: (params) => ({
        url: "/tag",
        method: "GET",
        params,
      }),
      transformResponse: (response: { data: TagsData }) => response.data,
    }),
    getSingletag: builder.query<ITag, string>({
      query: (id) => ({
        url: `/tag/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: ITag }) => response.data,
    }),
    getTagStatus: builder.query({
      query: () => ({
        url: "/tag/status/all",
        method: "GET",
      }),
    }),
    createtag: builder.mutation<ITag, FormData>({
      query: (newtags) => ({
        url: "/tag/create-tag",
        method: "POST",
        body: newtags,
      }),
    }),
    updateTag: builder.mutation<ITag, { id: string; updatedData: any }>({
      query: ({ id, updatedData }) => ({
        url: `/tag/update-tag/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
  }),
});

export const {
  useCreatetagMutation,
  useGetAllTagsQuery,
  useGetSingletagQuery,
  useUpdateTagMutation,
  useGetTagStatusQuery,
} = tagsApi;

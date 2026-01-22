import { baseApi } from "@/redux/api/baseApi";
import { User } from "@/types/User";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({ 
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      transformResponse: (response: { data: User[] }) => response.data,
    }),
    getSingleUser: builder.query<User, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: User }) => response.data,
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: { data: User }) => response.data,
    }),
  }),
});

export const { 
  useGetAllUsersQuery, 
  useGetSingleUserQuery, 
  useUpdateUserMutation 
} = userApi;

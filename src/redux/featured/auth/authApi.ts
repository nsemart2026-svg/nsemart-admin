import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
     logout: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/auth/logout/${userId}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation,useLogoutMutation  } = authApi;


import { Admin } from "@/app/(dashboard)/(dashboardLayout)/admin/admin-list/page";
import { baseApi } from "@/redux/api/baseApi";

const adminprofileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query<Admin[], void>({
      query: () => ({
        url: "user/admins",
        method: "GET",
      }),
      transformResponse: (response: { data: Admin[] }) => response.data,
    }),
    getAdminProfile: builder.query({
      query: (params) => ({
        url: `user/admins/${params}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAdminsQuery, useGetAdminProfileQuery } =
  adminprofileApi;

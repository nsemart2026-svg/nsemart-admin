import { baseApi } from "@/redux/api/baseApi";
import { AdminStatsResponse } from "@/types/Dashboards";

export const vendordashboardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStatsResponse["data"], void>({
      query: () => ({
        url: " /stats/vendor/68e21d9db4adb759ec7ead93",
        method: "GET",
      }),
      transformResponse: (response: AdminStatsResponse) => response.data
    }),
  }),
});

export const { useGetAdminStatsQuery } = vendordashboardsApi;

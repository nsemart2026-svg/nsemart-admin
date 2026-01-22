import { baseApi } from "@/redux/api/baseApi";
import { AdminStatsResponse } from "@/types/Dashboards";

export const dashboardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStatsResponse["data"], void>({
      query: () => ({
        url: "/stats/admin",
        method: "GET",
      }),
      transformResponse: (response: AdminStatsResponse) => response.data
    }),
  }),
});

export const { useGetAdminStatsQuery } = dashboardsApi;

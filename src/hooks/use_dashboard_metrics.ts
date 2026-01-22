"use client";
import { DUMMY_DASHBOARD_METRICS } from "@/data/dashboard";
import { DashboardMetrics } from "@/types/analytics";

// import { useGetDashboardMetricsQuery } from "@/redux/featured/analytics/analyticsApi";

type UseDashboardMetricsResult = {
  data: DashboardMetrics;
  isLoading: boolean;
  isError: boolean;
};

export function useDashboardMetrics(): UseDashboardMetricsResult {
  const useDummy = process.env.NEXT_PUBLIC_USE_DUMMY_DASHBOARD === "1";

  // if (!useDummy) {
  //   const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  //   if (data) return { data, isLoading, isError };
  // }

  return { data: DUMMY_DASHBOARD_METRICS, isLoading: false, isError: false };
}

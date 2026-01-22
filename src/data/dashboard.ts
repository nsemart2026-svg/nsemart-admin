import { DashboardMetrics } from "@/types/analytics";

const CURRENCY: DashboardMetrics["productSale"]["totalAmount"]["currency"] =
  "BDT";
const COMMISSION_RATE = Number(
  process.env.NEXT_PUBLIC_COMMISSION_RATE ?? "0.10"
);

export const DUMMY_DASHBOARD_METRICS: DashboardMetrics = {
  productSale: {
    totalCount: 1420,
    totalAmount: { amount: 184_500, currency: CURRENCY },
  },
  commission: {
    rate: COMMISSION_RATE,
    amount: {
      amount: Math.round(184_500 * COMMISSION_RATE),
      currency: CURRENCY,
    },
  },
  withdraw: {
    totalWithdrawn: { amount: 120_000, currency: CURRENCY },
    pendingWithdraw: { amount: 10_000, currency: CURRENCY },
    lastWithdrawAt: "2025-09-30T13:00:00.000Z",
  },
};

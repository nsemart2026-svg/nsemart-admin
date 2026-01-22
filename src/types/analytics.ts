export interface Money {
  amount: number;
  currency: "AUD" | "USD" | "BDT" | string;
}

export interface TotalProductSale {
  totalCount: number;
  totalAmount: Money;
}
export interface CommissionSummary {
  rate: number;
  amount: Money;
}
export interface WithdrawSummary {
  totalWithdrawn: Money;
  pendingWithdraw?: Money;
  lastWithdrawAt?: string; // ISO
}

export interface DashboardMetrics {
  productSale: TotalProductSale;
  commission: CommissionSummary;
  withdraw: WithdrawSummary;
}

export interface OrderAmountDetails {
  subTotal: number;
  tax: number;
  shipping: { name: string; type: string };
  discount: number;
  total: number;
}

export interface OrderInfo {
  orderBy: string;
  shopInfo: string;
  vendorId: string;
  productInfo: string;
  trackingNumber: string;
  status: string;
  isCancelled: boolean;
  quantity: number;
  totalAmount: OrderAmountDetails;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface RecentOrder {
  _id: string;
  orderInfo: OrderInfo[]; // updated
  customerInfo: CustomerInfo;
  paymentInfo?: string;
  totalAmount: number;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export interface TopSellingProduct {
  product: string;
  productName: string;
  category: string;
  stock: string;
  totalSold?: number;
  totalRevenue?: number;
  totalSales?: number;
}

export interface TrendingProduct {
  _id: string;
  totalSold: number;
  totalRevenue: number;
  name: string;
  featuredImg: string;
  price: number;
  salePrice: number;
}

export interface TrendingProductsStats {
  comparedTo: string;
  trendingProducts: TrendingProduct[];
}

export interface TodayOrdersStats {
  vendorId?: string;
  todayCount: number;
  percentChange: number;
  todayHourlyData: { hourLabel: string; count: number }[];
}

export interface MonthlySales {
  totalSales: number;
  orderCount: number;
  monthName: string;
  year: number;
}

// updated for flexibility
export type MonthlySalesHistory =
  | { vendorId: string; monthlySales: MonthlySales[] }
  | MonthlySales[];

export interface SalesAndCostStats {
  days: number;
  totalSalesSum: number;
  totalCostSum: number;
  stats: { date: string; day: string; totalSales: number; totalCost: number }[];
}

export interface UserStats {
  totalUsers: number;
  percentChange: number;
  trend: "up" | "down" | "neutral";
  comparedTo: string;
}

export interface VendorsStats {
  totalVendors: number;
  comparedTo: string;
}

export interface ShopsStats {
  totalShops: number;
  comparedTo: string;
}

export interface OrderStatusStats {
  status: string;
  totalOrders: number;
  comparedTo: string;
}

export interface TotalOrdersStats {
  totalOrders: number;
  percentChange: number;
  comparedTo: string;
}

export interface ProfitStats {
  totalSales: number;
  percentChange: number | null;
  trend: "up" | "down" | "neutral";
  comparedTo: string;
}

export interface AdminStatsResponse {
  success: boolean;
  message: string;
  data: {
    SalesAndCostStats: SalesAndCostStats;
    UserStats: UserStats;
    TotalOrdersStats: TotalOrdersStats;
    ProfitStats: ProfitStats;
    TotalVendorsStats: VendorsStats;
    TotalShopsStats: ShopsStats;
    PendingOrder: OrderStatusStats;
    ProcessingOrder: OrderStatusStats;
    CompletedOrder: OrderStatusStats;
    CancelledOrder: OrderStatusStats;
    TopSellingProductsStats: TopSellingProduct[];
    TrendingProductsStats?: TrendingProductsStats;
    TodayOrdersStats: TodayOrdersStats;
    RecentOrders: RecentOrder[];
    MonthlySalesHistory: MonthlySalesHistory;
  };
}

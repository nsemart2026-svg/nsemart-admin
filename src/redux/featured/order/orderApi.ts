import { baseApi } from "@/redux/api/baseApi";
import { Order } from "@/types/Order";
// Type for the commission summary response
export interface CommissionSummary {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  totalCommission: number;
  averagePercentageRate: number;
  totalSaleAmount: number;
  totalQuantity:number;
}
const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<Order[], void>({
      query: () => ({ url: "/order", method: "GET" }),
      transformResponse: (response: { data: Order[] }) => response.data,
    }),
    getSingleOrder: builder.query<Order, string>({
      query: (id) => ({ url: `/order/${id}`, method: "GET" }),
      transformResponse: (response: { data: Order }) => response.data,
    }),
    getOrderSummary: builder.query<
      { success: boolean; message: string; data: any }, // response type
      void
    >({
      query: () => ({ url: "/order/summary", method: "GET" }),
      transformResponse: (response: { success: boolean; message: string; data: any }) => response.data,
    }),
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (newOrder) => ({
        url: "/order/create-order",
        method: "POST",
        body: newOrder,
      }),
      transformResponse: (response: { data: Order }) => response.data,
    }),
    updateOrder: builder.mutation<
      Order,
      { id: string; payload: Partial<Order> }
    >({
      query: ({ id, payload }) => ({
        url: `/order/${id}`, // matches findByIdAndUpdate
        method: "PATCH",
        body: payload,
      }),
      transformResponse: (response: { data: Order }) => response.data,
    }),
    updateOrderStatus: builder.mutation<Order, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/order/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      transformResponse: (response: { data: Order }) => response.data,
    }),

    getUserCommissionSummary: builder.query<CommissionSummary, string>({
      query: (userId) => ({
        url: `/order/commission/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: CommissionSummary;
      }) => response.data,
    }),

    // ✅ New endpoint for fetching orders of a specific user
    getMyOrders: builder.query<Order[], string>({
      query: (userId) => ({ url: `/order/my-order/${userId}`, method: "GET" }),
      transformResponse: (response: { data: Order[] }) => response.data,
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation, // ✅ added mutation
  useGetMyOrdersQuery, // ✅ added hook
  useGetUserCommissionSummaryQuery, // ✅ must be exported
  useGetOrderSummaryQuery,
} = orderApi;

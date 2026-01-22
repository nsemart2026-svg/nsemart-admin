import { baseApi } from "@/redux/api/baseApi";

// ==========================
// ✅ TYPE DECLARATIONS
// ==========================
export interface ICoupon {
  _id?: string;
  code: string;
  description: string;
  type: "percentage" | "fixed" | "free-shipping";
  discountAmount: number;
  minimumPurchaseAmount: number;
  isVerifiedCustomer: boolean;
  isApproved: boolean;
  expireDate: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ICouponResponse {
  success: boolean;
  message: string;
  data: ICoupon;
}

export interface ICouponsResponse {
  success: boolean;
  message: string;
  data: ICoupon[];
}

// ==========================
// ✅ COUPON API
// ==========================
export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -------- GET ALL COUPONS --------
    getCoupons: builder.query<ICoupon[], void>({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
      transformResponse: (response: ICouponsResponse) => response.data,
    }),

    // -------- GET SINGLE COUPON --------
    getCouponById: builder.query<ICoupon, string>({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ICouponResponse) => response.data,
    }),

    // -------- CREATE COUPON --------
    createCoupon: builder.mutation<ICouponResponse, Partial<ICoupon>>({
      query: (data) => ({
        url: "/coupon/create-coupon",
        method: "POST",
        body: data,
      }),
    }),
    // -------- UPDATE COUPON --------
    updateCoupon: builder.mutation<
      ICouponResponse,
      { id: string; data: Partial<ICoupon> }
    >({
      query: ({ id, data }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
 
    // -------- DELETE COUPON --------
    deleteCoupon: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// ==========================
// ✅ EXPORT HOOKS
// ==========================
export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;

import { baseApi } from "@/redux/api/baseApi";
import { IApiResponse, IWithdrawal } from "@/types/withdrawals";

export const withdrawalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🟢 Get all withdrawals
    getWithdrawals: builder.query<IApiResponse<IWithdrawal[]>, void>({
      query: () => "/withdrawals",
    }),

    // 🟢 Get single withdrawal by ID
    getWithdrawalById: builder.query<IApiResponse<IWithdrawal>, string>({
      query: (id) => `/withdrawals/${id}`,
    }),

    // 🟢 Create withdrawals
    createWithdrawals: builder.mutation<
      IApiResponse<IWithdrawal>,
      Partial<IWithdrawal>
    >({
      query: (data) => ({
        url: "/withdrawals",
        method: "POST",
        body: data,
      }),
    }),

    // 🟢 Update withdrawals
    updateWithdrawals: builder.mutation<
      IApiResponse<IWithdrawal>,
      { id: string; data: { status: string } } // Only allow status updates
    >({
      query: ({ id, data }) => ({
        url: `/withdrawals/${id}`,
        method: "PATCH",
        body: { status: data.status }, // Explicitly send only status
      }),
    }),
    // 🟢 Get withdrawals by specific user ID
    getMyWithdrawals: builder.query<IApiResponse<IWithdrawal[]>, string>({
      query: (userId) => `/withdrawals/my-withdrawals/${userId}`,
    }),
    // 🟢 Delete withdrawals
    deleteWithdrawals: builder.mutation<IApiResponse<null>, string>({
      query: (id) => ({
        url: `/withdrawals/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetWithdrawalsQuery,
  useGetWithdrawalByIdQuery,
  useCreateWithdrawalsMutation,
  useUpdateWithdrawalsMutation,
  useGetMyWithdrawalsQuery,
  useDeleteWithdrawalsMutation,
} = withdrawalApi;

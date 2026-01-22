import { baseApi } from "@/redux/api/baseApi";

// Review টাইপ
export interface IReview {
    _id: string;
    user: string;
    comment: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

// API slice
const reviewsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getAllReviews: builder.query<IReview[], void>({
            query: () => ({
                url: '/become-seller-reviews',
                method: 'GET',
            }),
            transformResponse: (response: { data: IReview[] }) => response.data,
        }),

        getSingleReview: builder.query<IReview, string>({
            query: id => ({
                url: `/become-seller-reviews/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: { data: IReview }) => response.data,
        }),

        createReview: builder.mutation<IReview, Partial<IReview>>({
            query: newReview => ({
                url: '/become-seller-reviews',
                method: 'POST',
                body: newReview,
            }),
            transformResponse: (response: { data: IReview }) => response.data,
        }),
    }),
});

export const {
    useGetAllReviewsQuery,
    useGetSingleReviewQuery,
    useCreateReviewMutation,
} = reviewsApi;

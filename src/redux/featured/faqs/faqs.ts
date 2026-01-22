import { baseApi } from "@/redux/api/baseApi";

export interface Faq {
    _id?: string;
    title: string;
    description: string;
    type: "global" | "shop"; // backend compatible
    issuedBy: string;
    status?: "published" | "draft";
}


const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all FAQs
        getAllFaqs: builder.query<Faq[], void>({
            query: () => ({
                url: "/faq",
                method: "GET",
            }),
            transformResponse: (response: { data: Faq[] }) => response.data,
        }),

        // Get single FAQ
        getSingleFaq: builder.query<Faq, string>({
            query: (id) => ({
                url: `/api/v1/faq/${id}`,
                method: "GET",
            }),
            transformResponse: (response: { data: Faq }) => response.data,
        }),

        // Create FAQ
        createFaq: builder.mutation<Faq, Partial<Faq>>({
            query: (newFaq) => ({
                url: "/faq/create-faq",
                method: "POST",
                body: newFaq,
            }),
            transformResponse: (response: { data: Faq }) => response.data,
        }),
    }),
});

export const {
    useGetAllFaqsQuery,
    useGetSingleFaqQuery,
    useCreateFaqMutation,
} = faqApi;

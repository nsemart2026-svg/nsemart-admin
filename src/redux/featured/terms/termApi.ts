import { baseApi } from "@/redux/api/baseApi";

export interface Term {
    name: string,
    description: string,
    type: "global" | "shop",
    issuedBy: 1001,
    isApproved: boolean
}


const termsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all terms
        getAllTerms: builder.query<Term[], void>({
            query: () => ({
                url: "/terms",
                method: "GET",
            }),
            transformResponse: (response: { data: Term[] }) => response.data,
        }),

        // Get single term
        getSingleTerm: builder.query<Term, string>({
            query: (id) => ({
                url: `/terms/${id}`,
                method: "GET",
            }),
            transformResponse: (response: { data: Term }) => response.data,
        }),

        // Create term
        createTerm: builder.mutation<Term, Partial<Term>>({
            query: (newTerm) => ({
                url: "/terms/create-terms",
                method: "POST",
                body: newTerm,
            }),
            transformResponse: (response: { data: Term }) => response.data,
        }),
    }),
});

export const {
    useGetAllTermsQuery,
    useGetSingleTermQuery,
    useCreateTermMutation,
} = termsApi;

import { baseApi } from "@/redux/api/baseApi";

export interface Vendor {
    _id: string;
    name: string;
    contactEmail: string;
    phone:string;
    status:string;
    createdAt:string;
    products:number;
    sales:string;
}

const vendorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllVendors: builder.query<Vendor[], void>({
      query: () => ({
        url: '/vendor',
        method: 'GET',
      }),
      transformResponse: (response: { data: Vendor[] }) => response.data,
    }),
  }),
});

export const { useGetAllVendorsQuery } = vendorApi;
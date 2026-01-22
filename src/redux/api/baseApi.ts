import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseURL = process.env.NEXT_PUBLIC_BASE_API;
// console.log(process.env.NEXT_PUBLIC_BASE_API);
// const baseURL = 'http://localhost:5000/api/v1';
// const baseURL = "https://dressen-backend-eta.vercel.app/api/v1";
const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [],
});

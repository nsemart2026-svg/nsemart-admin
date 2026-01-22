import { baseApi } from "@/redux/api/baseApi";

// ==========================
// ✅ TYPE DECLARATIONS
// ==========================
export interface IPrivacyPolicy {
  title: string;
  description: string;
}

export interface IReturnPolicy {
  title: string;
  description: string;
}

export interface IContactAndSocial {
  address: string;
  email: string;
  phone: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappLink?: string;
  youtubeUrl?: string;
}

export interface ISettings {
  _id?: string;
  logo?: string;
  popupImage?: string;
  enableHomepagePopup?: boolean;
  popupTitle?: string;
  popupDescription?: string;
  popupDelay?: number;
  privacyPolicy: IPrivacyPolicy;
  returnPolicy: IReturnPolicy;
  contactAndSocial: IContactAndSocial;
  sliderImages?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ISettingsResponse {
  success: boolean;
  message: string;
  data: ISettings;
}

// ==========================
// ✅ SETTINGS API
// ==========================
export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -------- GET SETTINGS --------
    getSettings: builder.query<ISettings, void>({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      transformResponse: (response: ISettingsResponse) => response.data,

    }),

    // -------- CREATE SETTINGS --------
    createSettings: builder.mutation<ISettingsResponse, FormData>({
      query: (formData) => ({
        url: "/settings",
        method: "POST",
        body: formData,
      }),

    }),

    // -------- UPDATE SETTINGS --------
    updateSettings: builder.mutation<ISettingsResponse, FormData>({
      query: (formData) => ({
        url: "/settings",
        method: "PATCH",
        body: formData,
      }),

    }),
  }),
});

export const {
  useGetSettingsQuery,
  useCreateSettingsMutation,
  useUpdateSettingsMutation,
} = settingsApi;

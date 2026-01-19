import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URLS, API_ENDPOINTS } from "./BaseUrl";
import type { RegisterRequest, RegisterResponse } from "./types";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URLS.MOCK_API,
  }),
  tagTypes: ["Users"],

  endpoints: (builder) => ({

    registerUser: builder.mutation<RegisterResponse,RegisterRequest>({
      query: (data) => ({
        url: API_ENDPOINTS.USER_REGISTER,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    loginUser: builder.query<RegisterResponse,RegisterRequest>({
      query: ({ email, password }) =>
        API_ENDPOINTS.USER_LOGIN(email, password),
      providesTags: ["Users"],
    }),
  }),
})

  export const {
  useRegisterUserMutation,
  useLoginUserQuery,
  }=authApi;
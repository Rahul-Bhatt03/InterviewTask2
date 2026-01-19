import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URLS, API_ENDPOINTS } from "./BaseUrl";
import type { BlogsResponse, CreateBlog } from "./types";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URLS.MOCK_API,
  }),
  tagTypes: ["Blogs"],

  endpoints: (builder) => ({

    getBlogs: builder.query<BlogsResponse[], { page: number; limit: number }>({
      query: ({ page, limit }) => `${API_ENDPOINTS.BLOGS}?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map((item) => ({ type: "Blogs" as const, id: item.id })),
            { type: "Blogs" as const, id: "LIST" },
          ]
          : [{ type: "Blogs" as const, id: "LIST" }],
    }),


    getBlogById: builder.query<BlogsResponse, number>({
      query: (id) => API_ENDPOINTS.BLOG_BY_ID(id),
      providesTags: (_, __, id) => [{ type: "Blogs", id }],
    }),

    createBlog: builder.mutation<BlogsResponse, CreateBlog>({
      query: (data) => ({
        url: API_ENDPOINTS.BLOGS,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Blogs", id: "LIST" }],
    }),

    updateBlog: builder.mutation<BlogsResponse, { id: number, data: CreateBlog }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.BLOG_BY_ID(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Blogs", id }],
    }),

    deleteBlog: builder.mutation<BlogsResponse, number>({
      query: (id) => ({
        url: API_ENDPOINTS.BLOG_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  })
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;

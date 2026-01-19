export const API_BASE_URLS = {
    MOCK_API: 'https://696cf0ebf4a79b3151802753.mockapi.io/api',
} as const;

export const API_ENDPOINTS = {
    BLOGS: '/Blogs',
    BLOG_BY_ID: (id: string | number) => `/Blogs/${id}`,


    USERS: '/User',
    USER_BY_ID: (id: string | number) => `/User/${id}`,


    USER_LOGIN: (email: string, password: string) =>
        `/User?email=${email}&password=${password}`,

    USER_REGISTER: '/User',
} as const;

export const CACHE_TIME = {
    SHORT: 60,
    MEDIUM: 300,
    LONG: 900,
} as const;

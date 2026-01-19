export interface BlogsResponse {
  createdAt: string;
  title: string;
  content: string;
  author: string;
  id: string;
}

export interface CreateBlog {
  title: string;
  content: string;
  author: string;
}

export interface RegisterResponse {
  name: string;
  email: string;
  password: string;
  id: string;
}

export interface RegisterRequest {
  name?: string;
  email: string;
  password: string;
}
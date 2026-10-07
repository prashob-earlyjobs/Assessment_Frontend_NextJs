import { toast } from "sonner";

const BACKEND_URL_2_0 = process.env.NEXT_PUBLIC_BACKEND_URL_2_0 || 'http://localhost:5001/api';

// Types
export type BlogStatus = 'draft' | 'published' | 'archived';

export interface BlogAuthor {
  _id: string;
  username: string;
  email: string;
  profilePhotoUrl?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author: BlogAuthor | string;
  status: BlogStatus;
  tags: string[];
  views: number;
  likes: number;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status?: BlogStatus;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface UpdateBlogRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  status?: BlogStatus;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface BlogListResponse {
  success: boolean;
  data: {
    blogs: Blog[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
      totalResults: number;
    };
  };
}

export interface BlogStatsResponse {
  success: boolean;
  data: {
    total: number;
    published: number;
    draft: number;
    archived: number;
    totalViews: number;
    totalLikes: number;
    byStatus: Array<{
      _id: BlogStatus;
      count: number;
      totalViews: number;
      totalLikes: number;
    }>;
  };
}

// API Service Functions
export const blogService = {

  // Get All Blogs
  getBlogs: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    authorId?: string;
    tag?: string;
    search?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
          }
        });
      }
      const url = `${BACKEND_URL_2_0}/blogs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url, {
        method: 'GET',
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch blogs');
      }
      return result as BlogListResponse;
    } catch (error: any) {
      const message = error?.message || 'Failed to fetch blogs';
      // Don't show toast for public blog list page errors
      if (error?.response?.status !== 401) {
        toast.error(message);
      }
      throw error;
    }
  },

  // Get Blog by ID
  getBlogById: async (id: string) => {
    try {
      const response = await fetch(`${BACKEND_URL_2_0}/blogs/${id}`, {
        method: 'GET',
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch blog');
      }
      return result;
    } catch (error: any) {
      const message = error?.message || 'Failed to fetch blog';
      toast.error(message);
      throw error;
    }
  },

  // Get Blog by Slug
  getBlogBySlug: async (slug: string) => {
    try {
      const response = await fetch(`${BACKEND_URL_2_0}/blogs/slug/${slug}`, {
        method: 'GET',
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch blog');
      }
      return result;
    } catch (error: any) {
      const message = error?.message || 'Failed to fetch blog';
      // Don't show toast for public blog detail page errors
      toast.error(message);
      throw error;
    }
  },


  // Like Blog
  likeBlog: async (id: string) => {
    try {
      const response = await fetch(`${BACKEND_URL_2_0}/blogs/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to like blog');
      }
      return result;
    } catch (error: any) {
      const message = error?.message || 'Failed to like blog';
      toast.error(message);
      throw error;
    }
  },

};

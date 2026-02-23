"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { blogService, Blog } from "../../components/services/blogsapi";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import {
  Calendar,
  Eye,
  Heart,
  Share2,
  ArrowLeft,
  Loader2,
  User,
  Tag,
} from "lucide-react";
import Navbar from "../../components/pages/navbar";
import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import Image from "next/image";
import { toast } from "sonner";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogService.getBlogBySlug(slug);
      
      if (response.success && response.data?.blog) {
        const blogData = response.data.blog;
        setBlog(blogData);
        
        // Fetch related blogs (same tags)
        if (blogData.tags && blogData.tags.length > 0) {
          fetchRelatedBlogs(blogData.tags[0], blogData._id);
        }
      } else {
        setError("Blog not found");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load blog");
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (tag: string, excludeId: string) => {
    try {
      const response = await blogService.getBlogs({
        tag,
        limit: 3,
        status: "published",
      });
      
      if (response.success && response.data) {
        const filtered = response.data.blogs.filter(
          (b) => b._id !== excludeId
        );
        setRelatedBlogs(filtered.slice(0, 3));
      }
    } catch (err) {
      console.error("Error fetching related blogs:", err);
    }
  };

  const handleLike = async () => {
    if (!blog) return;
    
    try {
      setLiking(true);
      const response = await blogService.likeBlog(blog._id);
      if (response.success) {
        setBlog({ ...blog, likes: response.data.likes });
        toast.success("Blog liked!");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to like blog");
    } finally {
      setLiking(false);
    }
  };

  const handleShare = async () => {
    if (!blog) return;
    
    const url = window.location.href;
    const title = blog.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: blog.excerpt || "",
          url,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAuthorName = (author: Blog["author"]) => {
    if (typeof author === "string") return "Unknown Author";
    return author.username || author.email || "Unknown Author";
  };

  const getAuthorPhoto = (author: Blog["author"]) => {
    if (typeof author === "string") return null;
    return author.profilePhotoUrl || null;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The blog you're looking for doesn't exist."}</p>
          <Button onClick={() => router.push("/blogs")} className="bg-orange-500 hover:bg-orange-600">
            Back to Blogs
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push("/blogs")}
            className="mb-6 text-gray-600 hover:text-orange-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Button>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Blog Header */}
          <div className="mb-8">
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{getAuthorName(blog.author)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>{blog.views || 0} views</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleLike}
                disabled={liking}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Heart className={`h-5 w-5 ${liking ? "animate-pulse" : ""}`} />
                {blog.likes || 0}
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>
          </div>

          {/* Blog Content */}
          <Card className="mb-12 border-0 shadow-lg">
            <CardContent className="p-8">
              {/* Excerpt */}
              {blog.excerpt && (
                <div className="text-xl text-gray-700 font-medium mb-8 pb-8 border-b border-gray-200">
                  {blog.excerpt}
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </CardContent>
          </Card>

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Card
                    key={relatedBlog._id}
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-orange-200"
                    onClick={() => router.push(`/blogs/${relatedBlog.slug}`)}
                  >
                    {relatedBlog.featuredImage && (
                      <div className="relative w-full h-32 overflow-hidden bg-gray-200">
                        <Image
                          src={relatedBlog.featuredImage}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-orange-600 transition-colors">
                        {relatedBlog.title}
                      </h3>
                      {relatedBlog.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

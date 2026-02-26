"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { blogService, Blog } from "../components/services/blogsapi";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Search, Calendar, Eye, Heart, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Navbar from "../components/pages/navbar";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import Image from "next/image";

function BlogsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const itemsPerPage = 12;

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const tag = searchParams.get("tag") || "";
    const search = searchParams.get("search") || "";
    
    setCurrentPage(page);
    setSelectedTag(tag);
    setSearchTerm(search);
  }, [searchParams]);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, selectedTag, searchTerm]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params: any = {
        page: currentPage,
        limit: itemsPerPage,
        status: "published", // Only show published blogs
      };

      if (selectedTag) {
        params.tag = selectedTag;
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await blogService.getBlogs(params);
      
      if (response.success && response.data) {
        setBlogs(response.data.blogs);
        setTotalPages(response.data.pagination.totalPages);
        setTotalResults(response.data.pagination.totalResults);
        
        // Extract unique tags from all blogs
        const tags = new Set<string>();
        response.data.blogs.forEach((blog) => {
          blog.tags?.forEach((tag) => tags.add(tag));
        });
        setAllTags(Array.from(tags));
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load blogs");
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedTag) params.set("tag", selectedTag);
    params.set("page", "1");
    router.push(`/blogs?${params.toString()}`);
  };

  const handleTagFilter = (tag: string) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    params.set("tag", tag);
    params.set("page", "1");
    router.push(`/blogs?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedTag) params.set("tag", selectedTag);
    params.set("page", page.toString());
    router.push(`/blogs?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <>
      <Navbar />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-500">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tips, insights, and success stories to help you navigate your career journey
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-orange-500"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold"
              >
                Search
              </Button>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTagFilter("")}
                  className={selectedTag === "" ? "bg-orange-500 text-white" : ""}
                >
                  All
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTagFilter(tag)}
                    className={selectedTag === tag ? "bg-orange-500 text-white" : ""}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="mb-6 text-gray-600">
              Showing {blogs.length} of {totalResults} blogs
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <Button onClick={fetchBlogs} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {/* Blog Grid */}
          {!loading && !error && (
            <>
              {blogs.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg mb-4">No blogs found</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedTag("");
                      router.push("/blogs");
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                  {blogs.map((blog) => (
                    <Card
                      key={blog._id}
                      className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-orange-200"
                      onClick={() => router.push(`/blogs/${blog.slug}`)}
                    >
                      {/* Featured Image */}
                      {blog.featuredImage && (
                        <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <CardContent className="p-6">
                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs bg-orange-100 text-orange-700 hover:bg-orange-200"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {blog.title}
                        </h2>

                        {/* Excerpt */}
                        {blog.excerpt && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {blog.excerpt}
                          </p>
                        )}

                        {/* Meta Information */}
                        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{blog.views || 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              <span>{blog.likes || 0}</span>
                            </div>
                          </div>
                        </div>

                        {/* Author */}
                        <div className="mt-3 text-sm text-gray-600">
                          By {getAuthorName(blog.author)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-xl"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className={
                          currentPage === pageNum
                            ? "bg-orange-500 text-white rounded-xl"
                            : "rounded-xl"
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-xl"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function BlogsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    }>
      <BlogsContent />
    </Suspense>
  );
}

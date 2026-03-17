"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { blogService, type Blog } from "../../services/blogsapi";

const NewsBlogV2 = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchLatestBlogs = async () => {
      try {
        const response = await blogService.getBlogs({
          page: 1,
          limit: 2,
          status: "published",
        });

        if (!isMounted) return;
        setPosts(response.data.blogs || []);
      } catch {
        if (!isMounted) return;
        setPosts([]);
      }
    };

    fetchLatestBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return "";
    try {
      return new Date(isoDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  if (!posts.length) {
    return null;
  }

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              News and Blog
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl">
              Practical advice, industry insights, and structured hiring knowledge — built for job seekers, recruiters, and employers.
            </p>
          </div>
          <button
            onClick={() => router.push("/blogs")}
            className="mt-3 text-[#ea6a4e] hover:text-[#c95a42] font-medium underline underline-offset-4"
          >
            View all
          </button>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post._id} className="group">
              <div className="relative w-full rounded-2xl overflow-hidden">
                <img
                  src={post.featuredImage || "/v2/images/hero-bg.png"}
                  alt={post.title}
                  className="w-full h-auto block object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 w-full bg-black/20 pointer-events-none" />
                <span className="absolute top-6 left-6 inline-flex items-center rounded-full bg-[#F08504] px-5 py-2 text-sm font-semibold text-white shadow-sm">
                  Blog
                </span>
              </div>

              <p className="mt-5 text-gray-500 font-medium">
                {formatDate(post.publishedAt || post.createdAt)}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-black leading-snug">
                {post.title}
              </h3>

              <button
                onClick={() => router.push(`/blogs/${post.slug}`)}
                className="mt-4 inline-flex items-center gap-2 text-[#ea6a4e] hover:text-[#c95a42] font-semibold"
              >
                Read more <ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsBlogV2;


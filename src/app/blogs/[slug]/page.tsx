"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import Header from '../../components/pages/header';
import Footer from '@/app/components/pages/footer';


// Define TypeScript interfaces for blog data
interface Blog {
  id?: string;
  title: string;
  image: string;
  content: string;
  publishedDate: string;
  readtime: string;
  keywords?: string[];
}

const BlogDetails: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [isLoadingRelatedBlogs, setIsLoadingRelatedBlogs] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const renderLoader = () => (
    <div data-testid="loader" className="flex justify-center items-center">
      <ThreeCircles color="#EB6A4D" height={50} width={50} />
    </div>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog Page | EarlyJobs';

    const fetchBlog = async () => {
      try {
        console.log("Fetching blog with slug: ", slug);
        const backendURL=process.env.NEXT_PUBLIC_BACKEND_URL_IN_1
        const response = await axios.get(`${backendURL}/blogs/${slug}`);
        setBlog(response.data);
      } catch (err) {
        setError('Failed to fetch blog details');
        console.error('Error fetching blog:', err);
      }
    };

    const fetchRelatedBlogs = async () => {
      try {
        const  backendURL=process.env.NEXT_PUBLIC_BACKEND_URL_IN_1
        const response = await axios.get(`${backendURL}/get-blogs`);
        console.log("Fetched related blogs:", response.data);
        const allBlogs: Blog[] = response.data.blogs;
        setRelatedBlogs(allBlogs.filter(relatedBlog => relatedBlog.title.toLowerCase() !== slug?.toLowerCase()));
      } catch (err) {
        console.error('Error fetching related blogs:', err);
      } finally {
        setIsLoadingRelatedBlogs(false);
      }
    };

    if (slug) {
      fetchBlog();
    }

    fetchRelatedBlogs();
  }, [slug]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!blog) {
    return renderLoader();
  }

  return (
    <>
    <Header/>
    <div className="flex justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 min-h-[87vh]  gap-8 flex-col lg:flex-row">
      <div className="w-full lg:w-3/4 bg-white rounded-lg p-4">
        <div className="flex items-center mb-4 text-sm text-gray-500">
          <img src="/images/logo.png" alt="website logo" className="w-12 h-12" />
          <div className="ml-2">
            <p className="font-semibold">Admin</p>
            <p>
              {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
              }).replace(',', '-')} • {blog.readtime} Read
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg shadow-md mb-5" />
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />

        {blog.keywords && blog.keywords.length > 0 && (
          <div className="mt-5">
            <h3 className="text-lg font-semibold">Keywords:</h3>
            <div className="flex flex-wrap">
              {blog.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-[#EB6A4D] text-white px-3 py-1 m-1 rounded-md font-bold text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/3 rounded-lg pt-4">
        <h3 className="text-lg font-semibold mb-5">Related Blogs</h3>
        {isLoadingRelatedBlogs ? (
          renderLoader()
        ) : relatedBlogs.length > 0 ? (
          <div className="space-y-5">
            {relatedBlogs.map((relatedBlog) => (
              <Link
                href={`/blogs/${relatedBlog.title}`}
                key={relatedBlog.id}
                className="block bg-white rounded-lg shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <div className="p-4">
                  <h4 className="text-base font-light">{relatedBlog.title}</h4>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <img src="/images/logo.png" alt="website logo" className="w-12 h-12" />
                    <div className="ml-2">
                      <p className="font-semibold">Admin</p>
                      <p>
                        {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit'
                        }).replace(',', '-')} • {blog.readtime} Read
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No related blogs available</p>
        )}
      </div>
    </div>
    <Footer />

    </>
  );
};

export default BlogDetails;
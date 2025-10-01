"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Oval } from 'react-loader-spinner';
import  Header  from '../components/pages/header';
import Footer from '../components/pages/footer';
import Navbar from '../components/pages/navbar';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 20;

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Blog Page | EarlyJobs';

        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const backendURL=process.env.NEXT_PUBLIC_BACKEND_URL_OLD_PORTAL;
                const response = await fetch(`${backendURL}/get-blogs`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();
                setBlogs(data.blogs);
            } catch (err) {
                setError('Failed to fetch blogs');
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    // Calculate pagination details
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    return (
        <>
        <Navbar/>
        <Header />
        <div className="max-w-7xl mx-auto min-h-[87vh]  px-8 py-8">
            <div className="text-left mb-10 pb-5">
                <h1 className="text-3xl md:text-4xl text-orange-500 font-bold mb-2">Unlocking Career Opportunities: Insights from EarlyJobs</h1>
                <p className="text-lg text-gray-600">Expert Tips and Success Stories to Help You Navigate the Job Market.</p>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {loading ? (
                <div className="flex justify-center items-center">
                    <Oval
                        visible={true}
                        height="20"
                        width="20"
                        color="#ffffff"
                        strokeWidth="4"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        secondaryColor="#ffffff"
                        wrapperClass=""
                    />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {currentBlogs.map((blog) => (
                            <div
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                                key={blog.id || blog._id}
                            >
                                <a href={`/blogs/${encodeURIComponent(blog.title)}`} className="block text-inherit no-underline h-full">
                                    <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                                    <div className="p-5">
                                        <h2 className="text-xl text-gray-600 mb-2">{blog.title}</h2>
                                        <p className="text-base text-gray-500">
                                            {formatDate(blog.publishedDate)} | {blog.readtime}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-8 space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'
                                }`}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-md ${
                                        currentPage === index + 1
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
        <Footer/>
        </>
    );
};

export default BlogPage;
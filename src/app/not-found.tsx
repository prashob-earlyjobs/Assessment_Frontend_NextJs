import Link from 'next/link';
import React from 'react';
import Navbar from './components/pages/navbar';
import Footer from './components/pages/footer';

const NotFoundPage: React.FC = () => {
    return (
        <>
            <Navbar />
       
        <div className="flex flex-col justify-center items-center  w-full mt-[13vh] md:mt-[10vh] ">
            <img src="/images/page-not-found.avif" alt="not-found" className="w-full max-w-[400px] mb-5" />
            <h1 className="text-3xl md:text-2xl mb-2.5 text-[#EB6A4D]">Page Not Found</h1>
            <p className="text-base md:text-xs text-center text-[#abaaaa] mb-3">
                we’re sorry, the page you requested could not be found
            </p>
            <Link
                href="/"
                className="px-5 py-2.5 md:px-3.75 md:py-2 md:text-xs no-underline rounded-md bg-[#EB6A4D] hover:bg-[#ff7e63] text-white cursor-pointer outline-none mb-[30px] inline-block"
            >
                Go to Home
            </Link>
        </div>
        <Footer />
         </>
    );
};

export default NotFoundPage;
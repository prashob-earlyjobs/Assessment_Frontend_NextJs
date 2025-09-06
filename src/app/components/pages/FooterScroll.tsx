
import React from 'react';

function FooterScroll() {
  return (
    <>
      <style>
        {`
          @keyframes text-scroll {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-100%, 0, 0);
            }
          }
        `}
      </style>
      <div className="bg-[#1c1c1c] w-full px-4 overflow-hidden">
        <p className="text-white text-center text-3xl sm:text-5xl font-semibold leading-10 sm:leading-[60px] animate-[text-scroll_14s_linear_infinite] whitespace-nowrap py-6 sm:py-10 tracking-[3px]">
          Hire your ideal team.{' '}
          <span className="bg-gradient-to-r from-[#fc2e04] to-[#EE4C8E] bg-clip-text text-transparent text-3xl sm:text-5xl font-semibold leading-10 sm:leading-[60px] pl-5">
            10X Quicker.
          </span>{' '}
          <span className="px-13 text-white"> | </span>
          Hire your ideal team.{' '}
          <span className="bg-gradient-to-r from-[#fc2e04] to-[#EE4C8E] bg-clip-text text-transparent text-3xl sm:text-5xl font-semibold leading-10 sm:leading-[60px] pl-5">
            10X Quicker.
          </span>{' '}
          <span className="px-13 text-white"> | </span>
          Hire your ideal team.{' '}
          <span className="bg-gradient-to-r from-[#fc2e04] to-[#EE4C8E] bg-clip-text text-transparent text-3xl sm:text-5xl font-semibold leading-10 sm:leading-[60px] pl-5">
            10X Quicker.
          </span>{' '}
          <span className="px-13 text-white"> | </span>
        </p>
      </div>
    </>
  );
}

export default FooterScroll;

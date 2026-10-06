export function FooterScroll() {
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
      <div className="w-full overflow-hidden bg-[#1c1c1c] px-4">
        <p className="animate-[text-scroll_14s_linear_infinite] whitespace-nowrap py-6 text-center text-3xl font-semibold leading-10 tracking-[3px] text-white sm:py-10 sm:text-5xl sm:leading-[60px]">
          Hire your ideal team.{" "}
          <span className="bg-gradient-to-r from-[#fc2e04] to-[#EE4C8E] bg-clip-text pl-5 text-3xl font-semibold leading-10 text-transparent sm:text-5xl sm:leading-[60px]">
            10X Quicker.
          </span>{" "}
          <span className="px-13 text-white"> | </span>
          Hire your ideal team.{" "}
          <span className="bg-gradient-to-r from-[#fc2e04] to-[#EE4C8E] bg-clip-text pl-5 text-3xl font-semibold leading-10 text-transparent sm:text-5xl sm:leading-[60px]">
            10X Quicker.
          </span>{" "}
          <span className="px-13 text-white"> | </span>
          Hire your ideal team.{" "}
          <span className="bg-gradient-to-r from-[#fc2e04] to-[#EE4C8E] bg-clip-text pl-5 text-3xl font-semibold leading-10 text-transparent sm:text-5xl sm:leading-[60px]">
            10X Quicker.
          </span>{" "}
          <span className="px-13 text-white"> | </span>
        </p>
      </div>
    </>
  );
}

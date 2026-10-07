import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

function Faqs({ servicePageAccordianData }: { servicePageAccordianData: { label: string; content: string }[] }) {
  const [activeAccordion, setActiveAccordion] = React.useState<number | null>(null);

  return (
    <section className="w-[80%] mx-auto flex flex-col justify-center items-start py-10 bg-white mt-0 md:w-[92%] ">
      <h1 className="text-[#EB6A4D] text-[30px] font-semibold text-center w-full mb-5 py-[10px] leading-tight md:text-[26px]">
        Frequently Asked Questions
      </h1>
      {servicePageAccordianData.map((accordion, index) => (
        <div className="w-full mb-4" key={index}>
          <div
            className="flex justify-between items-center cursor-pointer py-4 px-6 bg-[#EB6A4D] hover:bg-[#d65e44] text-white transition-all duration-300"
            onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
          >
            <h3 className="text-xl font-semibold text-white m-0 md:text-lg">
              {accordion.label}
            </h3>
            <IoIosArrowDown
              className={`text-white text-2xl transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}
            />
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-96' : 'max-h-0'}`}
          >
            <p className="text-base text-[#EB6A4D] leading-7 py-4 px-6 m-0 bg-white md:text-[15px]">
              {accordion.content}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Faqs;
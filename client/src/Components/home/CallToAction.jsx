// import React from 'react';

// const CallToAction = () => {
//   return (
//     <div id='cta' className='mt-28 border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16'>
//       <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full">
        
//         <p className="text-xl font-medium max-w-md text-[#0F172A]">
//           Build a Professional Resume That Helps You Stand Out and Get Hired.
//         </p>

//         <a
//           href="/"
//           className="flex items-center gap-2 rounded py-3 px-8 bg-[#2563EB] hover:bg-[#1D4ED8] transition text-white"
//         >
//           <span>Get Started</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="size-4.5"
//           >
//             <path d="M5 12h14"/>
//             <path d="m12 5 7 7-7 7"/>
//           </svg>
//         </a>

//       </div>
//     </div>
//   );
// }

// export default CallToAction;


import React from 'react';

const CallToAction = () => {
  return (
    <div id='cta' className='mt-28 w-full max-w-5xl mx-auto px-4 sm:px-10'>
      <div className="relative overflow-hidden flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-[#F8FAFC] to-[#EFF6FF] px-8 sm:px-14 py-14 sm:py-16 w-full shadow-sm">

        {/* decorative glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#DBEAFE] blur-3xl opacity-60" />

        <div className="relative flex flex-col items-center md:items-start gap-3 max-w-md">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#2563EB] bg-[#DBEAFE] border border-[#93C5FD] px-3 py-1 rounded-full">
            Free to start
          </span>
          <p className="text-2xl sm:text-3xl font-semibold text-[#0F172A] leading-snug">
            Build a Professional Resume That Helps You Stand Out and Get Hired.
          </p>
        </div>

        
          <a href="/"
          className="relative group flex items-center gap-2 rounded-full py-3.5 px-9 bg-[#2563EB] hover:bg-[#1D4ED8] transition-all text-white font-medium shadow-md hover:shadow-lg active:scale-95 shrink-0"
        >
          <span>Get Started</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5 transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </a>

      </div>
    </div>
  );
}

export default CallToAction;
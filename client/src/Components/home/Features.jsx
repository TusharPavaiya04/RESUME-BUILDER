// // import React from 'react';
// // import { Zap } from 'lucide-react';
// // import Title from './Title';

// // const Features = () => {
// //   const [isHover, setIsHover] = React.useState(false);

// //   return (
// //     <div id='features' className='flex flex-col items-center my-10 scroll-mt-12'>

// //       {/* Badge */}
// //       <div className="flex items-center gap-2 text-sm text-[#1D4ED8] bg-[#DBEAFE] rounded-full px-4 py-1">
// //         <Zap className="size-4" style={{ stroke: '#2563EB' }} />
// //         <span>Simple Process</span>
// //       </div>

// //       {/* Section Title */}
// //       <Title
// //         title={'Build Your Resume Effortlessly'}
// //         description={'Create a professional, AI-optimized resume in minutes. Our intelligent tools guide you step by step, ensuring your skills and achievements shine.'}
// //       />

// //       {/* Feature List with Image */}
// //       <div className="flex flex-col md:flex-row items-center justify-center mt-6">
// //         <img
// //           className="max-w-2xl w-full xl:-ml-32"
// //           src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
// //           alt="AI Resume Builder"
// //         />

// //         <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

// //           {/* Feature 1 */}
// //           <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
// //             <div className={`p-6 group-hover:bg-[#DBEAFE] border border-transparent group-hover:border-[#93C5FD] flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-[#93C5FD] bg-[#DBEAFE]' : ''}`}>
// //               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" style={{ stroke: '#2563EB' }}>
// //                 <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
// //                 <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
// //               </svg>
// //               <div className="space-y-2">
// //                 <h3 className="text-base font-semibold text-[#0F172A]">AI-Powered Suggestions</h3>
// //                 <p className="text-sm text-[#0F172A]/70 max-w-xs">Get intelligent recommendations for phrasing, skills, and achievements to make your resume stand out.</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Feature 2 */}
// //           <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-4">
// //             <div className="p-6 group-hover:bg-[#DBEAFE] border border-transparent group-hover:border-[#93C5FD] flex gap-4 rounded-xl transition-colors">
// //               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" style={{ stroke: '#2563EB' }}>
// //                 <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
// //                 <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
// //               </svg>
// //               <div className="space-y-2">
// //                 <h3 className="text-base font-semibold text-[#0F172A]">Custom Templates</h3>
// //                 <p className="text-sm text-[#0F172A]/70 max-w-xs">Choose from modern, recruiter-approved resume templates to match your industry and style.</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Feature 3 */}
// //           <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-4">
// //             <div className="p-6 group-hover:bg-[#DBEAFE] border border-transparent group-hover:border-[#93C5FD] flex gap-4 rounded-xl transition-colors">
// //               <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: '#2563EB' }}>
// //                 <path d="M12 15V3" />
// //                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// //                 <path d="m7 10 5 5 5-5" />
// //               </svg>
// //               <div className="space-y-2">
// //                 <h3 className="text-base font-semibold text-[#0F172A]">Export & Share</h3>
// //                 <p className="text-sm text-[#0F172A]/70 max-w-xs">Download your resume in PDF or share it online with a professional link for recruiters.</p>
// //               </div>
// //             </div>
// //           </div>

// //         </div>
// //       </div>

// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
// //         * { font-family: 'Poppins', sans-serif; }
// //       `}</style>
// //     </div>
// //   );
// // }

// // export default Features;


// import React from 'react';
// import { Zap, Sparkles, LayoutTemplate, Download } from 'lucide-react';
// import Title from './Title';

// const features = [
//   {
//     icon: Sparkles,
//     title: 'AI-Powered Suggestions',
//     description: 'Get intelligent recommendations for phrasing, skills, and achievements to make your resume stand out.',
//   },
//   {
//     icon: LayoutTemplate,
//     title: 'Custom Templates',
//     description: 'Choose from modern, recruiter-approved resume templates to match your industry and style.',
//   },
//   {
//     icon: Download,
//     title: 'Export & Share',
//     description: 'Download your resume in PDF or share it online with a professional link for recruiters.',
//   },
// ];

// const Features = () => {
//   return (
//     <div id='features' className='flex flex-col items-center my-10 scroll-mt-12 px-4'>

//       {/* Badge */}
//       <div className="flex items-center gap-2 text-sm text-[#1D4ED8] bg-[#DBEAFE] rounded-full px-4 py-1">
//         <Zap className="size-4" style={{ stroke: '#2563EB' }} />
//         <span>Simple Process</span>
//       </div>

//       {/* Section Title */}
//       <Title
//         title={'Build Your Resume Effortlessly'}
//         description={'Create a professional, AI-optimized resume in minutes. Our intelligent tools guide you step by step, ensuring your skills and achievements shine.'}
//       />

//       {/* Feature Card Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-12">
//         {features.map(({ icon: Icon, title, description }, i) => (
//           <div
//             key={title}
//             className="group relative flex flex-col gap-4 p-7 rounded-2xl border border-slate-200 bg-white hover:border-[#93C5FD] hover:-translate-y-1 hover:shadow-lg shadow-sm transition-all duration-300"
//           >
//             {/* Step number */}
//             <span className="absolute top-5 right-6 text-xs font-semibold text-[#0F172A]/20 group-hover:text-[#93C5FD] transition-colors">
//               0{i + 1}
//             </span>

//             {/* Icon tile */}
//             <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#DBEAFE] border border-[#93C5FD] group-hover:bg-[#2563EB] transition-colors">
//               <Icon className="size-5.5 text-[#2563EB] group-hover:text-white transition-colors" strokeWidth={2} />
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-base font-semibold text-[#0F172A]">{title}</h3>
//               <p className="text-sm text-[#0F172A]/70 leading-relaxed">{description}</p>
//             </div>

//             {/* Bottom accent line */}
//             <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-[#93C5FD]/0 group-hover:via-[#93C5FD] to-transparent transition-all duration-300" />
//           </div>
//         ))}
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
//         * { font-family: 'Poppins', sans-serif; }
//       `}</style>
//     </div>
//   );
// }

// export default Features;



import React from 'react';
import { Zap, Sparkles, LayoutTemplate, Download } from 'lucide-react';
import Title from './Title';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Suggestions',
    description: 'Get intelligent recommendations for phrasing, skills, and achievements to make your resume stand out.',
  },
  {
    icon: LayoutTemplate,
    title: 'Custom Templates',
    description: 'Choose from modern, recruiter-approved resume templates to match your industry and style.',
  },
  {
    icon: Download,
    title: 'Export & Share',
    description: 'Download your resume in PDF or share it online with a professional link for recruiters.',
  },
];

const Features = () => {
  return (
    <div id='features' className='flex flex-col items-center my-10 scroll-mt-12 px-4'>

      {/* Badge */}
      <div className="flex items-center gap-2 text-sm text-[#1D4ED8] bg-[#DBEAFE] rounded-full px-4 py-1">
        <Zap className="size-4" style={{ stroke: '#2563EB' }} />
        <span>Simple Process</span>
      </div>

      {/* Section Title */}
      <Title
        title={'Build Your Resume Effortlessly'}
        description={'Create a professional, AI-optimized resume in minutes. Our intelligent tools guide you step by step, ensuring your skills and achievements shine.'}
      />

      {/* Step Timeline */}
      <div className="relative max-w-3xl w-full mt-16">

        {/* Connecting line */}
        <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-px bg-slate-200 md:-translate-x-1/2" />

        <div className="flex flex-col gap-10">
          {features.map(({ icon: Icon, title, description }, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={title}
                className={`relative flex items-start gap-6 md:gap-10 ${
                  isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Number node */}
                <div className="relative z-10 shrink-0 h-12 w-12 rounded-full bg-white border-2 border-[#2563EB] flex items-center justify-center font-semibold text-[#2563EB] shadow-sm">
                  {i + 1}
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 flex items-start gap-4 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 md:max-w-sm ${
                    isEven ? 'md:text-right md:flex-row-reverse' : 'md:text-left'
                  }`}
                >
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-[#DBEAFE] border border-[#93C5FD] flex items-center justify-center">
                    <Icon className="size-5 text-[#2563EB]" strokeWidth={2} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold text-[#0F172A]">{title}</h3>
                    <p className="text-sm text-[#0F172A]/70 leading-relaxed">{description}</p>
                  </div>
                </div>

                {/* spacer to balance the other side on desktop */}
                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
}

export default Features;
import React from 'react';
import { Zap } from 'lucide-react';
import Title from './Title';

const Features = () => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div id='features' className='flex flex-col items-center my-10 scroll-mt-12'>

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

      {/* Feature List with Image */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-6">
        <img
          className="max-w-2xl w-full xl:-ml-32"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="AI Resume Builder"
        />

        <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

          {/* Feature 1 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className={`p-6 group-hover:bg-[#DBEAFE] border border-transparent group-hover:border-[#93C5FD] flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-[#93C5FD] bg-[#DBEAFE]' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" style={{ stroke: '#2563EB' }}>
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-[#0F172A]">AI-Powered Suggestions</h3>
                <p className="text-sm text-[#0F172A]/70 max-w-xs">Get intelligent recommendations for phrasing, skills, and achievements to make your resume stand out.</p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-4">
            <div className="p-6 group-hover:bg-[#DBEAFE] border border-transparent group-hover:border-[#93C5FD] flex gap-4 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" style={{ stroke: '#2563EB' }}>
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-[#0F172A]">Custom Templates</h3>
                <p className="text-sm text-[#0F172A]/70 max-w-xs">Choose from modern, recruiter-approved resume templates to match your industry and style.</p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-4">
            <div className="p-6 group-hover:bg-[#DBEAFE] border border-transparent group-hover:border-[#93C5FD] flex gap-4 rounded-xl transition-colors">
              <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: '#2563EB' }}>
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
              </svg>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-[#0F172A]">Export & Share</h3>
                <p className="text-sm text-[#0F172A]/70 max-w-xs">Download your resume in PDF or share it online with a professional link for recruiters.</p>
              </div>
            </div>
          </div>

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
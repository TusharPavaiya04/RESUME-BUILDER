import React from 'react';
import Title from './Title';
import { BookUserIcon } from 'lucide-react';

const Testimonial = () => {
  const cardsData = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'Samantha Blake',
      handle: '@samanthablake',
      text: 'This AI resume builder saved me hours! The suggestions were spot-on, and I landed interviews faster than ever.',
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Ethan Moore',
      handle: '@ethanmoore',
      text: 'Custom templates and AI recommendations made my resume look professional and recruiter-ready. Highly recommend!',
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
      name: 'Olivia Chen',
      handle: '@oliviawrites',
      text: 'The AI suggestions helped me highlight my achievements perfectly. I got interview calls within a week!',
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
      name: 'Liam Johnson',
      handle: '@liamcareer',
      text: 'I loved how easy it was to customize my resume and share it online. AI insights really made a difference.',
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="bg-[#F8FAFC] p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
      <div className="flex gap-2">
        <img className="size-11 rounded-full" src={card.image} alt={`${card.name} image`} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-[#0F172A]">{card.name}</p>
            <svg
              className="mt-0.5 text-[#2563EB]"
              width="16"
              height="16"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
            </svg>
          </div>
          <span className="text-xs text-slate-400">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-[#0F172A]">{card.text}</p>
    </div>
  );

  return (
    <>
      <div id='testimonials' className='flex flex-col items-center my-10 scroll-mt-12'>
        <div className="flex items-center gap-2 text-sm text-[#1D4ED8] bg-[#DBEAFE] rounded-full px-4 py-1">
          <BookUserIcon className='size-4.5' width={14} style={{ stroke: '#2563EB' }} />
          <span>Testimonials</span>
        </div>
        <Title
          title={"What Our Users Are Saying"}
          description={"Real feedback from professionals who used our AI resume builder to land interviews and get noticed."}
        />
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 25s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#F8FAFC] to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#F8FAFC] to-transparent"></div>
      </div>

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative mt-4">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#F8FAFC] to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#F8FAFC] to-transparent"></div>
      </div>
    </>
  );
}

export default Testimonial;
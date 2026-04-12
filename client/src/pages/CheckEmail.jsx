import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';

const CheckEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#F8FAFC]'>
      <div className='bg-white p-10 rounded-2xl shadow-md text-center max-w-sm w-full border border-[#E2E8F0]'>
        
        <div className='flex justify-center mb-4'>
          <div className='bg-blue-50 p-4 rounded-full'>
            <Mail size={32} color='#2563EB' />
          </div>
        </div>

        <h2 className='text-2xl font-semibold text-[#0F172A]'>Check your email</h2>
        
        <p className='text-[#64748B] text-sm mt-3'>
          We sent a verification link to
        </p>
        <p className='text-[#0F172A] font-medium text-sm mt-1'>{email}</p>

        <p className='text-[#94A3B8] text-xs mt-4'>
          Click the link in the email to verify your account. The link expires in 24 hours.
        </p>

        <hr className='border-[#E2E8F0] my-6' />

        <p className='text-[#94A3B8] text-xs'>
          Already verified?{" "}
          <span
            onClick={() => navigate('/app')}
            className='text-[#2563EB] cursor-pointer hover:underline'
          >
            Login here
          </span>
        </p>

      </div>
    </div>
  );
};

export default CheckEmail;
import React from 'react';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../configs/api';
import { useNavigate, useParams, Link } from 'react-router-dom';

const VerifyOTP = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/users/verify-otp', { email, otp });
      toast.success(data.message);
      navigate(`/reset-password/${email}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#F8FAFC]'>

      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-[#E2E8F0] rounded-2xl px-8 bg-white"
      >

        {/* Heading */}
        <h1 className="text-[#0F172A] text-3xl mt-10 font-medium">
          Verify OTP
        </h1>

        <p className="text-[#0F172A]/50 text-sm mt-2">
          OTP sent to <span className="font-medium text-[#0F172A]">{email}</span>
        </p>

        {/* OTP Input */}
        <div className="flex items-center w-full mt-6 bg-[#F8FAFC] border border-[#E2E8F0] h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all">
          <Lock size={14} color='#2563EB' />
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            className="border-none outline-none ring-0 w-full text-center bg-transparent text-sm text-[#0F172A] placeholder:text-[#0F172A]/30"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors duration-200"
        >
          Verify OTP
        </button>

        {/* Back */}
        <p className="text-[#0F172A]/50 text-sm mt-2 mb-10">
          <Link to="/app" className="text-[#2563EB] hover:underline">
            Back to Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default VerifyOTP;
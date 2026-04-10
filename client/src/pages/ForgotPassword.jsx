import React from 'react';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../configs/api';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/users/forgot-password', { email });
      toast.success(data.message);
      navigate(`/verify-otp/${email}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
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
          Forgot Password
        </h1>

        <p className="text-[#0F172A]/50 text-sm mt-2">
          Enter your email to receive OTP
        </p>

        {/* Email Input */}
        <div className="flex items-center w-full mt-6 bg-[#F8FAFC] border border-[#E2E8F0] h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all">
          <Mail size={14} color='#2563EB' />
          <input
            type="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 w-full bg-transparent text-[#0F172A] placeholder:text-[#0F172A]/30 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors"
        >
          Send OTP
        </button>

        {/* Back to login */}
        <p className="text-[#0F172A]/50 text-sm mt-4 mb-10">
          Remember your password?{" "}
          <Link to="/app" className="text-[#2563EB] hover:underline">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default ForgotPassword;
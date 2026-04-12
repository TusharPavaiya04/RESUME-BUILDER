import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../configs/api';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) { setStatus("invalid"); return; }

    const verify = async () => {
      try {
        const { data } = await api.get(`/api/users/verify-email?token=${token}`);
        if (data.success) {
          setStatus("success");
          setTimeout(() => navigate('/app'), 3000);
        }
      } catch (err) {
        const msg = err?.response?.data?.message || "";
        setStatus(msg === "Verification link expired" ? "expired" : "failed");
      }
    };

    verify();
  }, []);

  const states = {
    verifying: { icon: "⏳", title: "Verifying your email..." },
    success:   { icon: "✅", title: "Email Verified!", sub: "Redirecting to login..." },
    expired:   { icon: "⏰", title: "Link Expired",   sub: "Your link has expired." },
    failed:    { icon: "❌", title: "Verification Failed", sub: "Invalid or used link." },
    invalid:   { icon: "⚠️", title: "Invalid Link",   sub: "Missing token." },
  };

  const current = states[status];

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#F8FAFC]'>
      <div className='bg-white p-10 rounded-2xl shadow-md text-center max-w-sm w-full border border-[#E2E8F0]'>
        <div className='text-4xl mb-4'>{current.icon}</div>
        <h2 className='text-xl font-semibold text-[#0F172A]'>{current.title}</h2>
        {current.sub && <p className='text-[#64748B] text-sm mt-2'>{current.sub}</p>}
        {(status === "expired" || status === "failed") && (
          <button
            onClick={() => navigate('/app?state=register')}
            className='mt-4 px-6 py-2 bg-[#2563EB] text-white rounded-full text-sm hover:bg-[#1D4ED8]'
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
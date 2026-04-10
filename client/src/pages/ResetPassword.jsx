import React from 'react';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../configs/api';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ResetPassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      const { data } = await api.post('/api/users/reset-password', {
        email,
        password
      });

      toast.success(data.message);

      // redirect to login
      navigate('/app');

    } catch (err) {
      toast.error(err?.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>

      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >

        {/* Heading */}
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          Reset Password
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Create a new password for your account
        </p>

        {/* Password */}
        <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={14} color='#6B7280' />
          <input
            type="password"
            placeholder="New Password"
            className="border-none outline-none ring-0 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={14} color='#6B7280' />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border-none outline-none ring-0 w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-all duration-200"
        >
          Reset Password
        </button>

        {/* Back */}
        <p className="text-gray-500 text-sm mt-4 mb-10">
          Back to{" "}
          <Link to="/app" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default ResetPassword;
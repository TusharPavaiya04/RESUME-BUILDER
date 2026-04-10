import React from 'react';
import { User2Icon, Mail, Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';
import api from '../configs/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const urlStates = query.get('state');
  const [state, setState] = React.useState(urlStates || "login");
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login({ token: data.token, user: data.user || null }));
      localStorage.setItem('token', data.token);
      toast.success(data.message);
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputWrapperClass = "flex items-center w-full bg-[#F8FAFC] border border-[#E2E8F0] h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all";
  const inputClass = "border-none outline-none ring-0 bg-transparent w-full text-sm text-[#0F172A] placeholder:text-[#0F172A]/30";

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#F8FAFC]'>
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-[#E2E8F0] rounded-2xl px-8 bg-white"
      >
        <h1 className="text-[#0F172A] text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-[#0F172A]/50 text-sm mt-2">
          Please {state} in to continue
        </p>

        {/* Name — register only */}
        {state !== "login" && (
          <div className={`mt-6 ${inputWrapperClass}`}>
            <User2Icon size={16} color='#2563EB' />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={inputClass}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className={`mt-4 ${inputWrapperClass}`}>
          <Mail size={13} color='#2563EB' />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className={inputClass}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className={`mt-4 ${inputWrapperClass}`}>
          <Lock size={13} color='#2563EB' />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={inputClass}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot password */}
        <div className="mt-4 text-left">
          <Link to='/forgot-password'>
            <button className="text-sm text-[#2563EB] hover:underline" type="reset">
              Forget password?
            </button>
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        {/* Toggle login/register */}
        <p
          onClick={() => setState(prev => prev === "login" ? "register" : "login")}
          className="text-[#0F172A]/50 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <a href="#" className="text-[#2563EB] hover:underline">click here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
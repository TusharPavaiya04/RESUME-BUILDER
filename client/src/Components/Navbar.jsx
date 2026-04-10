import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className="shadow-sm bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <nav className="flex items-center justify-between max-w-6xl mx-auto px-4 py-3.5 text-[#0F172A]">

        {/* Logo */}
        <Link to="/app" className="flex items-center">
          <img src="/resume.png" alt="logo" className="h-12 w-auto" />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden text-[#0F172A]/70">
             <span className="font-medium text-[#0F172A]"> Hi, {user?.name}</span>
          </p>

          <button
            onClick={logoutUser}
            className="bg-[#DBEAFE] text-[#2563EB] border border-[#93C5FD] px-5 py-1.5 rounded-full hover:bg-[#BFDBFE] active:scale-95 transition-all text-sm"
          >
            Logout
          </button>
        </div>

      </nav>
    </div>
  );
};

export default Navbar;
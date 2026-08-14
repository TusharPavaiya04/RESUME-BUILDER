// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { logout } from "../app/features/authSlice";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector(state => state.auth);
//   const dispatch = useDispatch();

//   const logoutUser = () => {
//     navigate("/");
//     dispatch(logout());
//   };

//   return (
//     <div className="shadow-sm bg-[#F8FAFC] border-b border-[#E2E8F0]">
//       <nav className="flex items-center justify-between max-w-6xl mx-auto px-4 py-3.5 text-[#0F172A]">

//         {/* Logo */}
//         <Link to="/app" className="flex items-center">
//           <img src="/resume.png" alt="logo" className="h-12 w-auto" />
//         </Link>

//         {/* Right Section */}
//         <div className="flex items-center gap-4 text-sm">
//           <p className="max-sm:hidden text-[#0F172A]/70">
//              <span className="font-medium text-[#0F172A]">  Welcome back!</span>
//           </p>

//           <button
//             onClick={logoutUser}
//             className="bg-[#DBEAFE] text-[#2563EB] border border-[#93C5FD] px-5 py-1.5 rounded-full hover:bg-[#BFDBFE] active:scale-95 transition-all text-sm"
//           >
//             Logout
//           </button>
//         </div>

//       </nav>
//     </div>
//   );
// };

// export default Navbar;


import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-[#F8FAFC]/90 border-b border-[#E2E8F0]">
      <nav className="flex items-center justify-between max-w-6xl mx-auto px-4 py-3 text-[#0F172A]">

        {/* Logo */}
        <Link to="/app" className="flex items-center transition-transform hover:scale-[1.02]">
          <img src="/resume.png" alt="logo" className="h-11 w-auto" />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* User chip */}
          <div className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full border border-[#E2E8F0] bg-white/60 max-sm:hidden">
            <div className="h-7 w-7 rounded-full bg-[#DBEAFE] border border-[#93C5FD] text-[#2563EB] flex items-center justify-center text-xs font-semibold">
              {initial}
            </div>
            <p className="text-sm text-[#0F172A]/70">
              Welcome back<span className="font-medium text-[#0F172A]">{user?.name ? `, ${user.name}` : "!"}</span>
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={logoutUser}
            className="group flex items-center gap-1.5 bg-[#DBEAFE] text-[#2563EB] border border-[#93C5FD] pl-3.5 pr-4 py-1.5 rounded-full hover:bg-[#BFDBFE] active:scale-95 transition-all text-sm font-medium shadow-sm hover:shadow"
          >
            <LogOut className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Logout
          </button>
        </div>

      </nav>
    </div>
  );
};

export default Navbar;
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout, role } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0A1A2F] via-[#0F2742] to-[#0A1A2F] bg-opacity-95 backdrop-blur-md shadow-md border-b border-yellow-200/20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left - Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="text-[#FFD84D] font-heading font-extrabold text-xl sm:text-2xl tracking-tight hover:text-yellow-300 transition-colors after:block after:h-1 after:w-8 after:bg-[#FFD84D] after:rounded-full after:mt-1">
              CraveCraft
            </Link>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {role === 'admin' && (
              <>
                <Link
                  to="/admin"
                  className="bg-[#FFD84D] text-[#0A1A2F] rounded-full px-3 sm:px-5 py-2 text-sm sm:text-base font-semibold hover:bg-yellow-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
                >
                  Admin Panel
                </Link>
                <span className="bg-[#6EDCCF] text-[#0A1A2F] text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">
                  Admin
                </span>
              </>
            )}
            <button
              onClick={handleLogout}
              className="bg-transparent text-white border border-white/40 rounded-full px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold hover:bg-white/10 hover:border-white/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


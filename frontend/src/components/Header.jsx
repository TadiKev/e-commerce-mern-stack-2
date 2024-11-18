import { Link, NavLink, useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.svg";
import logout from "../assets/logout.svg";
import user from "../assets/user.svg";
import Navbar from "./Navbar";
import { useContext, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login"); 
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logo}
                alt="Company Logo"
                className="h-8 w-auto sm:h-10"
              />
            </Link>
          </div>

          {/* Navbar for desktop */}
          <nav className="hidden md:flex space-x-8">
            <Navbar containerStyles="flex space-x-5 xl:space-x-10" />
          </nav>

          {/* Cart, Logout, and Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <NavLink to="/cart-page" className="relative flex items-center">
              <FaOpencart className="p-1 h-8 w-8 ring-slate-900/40 ring-1 rounded-full" />
              <span className="absolute -top-2 right-0 w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-sm">
                {getTotalCartItems()}
              </span>
            </NavLink>

            {/* Logout Button */}
            {localStorage.getItem("auth-token") ? (
              <button
                onClick={handleLogout} // Use handleLogout function here
                className="btn_secondary_rounded flex items-center gap-x-1 text-sm"
              >
                <img src={logout} alt="Logout Icon" height={16} width={16} />
                <span>Logout</span>
              </button>
            ) : (
              <NavLink
                to="/login"
                className="btn_secondary_rounded flex items-center gap-x-1 text-sm"
              >
                <img src={user} alt="User Icon" height={16} width={16} />
                <span>Login</span>
              </NavLink>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="text-gray-900 focus:outline-none md:hidden"
            >
              {menuOpen ? (
                <MdClose className="h-8 w-8" />
              ) : (
                <MdMenu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <Navbar containerStyles="flex flex-col space-y-4 px-4 py-6" />
        </div>
      )}
    </header>
  );
};

export default Header;

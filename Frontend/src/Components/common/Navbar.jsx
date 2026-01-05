

import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import MainLogo from "../../assets/MainLogo.png";
import ProfileDropdown from "../Core/Auth/ProfileDropdown";
import { NavbarLinks } from "../../Data/Navbar-link";
import { apiConnector } from "../../Services/apiConnector";
import { categories } from "../../Services/api";
import { setToken } from "../../Slices/authSlice";
import { setUser } from "../../Slices/profileSlice";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setMobileMenu(false);
    setMobileCatalogOpen(false);
  };

  useEffect(() => {
    const fetchSublinks = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(result?.data?.data || []);
      } catch (err) {
        console.log("Category error", err);
      }
    };

    fetchSublinks();
    
    
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && !token) {
      dispatch(setToken(JSON.parse(savedToken)));
    }
    if (savedUser && !user) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch, token, user]);

  return (
    <header className="sticky top-0 z-100 bg-slate-900 border-b border-slate-800">
      <div className="w-11/12 max-w-7xl mx-auto flex h-16 items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" onClick={closeDrawer} className="flex items-center gap-2">
          <img src={MainLogo} alt="logo" className="h-10 w-10 rounded-full" />
          <span className="hidden sm:block text-white font-semibold">
            Coding Skills
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {NavbarLinks.map((link, i) => (
              <li key={i}>
                {link.title === "Catalog" ? (
                  <div className="relative group flex items-center gap-1 cursor-pointer text-slate-400 hover:text-white py-4">
                    <span className="cursor-pointer">Courses</span>
                    <IoIosArrowDown />
                    {/* Desktop Dropdown */}
                    <div className="invisible absolute left-1/2 top-full mt-2 w-52 -translate-x-1/2 rounded-lg bg-white text-slate-800 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100 z-110">
                      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white"></div>
                      <div className="relative z-10 bg-white rounded-lg overflow-hidden">
                        {subLinks.length > 0 ? (
                          subLinks.map((item, idx) => (
                            <Link
                              key={idx}
                              to={`/catalog/${item.name.split(" ").join("-").toLowerCase()}`}
                              className="block px-4 py-3 hover:bg-slate-100 transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))
                        ) : (
                          <p className="p-4 text-center text-slate-500">No Categories Found</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 transition-all duration-200"
                        : "text-slate-400 hover:text-white transition-all duration-200"
                    }
                  >
                    {link.title}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-5">
          {/* CART */}
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative text-slate-300 hover:text-white transition-colors">
              <FaShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-yellow-400 rounded-full text-[10px] font-bold text-black flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* AUTH BUTTONS */}
          {!token ? (
            <div className="hidden sm:flex gap-3">
              <Link to="/login">
                <button className="border border-slate-700 px-4 py-1.5 text-slate-300 rounded-md hover:bg-slate-800 transition-all cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-yellow-400 px-4 py-1.5 rounded-md font-semibold text-slate-900 hover:bg-yellow-300 transition-all cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => setDrawerOpen(!drawerOpen)} className="relative">
                <img
                  src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}`}
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover border border-slate-700 cursor-pointer"
                />
              </button>
              <ProfileDropdown isOpen={drawerOpen} setIsOpen={setDrawerOpen} />
            </div>
          )}

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="lg:hidden text-2xl text-slate-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU  */}
      {mobileMenu && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-slate-900 border-b border-slate-800 shadow-2xl z-100 max-h-[calc(100vh-64px)] overflow-y-auto">
          <ul className="flex flex-col p-6 gap-6">
            {NavbarLinks.map((link, i) => (
              <li key={i} className="border-b border-slate-800 pb-4 last:border-0 last:pb-0 cursor-pointer">
                {link.title === "Catalog" ? (
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
                      className="flex items-center justify-between w-full text-slate-300 text-lg font-medium cursor-pointer"
                    >
                      <span className="cursor-pointer">Courses</span>
                      <IoIosArrowForward className={`transition-transform duration-200 ${mobileCatalogOpen ? "rotate-90" : ""}`} />
                    </button>
                    
                    {/* Mobile Catalog Sublinks */}
                    {mobileCatalogOpen && (
                      <div className="flex flex-col gap-4 pl-4 mt-2 border-l border-slate-700 cursor-pointer">
                        {subLinks.length > 0 ? (
                          subLinks.map((item, idx) => (
                            <Link
                              key={idx}
                              to={`/catalog/${item.name.split(" ").join("-").toLowerCase()}`}
                              onClick={closeDrawer}
                              className="text-slate-400 hover:text-yellow-300 text-md cursor-pointer"
                            >
                              {item.name}
                            </Link>
                          ))
                        ) : (
                          <p className="text-slate-600 italic">No Categories Found</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={closeDrawer}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-300 text-lg font-medium" : "text-slate-300 text-lg"
                    }
                  >
                    {link.title}
                  </NavLink>
                )}
              </li>
            ))}

            {/* Mobile Auth Buttons */}
            {!token && (
              <div className="flex flex-col gap-3 pt-2">
                <Link to="/login" onClick={closeDrawer} className="text-center py-3 text-slate-300 border border-slate-700 rounded-md">
                  Login
                </Link>
                <Link to="/signup" onClick={closeDrawer} className="text-center py-3 bg-yellow-400 text-slate-900 rounded-md font-bold">
                  Sign Up
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;













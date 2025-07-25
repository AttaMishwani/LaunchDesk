import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TbMenuDeep } from "react-icons/tb";
import { logout, authStateListener } from "../firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, toggleMenu } from "../redux/menuSlice";
import { FaBookmark } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { setSavedJobs } from "../redux/bookMarkedJobsSlice";

const Navbar = () => {
  const { showMenu } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ Hook to navigate

  useEffect(() => {
    const unsubscribe = authStateListener((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const togglemenu = () => {
    dispatch(toggleMenu());
  };

  const handleCloseMenu = () => {
    dispatch(closeMenu());
  };

  const handleLogOut = async () => {
    await logout();
    dispatch(setSavedJobs([]));
    persistor.purge();
    navigate("/login");
  };

  return (
    <header className="w-full py-4 bg-bgc text-white px-6 border-b-2 border-b-gray-700 shadow-md">
      <nav className="max-w-[1300px] mx-auto flex items-center justify-between">
        <div className="logo">
          <NavLink to="/">
            <h1 className="text-2xl font-bold text-[#F8FAFC]">
              Launch<span className="text-primary">Desk</span>
            </h1>
          </NavLink>
        </div>

        <div className="md:hidden cursor-pointer">
          <TbMenuDeep onClick={togglemenu} size={28} />
        </div>

        <ul
          className={`absolute md:static top-full left-0 w-full md:w-auto bg-[#4F46E5] md:bg-transparent px-6 py-4 md:p-0 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 transition-all duration-300 ${
            showMenu ? "mobileMenu" : "webMenu"
          }`}
        >
          {user ? (
            <>
              <li>
                <NavLink to="/" className="hover:text-primary">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-primary">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <FaUserAlt />
                </NavLink>
              </li>
              <li>
                <NavLink to="/savedjobs">
                  <FaBookmark />
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogOut}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  onClick={handleCloseMenu}
                  to="/signup"
                  className="block w-full text-center py-3 rounded-md text-white hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handleCloseMenu}
                  to="/login"
                  className="block w-full text-center py-3 rounded-md text-white hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

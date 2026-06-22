import React, {
  useEffect,
  useState,
} from "react";

import {
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import {
  getUserInfo,
} from "../api/api";

const Navbar = () => {
  const navigate =
    useNavigate();

  const [user, setUser] =
    useState(null);

  const fetchUser =
    async () => {
      try {
        const data =
          await getUserInfo();

        setUser(
          data.loggedUser
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      navigate("/");
    };

 return (
  <nav className="custom-navbar">

    <div className="navbar-logo">
      Task Management System
    </div>

    <div className="navbar-user">

      <FaUserCircle size={24} />

      <span>
        {user?.name}
      </span>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>

  </nav>
);
};

export default Navbar;
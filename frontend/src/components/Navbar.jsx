import React from "react";
import Logo from "../assets/Logo.png";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <a href="/">
          <img src={Logo} alt="Article Logo" className="h-20 w-20 " />
        </a>
      </div>

      <div className="navbar-center">
        <a href="/post" className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Create new Post
        </a>
      </div>

      <div className="navbar-end space-x-2">
        <a
          href="/login"
          className="btn bg-blue-500 hover:bg-blue-700 text-white"
        >
          Login
        </a>
        <a
          href="/register"
          className="btn bg-green-500 hover:bg-green-700 text-white"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default Navbar;

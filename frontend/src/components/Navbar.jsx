import React from "react";
import { useAuthContext } from "../context/AuthContext";
import Logo from "../assets/Logo.png";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Logout",
          text: "Logout successfully.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <a href="/">
          <img src={Logo} alt="Article Logo" className="h-20 w-20" />
        </a>
      </div>

      {/* <div className="navbar-center">
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
      </div> */}

      <div className="navbar-end space-x-2">
        {user ? (
          <div>
            <a
              href="/create"
              className="btn bg-gray-500 hover:bg-gray-700 text-white"
            >
              Create Post
            </a>
            <button
              className="btn bg-red-500 hover:bg-red-700 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
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
        )}
      </div>
    </div>
  );
};

export default Navbar;

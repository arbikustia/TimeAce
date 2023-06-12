import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  function goToPage(page: string): void {
    navigate(`${page}`);
  }
  return (
    <div className="navbar bg-base-100 shadow-md text-white fixed z-50 ">
      <div className="navbar-start z-40">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 backdrop-blur-xl bg-white/30"
          >
            <li>
              <a onClick={() => goToPage("/")}>My activity</a>
            </li>
            <li>
              <a onClick={() => goToPage("/pomodoro")}>Pomodoro</a>
            </li>
            <li>
              <a onClick={() => goToPage("/todolist")}>Todo List</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">TimeAce</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={() => goToPage("/")}>My activity</a>
          </li>
          <li>
            <a onClick={() => goToPage("/pomodoro")}>Pomodoro</a>
          </li>
          <li>
            <a onClick={() => goToPage("/todolist")}>Todo List</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn backdrop-blur-xl bg-white/30 border-none ">Login</a>
      </div>
      
    </div>
  );
};

export default Navbar;

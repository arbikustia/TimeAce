
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["user"]);

  async function goToPage(page: string): Promise<void> {
    const pathname = window.location.pathname;
    if (pathname === "/pomodoro" && page !== "/pomodoro") {
      await Swal.fire({
        title: "If you exit this page, all your progress will be lost.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate(page);
        } else {
          navigate("/pomodoro");
        }
      });
    } else {
      navigate(page);
    }
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeCookie("user");
        navigate("/");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        await Toast.fire({
          icon: "success",
          title: "Logout successful",
        });
      }
    });
  };

  return (
    <div className="navbar bg-blue-500 shadow-md text-white fixed z-50">
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
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 text-black"
          >
            <li>
              <a onClick={() => goToPage("/activity")}>Eisenhower</a>
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
            <a onClick={() => goToPage("/activity")}>Eisenhower</a>
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
        <div className="dropdown dropdown-end flex">
          <label tabIndex={0} className="text-2xl cursor-pointer mr-5">
            <FaUser />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-32 flex gap-2"
          >
            <li className="bg-blue-500 rounded-lg">
              <a onClick={handleLogout}>Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

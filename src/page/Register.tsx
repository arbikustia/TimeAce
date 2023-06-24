import { SyntheticEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { BiLockOpenAlt, BiUser } from "react-icons/bi";
import google from "../assets/google.png";
import axios from "axios";
import logo from "../assets/logo.png";
import shape1 from "../assets/shape1.png";
import shape2 from "../assets/shape2.png";
import { useCookies } from "react-cookie";
import Loading from "../components/Loading";
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [device, setDevice] = useState<boolean>();
  const [cookies, setCookie] = useCookies();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const addAccount = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (
      confirmPassword === password &&
      password === confirmPassword &&
      password !== ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    if (isValid) {
      console.log(true);
    } else {
      console.log(false);
    }
  }, [confirmPassword, isValid, password]);

  useEffect(() => {
    if (cookies.user) {
      navigate("/activity");
    }
  }, []);

  const register = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isValid) {
        const res = await axios.post("https://timeace.fly.dev/users/register", {
          fullname: fullName,
          email: email,
          password: password,
        });

        navigate("/login");
        setIsLoading(false);
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
          title: "Success",
        });
      } else {
        setIsLoading(false);
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
          icon: "error",
          title: "Please Check Your Password Again",
        });
      }
    } catch (err) {
      alert("register failed");
      setIsLoading(false);
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
        icon: "error",
        title: "Invalid Register",
      });
    }
  };

  return (
    <div className="lg:bg-white bg-blue-500 flex justify-center items-center h-screen">
      {isLoading ? <Loading /> : ""}

      <div
        className="flex items-center gap-2 absolute top-3 left-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="" className="w-5" />
        <h1 className={`text-white lg:text-blue-500 font-extrabold `}>
          TimeAce
        </h1>
      </div>
      <img src={shape1} className="absolute left-0 top-16 w-1/4" alt="" />
      <img src={shape2} className="absolute right-0 top-10 w-1/5" alt="" />

      <div className="flex lg:w-fit lg:h-fit bg-blue-500 px-5 max-h-screen  flex-col items-center rounded-lg sm:justify-center sm:pt-0  ">
        <div>
          <a href="/ ">
            <h3 className="text-4xl font-bold text-white z-10 ">Register</h3>
          </a>
        </div>
        <p className="text-center mt-3 lg:w-72 text-white z-10">
          To keep conected with us please login with your personal information
          by email adress and password
        </p>
        <div className="w-full px-6  overflow-hidden sm:max-w-lg sm:rounded-lg">
          <form>
            <div className="mt-4 flex flex-row px-2 items-center bg-white rounded-lg">
              <label
                htmlFor="username"
                className="block text-2xl font-medium text-black undefined"
              >
                <BiUser />
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className=" w-full bg-white text-black px-5 py-2 outline-none "
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mt-4 flex flex-row px-2 items-center bg-white rounded-lg">
              <label
                htmlFor="email"
                className="block text-2xl font-medium text-black undefined"
              >
                <AiOutlineMail />
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Adress"
                className=" w-full bg-white text-black px-5 py-2 outline-none "
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 flex flex-row px-2 items-center bg-white rounded-lg">
              <label
                htmlFor="password"
                className={`${
                  isValid ? "text-green-500" : "text-black"
                } block text-2xl font-medium undefined`}
              >
                <BiLockOpenAlt />
              </label>

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-white text-black px-5 py-2 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4 flex flex-row px-2 items-center bg-white rounded-lg">
              <label
                htmlFor="password"
                className={`${
                  isValid ? "text-green-500" : "text-black"
                } block text-2xl font-medium undefined`}
              >
                <BiLockOpenAlt />
              </label>

              <input
                type="password"
                name="password"
                placeholder="Confirm Password"
                className="w-full bg-white text-black px-5 py-2 outline-none"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center mt-4">
              <button
                onClick={(e) => register(e)}
                className="w-full px-4 py-2 tracking-wide text-white font-bold transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-600"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-white">
            Already have an account{" "}
            <span>
              <a
                className="text-yellow-300 hover:underline"
                onClick={addAccount}
                href="#"
              >
                Login
              </a>
            </span>
          </div>
          <div className="flex items-center w-full my-2">
            <hr className="w-full" />
            <p className="px-3 text-white ">OR</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md bg-white focus:ring-2 dark:border-gray-400 "
            >
              <img
                src={google}
                alt=""
                className="w-5 h-5 fill-current text-white"
              />
              <p className="text-black">Login with Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

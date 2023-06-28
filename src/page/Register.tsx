import { SyntheticEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { BiLockOpenAlt, BiUser } from "react-icons/bi";
import axios from "axios";
import logo from "../assets/logo2.png";
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
  const [cookies, setCookie] = useCookies();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const addAccount = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (confirmPassword === password && password !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [confirmPassword, password]);

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
        const res = await axios.post("http://localhost:3000/users/register", {
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
    <div className="bg-blue-500 flex justify-center items-center h-screen">
      {isLoading && <Loading />}

      <div
        className="flex items-center gap-2 absolute top-3 left-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="" className="w-5" />
        <h1 className="text-white font-extrabold">TimeAce</h1>
      </div>
      <img src={shape1} className="absolute left-0 top-16 w-1/4" alt="" />
      <img src={shape2} className="absolute right-0 top-10 w-1/5" alt="" />

      <div className="flex lg:w-fit mt-20 lg:mt-0 lg:h-fit bg-blue-500 px-5 max-h-screen  flex-col items-center rounded-lg sm:justify-center sm:pt-0">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-white z-10">Sign up</h3>
          </a>
        </div>
        <p className="text-center mt-3 lg:w-72 text-white z-10">
          To keep connected with us, please sign up with your personal information
          using your email address and password.
        </p>
        <div className="w-full px-6 overflow-hidden sm:max-w-lg sm:rounded-lg flex flex-col lg:flex-row justify-center items-center lg:gap-10">
          <form className="w-full z-10">
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
                className="w-full bg-white text-black px-5 py-2 outline-none"
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
                placeholder="Email Address"
                className="w-full bg-white text-black px-5 py-2 outline-none"
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
                onClick={register}
                className="w-full px-4 py-2 tracking-wide text-white font-bold transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-600"
              >
                Sign up
              </button>
            </div>
            <div className="mt-4 text-sm text-white flex justify-center gap-2">
              Already have an account?{" "}
              <span>
                <a
                  className="text-yellow-300 hover:underline"
                  onClick={addAccount}
                  href="#"
                >
                  Sign in
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

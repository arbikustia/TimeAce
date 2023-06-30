/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { BiLockOpenAlt } from "react-icons/bi";
import google from "../assets/google.png";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import logo from "../assets/logo2.png";
import shape1 from "../assets/shape1.png";
import shape2 from "../assets/shape2.png";
import Loading from "../components/Loading";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [cookies, setCookie] = useCookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const baseUrl = "https://timeace.fly.dev";

  const navigate = useNavigate();

  const createAccount = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (cookies.user) {
      navigate("/activity");
    }
  }, []);

  // OAuth
  const loginOauth = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setToken(tokenResponse.access_token);
    },
  });

  let oauthEmail = "";
  let oauthFullname = "";

  // Login with OAuth
  const oauth = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/users/oauth`, {
        fullname: oauthFullname,
        email: oauthEmail,
      });
      setCookie("user", JSON.stringify(response.data), { path: "/" });
      navigate("/activity");
      oauthEmail = "";
      oauthFullname = "";
    } catch (error) {
      console.log(error);
    }
  };

  // Extract token from Google
  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
        )
        .then((res) => {
          oauthEmail = res.data.email;
          oauthFullname = res.data.name;
          oauth();
        });
    }
  }, [token]);

  // Login
  const login = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${baseUrl}/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsLoading(false);
        setCookie("user", JSON.stringify(res.data), { path: "/" });
        setEmail("");
        setPassword("");
        navigate("/activity");
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-blue-500 flex justify-center items-center h-screen">
      {isLoading ? <Loading /> : null}

      <div
        className="flex items-center gap-2 absolute top-3 left-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="" className="w-5" />
        <h1 className="text-white font-extrabold">TimeAce</h1>
      </div>
      <img src={shape1} className="absolute left-0 top-16 w-1/4" alt="" />
      <img src={shape2} className="absolute right-0 top-10 w-1/5" alt="" />

      <div className="flex lg:w-fit lg:h-fit bg-blue-500 px-5 py-5 flex-col items-center rounded-lg pt-6 sm:justify-center sm:pt-0">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-white lg:mt-5 z-10">
              Sign in
            </h3>
          </a>
        </div>
        <p className="text-center lg:w-72 mt-5 text-white z-10">
          To keep connected with us, please sign in with your personal
          information by email address and password.
        </p>
        <div className="w-full px-6 py-4 overflow-hidden sm:max-w-lg sm:rounded-lg">
          <form>
            <div className="flex flex-row px-2 items-center bg-white rounded-lg">
              <label
                htmlFor="email"
                className="block text-2xl font-medium text-black"
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
                className="block text-2xl font-medium text-black"
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
            <div className="flex items-center mt-4">
              <button
                onClick={(e) => login(e)}
                className="w-full px-4 py-2 tracking-wide text-white font-bold transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-4 text-white">
            Create a new account{" "}
            <span>
              <a
                className="text-yellow-300 hover:underline"
                onClick={createAccount}
                href="/"
              >
                Sign up
              </a>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 text-white">OR</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md bg-white focus:ring-2 dark:border-gray-400"
              onClick={() => loginOauth()}
            >
              <img
                src={google}
                alt=""
                className="w-5 h-5 fill-current text-white"
              />
              <p className="text-black">Sign in with Google</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

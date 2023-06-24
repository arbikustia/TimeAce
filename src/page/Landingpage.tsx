import { useNavigate } from "react-router-dom";
import HeroRight from "../components/HeroRight";
import HeroLeft from "../components/HeroLeft";
import logo from "../assets/logo.png";
import shape1 from "../assets/shape1.png";
import shape2 from "../assets/shape2.png";
import shape3 from "../assets/shape3.png";
import pomodoro from "../assets/pomodoro.png";
import eisenhower from "../assets/eisenhower.png";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Landingpage = () => {
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.user){
      navigate("/activity")
    }
  },[])

  return (
    <div className="bg-white">
      <div className="navbar bg-white fixed z-50 ">
        <div className="flex-1 gap-2 cursor-pointer">
          <img src={logo} alt="" className="w-5 ml-2" />
          <a className="font-extrabold text-xl text-blue-500 ">TimeAce</a>
        </div>
        <div className="flex-none flex flex-row gap-10">
          <button className=" text-black" onClick={() => navigate("/faq")}>FAQ</button>
          <button className=" text-black" onClick={() => navigate("/register")}>
            Sign-up
          </button>
          <button className="text-black mr-3" onClick={() => navigate("/login")}>
            Sign-in
          </button>
        </div>
      </div>

      <div className="w-full h-screen flex flex-col justify-center items-center">
        <img src={shape1} className="w-1/4 absolute left-0 top-16" alt="" />
        <h1 className="text-5xl font-extrabold text-blue-500 z-10 absolute top-20 ">TimeAce</h1>
        <p className="text-black text-center z-10 absolute top-32 font-bold ">
          Your <span className="text-blue-500 font-bold">Time</span> Navigator -
          Optimize, Organize, and Embrace Success!
        </p>
        <img src={shape3} className="px-5 md:w-1/3 mt-10 z-10 absolute bottom-0" alt="" />
        <img src={shape2} className=" md:w-1/5  absolute right-0 top-16" alt="" />
      </div>
      <HeroRight
        title="Eisenhower"
        text="The system intelligently ranks activities according to their importance and urgency, helping you make informed decisions about which tasks to tackle first."
        img={eisenhower}
      />

      <HeroLeft
        title="Pomodoro"
        text=" Keep track of your work sessions using 
        the Pomodoro feature, allowing you to 
        analyze your productivity patterns and 
        make improvements."
        img={pomodoro}
      />
      <HeroRight
        title="Todo List"
        text="Keep your tasks organized and easily 
        accessible with the to-do list feature, 
        ensuring nothing gets overlooked or forgotten."
        img={eisenhower}
      />

      {/* footer */}
      <footer className="footer footer-center p-10 text-base-content rounded bg-blue-500">
        <p className="text-2xl text-white font-semibold">
          Use your time properly with TimeAce
        </p>
        <div className="flex flex-row">
          <button className="btn bg-blue-800 text-white font-bold hover:bg-blue-600 border-none">
            Register
          </button>
          <button className="btn bg-blue-800 text-white font-bold hover:bg-blue-600 border-none">
            Login
          </button>
        </div>
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover text-white">arbikustia14@gmail.com</a>
        </div>

        <div>
          <p className="text-white">
            Copyright © 2023 - All right reserved by TimeAce
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;

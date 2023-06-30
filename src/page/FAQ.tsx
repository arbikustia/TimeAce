import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Accordion } from "../components/Accordion";

const FAQ = () => {
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.user) {
      navigate("/activity");
    }
  }, []);

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="navbar bg-white fixed z-50">
        <div className="flex-1 gap-2">
          <img
            src={logo}
            alt=""
            className="w-5 ml-2 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <a
            className="font-extrabold text-xl text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            TimeAce
          </a>
        </div>
        <div className="flex-none flex flex-row gap-10">
          <button className="text-black" onClick={() => navigate("/faq")}>
            FAQ
          </button>
          <button
            className="text-black"
            onClick={() => navigate("/register")}
          >
            Sign-up
          </button>
          <button
            className="text-black mr-3"
            onClick={() => navigate("/login")}
          >
            Sign-in
          </button>
        </div>
      </div>
      <div className="w-full min-h-screen py-16">
        <h1 className="mt-5 w-full text-center font-extrabold text-3xl text-blue-500">
          FAQ
        </h1>
        <div className="px-5 mt-10 flex flex-col gap-3">
          <Accordion
            title="What is the Eisenhower method in TimeAce Management?"
            text="The Eisenhower method is an approach that helps you prioritize tasks based on their urgency and importance. In TimeAce, the Eisenhower feature allows you to categorize tasks into four categories: Urgent & Important, Urgent but Not Important, Important but Not Urgent, and Not Important & Not Urgent."
          />
          <div className="collapse collapse-arrow bg-blue-500 text-white">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              To use the Pomodoro feature in TimeAce, follow these steps
            </div>
            <div className="collapse-content">
              <ul>
                <li>
                  1. Start the Pomodoro timer by clicking the "Start" button.
                </li>
                <li>
                  2. Focus on your work during the designated work session. Try
                  to avoid distractions and stay concentrated on the task at
                  hand.
                </li>
                <li>
                  3. Once the Pomodoro session ends, take a short break. This
                  break is usually around 5 minutes.
                </li>
                <li>
                  4. After the break, begin the next Pomodoro session by
                  clicking the "Next" button.
                </li>
                <li>
                  5. Repeat this cycle of work sessions and short breaks until
                  you have completed a predetermined number of Pomodoros or
                  achieved your desired productivity goal.
                </li>
                <li>
                  6. After completing a set of Pomodoros, you can take a longer
                  break, typically around 15 minutes, to recharge and relax
                  before starting another round.
                </li>
              </ul>
            </div>
          </div>
          <Accordion
            title="Is there a notification or alarm system in TimeAce to alert me when a Pomodoro session or break ends?"
            text="Yes, TimeAce includes a notification or alarm system to alert you when a Pomodoro session or break is complete. You can enable notifications within the settings or preferences of the TimeAce application."
          />
          <Accordion
            title="How does the Pomodoro feature in TimeAce Management help improve productivity?"
            text="The Pomodoro feature in TimeAce is a time management technique that involves focused work sessions for a specific period, followed by short breaks. By using the Pomodoro feature, you can set your work and break time to maximize your focus and productivity."
          />
          <Accordion
            title="What are the benefits of using the to-do list feature in TimeAce Management?"
            text="The to-do list feature in TimeAce allows you to jot down and organize your tasks. By creating a task list, you can easily track and manage what needs to be done. This feature helps you stay organized, remember tasks to be completed, and ensure nothing is overlooked."
          />
          <Accordion
            title="Does TimeAce support integration with calendars or other productivity tools?"
            text="Currently, TimeAce does not support integration with external calendars or other productivity tools. However, you can use TimeAce as a standalone tool to manage your time and tasks."
          />
          <Accordion
            title="How secure is my data and information when using TimeAce Management?"
            text="The security of user data and privacy is our top priority. TimeAce implements strong security measures to protect user information. All data is encrypted and stored securely on our servers. We will not access or share users' personal data with third parties without permission."
          />
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;

import { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import Countdown from "react-countdown";

const Pomodoro = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progres, setProgres] = useState(0);
  let time: number;

  const targetDate = new Date();
  if (progres % 2 != 0 && progres != 7) {
    targetDate.setMinutes(targetDate.getMinutes() + 5);
  } else if (progres == 7) {
    targetDate.setMinutes(targetDate.getMinutes() + 15);
  } else {
    targetDate.setMinutes(targetDate.getMinutes() + 25);
  }

  const handlePause = () => {
    setIsPlaying(false);
    setProgres(0);
    time = 0;
  };

  const renderer = ({
    minutes,
    seconds,
  }: {
    minutes: number;
    seconds: number;
  }) => {
    return (
      <div>
        <span>
          {progres % 2 == 0 ? "" : progres == 7 ? "" : "0"}
          {minutes}
        </span>
        :<span>{seconds}</span>
      </div>
    );
  };

  const handleNext = () => {
    setIsPlaying(true);
    if (progres % 2 === 0) {
      {
        progres == 7 ? (time = 900000) : (time = 1500000);
      }
      setTimeout(function () {
        {
          progres <= 8 ? setProgres((prevProgres) => prevProgres + 1) : "";
        }
        setIsPlaying(false);
      }, time);
    } else {
      time = 300000;
      setTimeout(function () {
        {
          progres <= 8 ? setProgres((prevProgres) => prevProgres + 1) : "";
        }
        setIsPlaying(false);
      }, time);
    }
  };

  return (
    <div className="w-full pt-44 text-white flex flex-col justify-center items-center gap-10">
      <ul className="steps steps-vertical lg:steps-horizontal absolute lg:static left-5 top-20">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
          <li
            key={step}
            className={`step ${progres >= step ? "step-primary" : ""}`}
          ></li>
        ))}
      </ul>
      <div className="w-full flex justify-center items-center flex-col h-full text-3xl ">
        {!isPlaying && (
          <div className="flex flex-col items-center gap-5">
            <p className="text-7xl">
              {progres % 2 != 0 && progres != 7
                ? "0" + 5
                : progres == 7
                ? 15
                : 25}
              :00
            </p>
            {progres <= 0 ? (
              <button className="btn text-2xl text-white" onClick={handleNext}>
                <BsFillPlayFill />
              </button>
            ) : progres >= 8 ? (
              <button className="text-white btn text-2xl" onClick={handlePause}>
                <BiReset />
              </button>
            ) : (
              <button className="btn" onClick={handleNext}>
                next
              </button>
            )}
          </div>
        )}
        {isPlaying && (
          <div className="flex justify-center items-center flex-col text-7xl gap-5 ">
            <Countdown date={targetDate} renderer={renderer} />
            <button className="text-white btn text-2xl" onClick={handlePause}>
              <BiReset />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;

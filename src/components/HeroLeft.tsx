import React, { FC } from "react";
import ScrollAnimation from "./ScrollAnimation";

type HeroLeftProps = {
  title: string;
  text: string;
  img: string;
};

const HeroLeft: FC<HeroLeftProps> = ({ title, text, img }) => {
  return (
    <div>
      <ScrollAnimation duration={1.5}>
        <div className="hero min-h-screen bg-white text-black">
          <div className="hero-content flex-col lg:flex-row gap-16 justify-around">
            <img src={img} className="lg:max-w-xs md:max-w-sm rounded-lg" alt="Hero Image" />
            <div>
              <h1 className="text-5xl text-end font-bold text-blue-500">{title}</h1>
              <p className="py-6 text-xl max-w-md text-right">{text}</p>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default HeroLeft;

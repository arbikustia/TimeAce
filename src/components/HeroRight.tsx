import { FC } from "react";
import ScrollAnimation from "./ScrollAnimation";

type HeroRightProps = {
  title: string;
  text: string;
  img: string;
};

const HeroRight: FC<HeroRightProps> = ({ title, text, img }) => {
  return (
    <div>
      <ScrollAnimation duration={1.5}>
        <div className="hero min-h-screen bg-white text-black">
          <div className="hero-content flex-col lg:flex-row-reverse gap-16 justify-around">
            <img src={img} className="lg:max-w-sm md:max-w-sm rounded-lg" alt="Hero Image" />
            <div>
              <h1 className="text-5xl font-bold text-blue-500">{title}</h1>
              <p className="py-6 text-xl max-w-md">{text}</p>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default HeroRight;

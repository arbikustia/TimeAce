import React, {FC} from "react";

type heroright = {
    title: string;
    text : string;
    img : string;
}


const HeroRight :FC <heroright> = ({title, text, img}) => {
  return (
    <div>
      <div className="hero  min-h-screen bg-base-200" >
        <div className="hero-content  flex-col lg:flex-row-reverse flex justify-around">
          <img
            src={img}
            className="lg:max-w-sm md:max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="py-6">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRight;

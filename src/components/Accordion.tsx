import {FC} from "react";

type accordion = {
    title : string,
    text : string
}

export const Accordion:FC<accordion> = ({title, text}) => {
  return (
    <div>
      <div className="collapse collapse-arrow bg-blue-500 text-white">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          {title}
        </div>
        <div className="collapse-content">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { activityType } from "../utils/type/ActyvityType";

type InputGroupProps = {
  onAddColumn: (data: activityType) => void;
};

const InputGroup: React.FC<InputGroupProps> = ({ onAddColumn }) => {
  const [nameActivity, setNameActivity] = useState("");
  const [condition1, setCondition1] = useState("importan");
  const [condition2, setCondition2] = useState("urgen");

  const handleAddActivity = () => {
    if (nameActivity !== "") {
      const data: activityType = {
        nameActivity,
        condition1,
        condition2,
      };
      onAddColumn(data);
      setNameActivity("");
      setCondition1("importan");
      setCondition2("urgen");
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-row flex-wrap gap-5 bg-white">
        <input
          type="text"
          value={nameActivity}
          onChange={(e) => setNameActivity(e.target.value)}
          className="input input-bordered w-full bg-gray-200 text-black"
          placeholder="Input"
          required
        />
        <select
          value={condition1}
          onChange={(e) => setCondition1(e.target.value)}
          className="select select-primary bg-white text-black border-2"
        >
          <option value="importan">importan</option>
          <option value="not importan">not importan</option>
          {/* Place your options here */}
        </select>
        <select
          value={condition2}
          onChange={(e) => setCondition2(e.target.value)}
          className="select select-primary bg-white text-black border-2"
        >
          <option value="urgen">urgen</option>
          <option value="not urgen">not urgen</option>
          {/* Place your options here */}
        </select>
        <button
          onClick={handleAddActivity}
          className="btn w-full bg-blue-500 hover:bg-blue-500 text-white rounded p-2"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default InputGroup;

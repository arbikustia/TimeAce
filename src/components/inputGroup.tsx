import { useState } from "react";
import { activityType } from "../utils/type/ActyvityType";

type InputGroupProps = {
  onAddColumn: (data: activityType) => void;
};

const InputGroup: React.FC<InputGroupProps> = ({ onAddColumn }) => {
  const [activityName, setActivityName] = useState("");
  const [condition1, setCondition1] = useState("");
  const [condition2, setCondition2] = useState("");

  const handleAddColumn = () => {
    const data: activityType = {
      activityName,
      condition1,
      condition2,
    };
    onAddColumn(data);
    setActivityName("");
    setCondition1("");
    setCondition2("");
  };

  return (
    <div className="flex  gap-4">
      <div className="flex flex-row flex-wrap gap-5">
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          className="input input-bordered w-full "
          placeholder="Input"
          required
        />
        <select
          value={condition1}
          onChange={(e) => setCondition1(e.target.value)}
          className="select select-primary "
        >
          <option value="importan">importan</option>
          <option value="not importan">not importan</option>
          {/* Place your options here */}
        </select>
        <select
          value={condition2}
          onChange={(e) => setCondition2(e.target.value)}
          className="select select-primary "
        >
          <option value="urgen">urgen</option>
          <option value="not urgen">not urger</option>
          {/* Place your options here */}
        </select>
      <button
        onClick={handleAddColumn}
        className="btn w-full bg-blue-500 text-white rounded p-2"
        >
        Add
      </button>
        </div>
    </div>
  );
};

export default InputGroup;

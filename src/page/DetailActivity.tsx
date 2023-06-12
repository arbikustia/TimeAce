import { useEffect, useState } from "react";
import { activityInterface } from "../utils/interface/ActivityInterface";
import { useParams } from "react-router-dom";
import { activityType } from "../utils/type/ActyvityType";
import InputGroup from "../components/inputGroup";


const DetailActivity = () => {
  const { index } = useParams();
  const desiredIndex: number = parseInt(index || "");
  const [columns, setColumns] = useState<activityType[]>(() => {
    const storedData: string | null = localStorage.getItem("activity");
    if (storedData) {
      const retrievedArray: activityInterface[] = JSON.parse(storedData);
      const initialColumns = retrievedArray[desiredIndex]?.activity || [];
      if (initialColumns.length > 0) {
        return initialColumns;
      }
    }
    return [];
  });

  
  useEffect(() => {
    const storedData: string | null = localStorage.getItem("activity");
    let retrievedArray: activityInterface[] = [];
    if (storedData) {
      retrievedArray = JSON.parse(storedData);
      retrievedArray[desiredIndex] = { ...retrievedArray[desiredIndex], activity: columns };
      localStorage.setItem("activity", JSON.stringify(retrievedArray));
    }
  }, [columns, desiredIndex]);

  const handleAddColumn = (data: activityType) => {
    let datas: activityType = {
      activityName: "",
      condition1: "",
      condition2: "",
    };
    datas = data;
    if (data.condition1 == "importan" && data.condition2 == "urgen") {
      datas = { ...datas, act: "do it now" };
    } else if (
      data.condition1 == "importan" &&
      data.condition2 == "not urgen"
    ) {
      datas = { ...datas, act: "Schedule a time to do it" };
    } else if (
      data.condition1 == "not importan" &&
      data.condition2 == "urgen"
    ) {
      datas = { ...datas, act: "delegate" };
    } else if (
      data.condition1 == "not importan" &&
      data.condition2 == "not urgen"
    ) {
      datas = { ...datas, act: "Delete it" };
    }
    setColumns([...columns, datas]);
  };



  return (
    <div className="pt-16 overflow-x-auto">
      <table className="table text-white table-zebra">
        <thead className="text-white ">
          <tr>
            <th></th>
            <th>Activity</th>
            <th>Condition</th>
            <th>act</th>
          </tr>
        </thead>
        <tbody>
          {columns?.map((item: activityType, index: number) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.activityName}</td>
                <td>
                  {item.condition1} - {item.condition2}
                </td>
                <td>{item.act}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      {/* modal */}
      <div className="modal ">
        <div className="modal-box flex flex-col gap-5 ">
          <div>
            {/* Render InputGroup component */}
            <InputGroup onAddColumn={handleAddColumn} />
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>

      <label
        htmlFor="my_modal_7"
        className="btn absolute right-5 bottom-5 border-none text-black hover:backdrop-blur-xl hover:bg-white/30 backdrop-blur-xl bg-white/30"
      >
        New Activity
      </label>
    </div>
  );
};

export default DetailActivity;

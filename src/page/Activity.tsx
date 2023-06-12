import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { activityInterface } from "../utils/interface/ActivityInterface";

const Activity = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");

  function getRoomName(roomname: string) {
    setRoomName(roomname);
  }

  // create variable to store or push datas from storage
  const activity: activityInterface[] = [];
  const activityDatas: activityInterface = {
    roomName: roomName,
  };

  function detailActivity(index: number): void {
    navigate(`/detailactivity/${index}`);
  }

  // get datas from storage
  const [dataActivities, setDataActivities] = useState<activityInterface[]>();
  const storedData: string | null = localStorage.getItem("activity");
  let retrievedArray: activityInterface[] = [];

  if (storedData) {
    retrievedArray = JSON.parse(storedData);
  }
  useEffect(() => {
    setDataActivities(retrievedArray);
  }, [retrievedArray, storedData]);

  // creat new room
  function createRoom() {
    if (retrievedArray && roomName) {
      // if there are datas in storage => push object into storage
      retrievedArray.push(activityDatas);
      localStorage.setItem("activity", JSON.stringify(retrievedArray));
      setDataActivities(retrievedArray);
    } else if (roomName) {
      // if there are not datas in storage => create new array to cover datas object
      activity.push(activityDatas);
      localStorage.setItem("activity", JSON.stringify(activity));
      setDataActivities(retrievedArray);
    }
    setRoomName("");
  }

  // delete room
  function deleteActivity(index: number) {
    dataActivities?.splice(index, 1);
    localStorage.setItem("activity", JSON.stringify(dataActivities));
    console.log(retrievedArray);
    setDataActivities(retrievedArray);
  }

  return (
    <div className="pt-16">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="text-white">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Detail</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {dataActivities?.map((item: activityInterface, index: number) => {
              return (
                <tr key={index} className="">
                  <th>{index + 1}</th>
                  <td>{item.roomName}</td>
                  <td>
                    <button
                      onClick={() => detailActivity(index)}
                      className="btn cursor-pointer text-purple-500 "
                    >
                      <TbListDetails />
                    </button>
                  </td>
                  <td
                    className="text-red-500 text-xl"
                    onClick={() => deleteActivity(index)}
                  >
                    <button className="btn cursor-pointer text-red-500">
                      <AiTwotoneDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box flex flex-col gap-5 ">
          <p className="text-center">New Activity</p>
          <form className="flex flex-row flex-wrap gap-3  ">
            <input
              className="input input-bordered input-md w-full text-white bg-base-300 "
              placeholder="name"
              type="text"
              value={roomName}
              onChange={(e) => getRoomName(e.target.value)}
            />
          </form>
          <label
            htmlFor="my_modal_7"
            onClick={() => createRoom()}
            className="btn"
          >
            create
          </label>
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

export default Activity;

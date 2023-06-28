import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { activityInterface } from "../utils/interface/ActivityInterface";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import nodata1 from "../assets/nodata1.png";

const Activity = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [cookies] = useCookies(["user"]);
  const token = cookies.user.token;
  const [dataRoom, setDataRoom] = useState([]);
  const baseUrl = "http://localhost:3000";

  // get all room
  const getRoom = async () => {
    try {
      const response = await axios.get(`${baseUrl}/activity`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataRoom(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  // post data room
  const createRoom = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/activity`,
        {
          roomName: roomName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getRoom();
      setRoomName("");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      await Toast.fire({
        icon: "success",
        title: "Success",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // delete room
  const deleteRoom = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`${baseUrl}/activity/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          getRoom();

          const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
          await Toast.fire({
            icon: "success",
            title: "Your file has been deleted.",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // push room name from input to roomName
  const getRoomName = (roomname: string) => {
    setRoomName(roomname);
  };

  // go to detail
  const detailActivity = (id: string) => {
    navigate(`/detailactivity/${id}`);
  };

  return (
    <>
      <Navbar />
      {dataRoom.length >= 1 ? (
        <>
          <div className="pt-16 bg-white min-h-screen">
            <div className="overflow-x-auto">
              <table className="table mt-5">
                {/* head */}
                <thead className="text-black text-lg">
                  <tr className="border-none">
                    <th></th>
                    <th>Name</th>
                    <th>Detail</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="text-black ">
                  {dataRoom?.map((item: activityInterface, index: number) => {
                    return (
                      <tr key={index} className="border-none">
                        <th>{index + 1}</th>
                        <td className="font-bold">{item.roomName}</td>
                        <td>
                          <button
                            onClick={() => detailActivity(item._id)}
                            className="btn bg-gray-200 hover:bg-gray-200 border-none cursor-pointer text-purple-500"
                          >
                            <TbListDetails />
                          </button>
                        </td>
                        <td
                          className="text-red-500 text-xl"
                          onClick={() => deleteRoom(item._id)}
                        >
                          <button className="btn bg-gray-200 hover:bg-gray-200 border-none cursor-pointer text-red-500">
                            <AiTwotoneDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="pt-20 w-screen h-screen bg-white text-black flex flex-col font-medium text-2xl items-center justify-center">
            <img className="w-44" src={nodata1} alt="" />
            <p>There are no activities yet</p>
            <p>Let's create your activity</p>
          </div>
        </>
      )}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col gap-5 bg-white">
          <p className="text-center text-black font-bold">NEW ROOM</p>
          <form className="flex flex-row flex-wrap gap-3 text-black">
            <input
              className="input input-bordered input-md w-full bg-gray-200 text-black font-semibold"
              placeholder="name"
              type="text"
              id="room"
              value={roomName}
              onChange={(e) => getRoomName(e.target.value)}
            />
          </form>
          <label
            htmlFor="my_modal_7"
            onClick={() => createRoom()}
            className="btn bg-blue-500 hover:bg-blue-500 text-white font-extrabold border-none"
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
        className="btn fixed right-5 bottom-5 border-none text-white bg-blue-500 hover:bg-blue-500 font-bold"
      >
        New Room
      </label>
    </>
  );
};

export default Activity;

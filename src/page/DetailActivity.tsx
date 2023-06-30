import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";

import { activityType } from "../utils/type/ActyvityType";
import InputGroup from "../components/InputGroup";
import Navbar from "../components/Navbar";

const DetailActivity = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["user"]);
  const token = cookies.user.token;
  const baseUrl = "https://timeace.fly.dev/activity";
  const [dataActivity, setDataActivity] = useState([]);

  useEffect(() => {
    getActivity();
  }, []);

  const getActivity = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getactivity/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataActivity(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddActivity = async (data: activityType) => {
    let act = "";
    if (data.condition1 === "importan" && data.condition2 === "urgen") {
      act = "do it now";
    } else if (
      data.condition1 === "importan" &&
      data.condition2 === "not urgen"
    ) {
      act = "Schedule a time to do it";
    } else if (
      data.condition1 === "not importan" &&
      data.condition2 === "urgen"
    ) {
      act = "delegate";
    } else if (
      data.condition1 === "not importan" &&
      data.condition2 === "not urgen"
    ) {
      act = "Delete it";
    }

    try {
      await axios.post(
        `${baseUrl}/addactivity/${id}`,
        {
          nameActivity: data.nameActivity,
          condition1: data.condition1,
          condition2: data.condition2,
          act: act,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getActivity();

      Swal.fire({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: "success",
        title: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteActivity = async (index: number) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `${baseUrl}/deleteactivity/${id}/${index}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        getActivity();

        Swal.fire({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          icon: "success",
          title: "Your file has been deleted.",
        });
      }
    } catch (error) {
      console.log(error, index);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 overflow-x-auto bg-white min-h-screen">
        <table className="table text-white">
          <thead className="text-white ">
            <tr className="border-none text-black text-lg font-bold">
              <th></th>
              <th>Activity</th>
              <th>Condition</th>
              <th>Act</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dataActivity?.map((item: activityType, index: number) => (
              <tr
                key={index}
                className={`text-black border-none font-semibold ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-white"
                }`}
              >
                <th>{index + 1}</th>
                <td>{item.nameActivity}</td>
                <td>
                  {item.condition1} - {item.condition2}
                </td>
                <td>{item.act}</td>
                <td
                  className="text-red-500 text-xl"
                  onClick={() => deleteActivity(index)}
                >
                  <button className="btn bg-gray-200 hover:bg-gray-200 border-none cursor-pointer text-red-500">
                    <AiTwotoneDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box flex flex-col gap-5 bg-white">
            <div>
              <InputGroup onAddColumn={handleAddActivity} />
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">
            Close
          </label>
        </div>

        <label
          htmlFor="my_modal_7"
          className="btn fixed right-5 bottom-5 border-none text-white font-bold bg-blue-500 hover:bg-blue-500"
        >
          New Activity
        </label>
      </div>
    </>
  );
};

export default DetailActivity;

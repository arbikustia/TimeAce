import { useEffect, useState } from "react";
import CardTodo from "../components/CardTodo";
import Navbar from "../components/Navbar";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiTag } from "react-icons/fi";
import axios from "axios";
import { useCookies } from "react-cookie";
import { todoListInterface } from "../utils/interface/TodoListInterface";
import { BsCheck } from "react-icons/bs";
import nodata1 from "../assets/nodata1.png";

const TodoList = () => {
  const [dataTodo, setDataTodo] = useState([]);
  const [bgColor, setBgColor] = useState("blue");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const baseUrl = "https://timeace.fly.dev";
  const [cookies] = useCookies(["user"]);
  const token = cookies.user.token;

  // get data
  const getTodo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/todolist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const createTodo = async () => {
    try {
      await axios.post(
        `${baseUrl}/todolist`,
        {
          title: title,
          text: text,
          label: label,
          bgColor: bgColor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getTodo();
      setLabel("");
      setTitle("");
      setText("");
      setBgColor("");
    } catch (error) {
      console.log(error);
    }
  };

  // delete todo
  const deleteTodo = async (id:string | undefined) => {
    try {
      await axios.delete(`${baseUrl}/todolist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Success: Deleted data");
      getTodo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {dataTodo.length >= 1 ? (
        <>
          <div className="pt-20 lg:px-10 px-6 bg-white min-h-screen text-black flex flex-row flex-wrap justify-between lg:justify-start gap-2 lg:gap-10">
            {dataTodo?.map((item:todoListInterface, index:number) => (
              <div key={index}>
                <CardTodo
                  title={item.title}
                  text={item.text}
                  bgColor={item.bgColor}
                  label={item.label}
                  createdAt={item.createdAt}
                  DeleteTodo={() => deleteTodo(item._id)}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="pt-20 w-screen h-screen bg-white text-black flex flex-col font- text-1xl items-center justify-center ">
          <img className="w-44" src={nodata1} alt="" />
          <a>There are no activities yet</a>
          <a>Let's create your activity</a>
        </div>
      )}

      {/* create new todo list */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white flex flex-col gap-2">
          <div>
            <ul className="flex flex-row gap-5 ">
              <li
                onClick={() => setBgColor("red")}
                className={`bg-red-200 w-5 h-5 cursor-pointer ${
                  bgColor === "red" ? "bg-red-500" : ""
                }`}
              ></li>
              <li
                onClick={() => setBgColor("blue")}
                className={`bg-blue-200 w-5 h-5 cursor-pointer ${
                  bgColor === "blue" ? "bg-blue-500" : ""
                }`}
              ></li>
              <li
                onClick={() => setBgColor("yellow")}
                className={`bg-yellow-200 w-5 h-5 cursor-pointer ${
                  bgColor === "yellow" ? "bg-yellow-500" : ""
                }`}
              ></li>
              <li
                onClick={() => setBgColor("green")}
                className={`bg-green-200 w-5 h-5 cursor-pointer ${
                  bgColor === "green" ? "bg-green-500" : ""
                }`}
              ></li>
            </ul>
          </div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            className="bg-gray-200 rounded-md px-3 outline-none text-black py-2"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name=""
            value={text}
            maxLength={60}
            placeholder="Your activity"
            className="bg-gray-200 rounded-md px-3 outline-none text-black"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="grid grid-cols-2">
            <div>
              <ul className="flex flex-col gap-2">
                <li
                  className={`flex flex-row items-center gap-3 text-black bg-gray-200 w-44 rounded-md px-2 py-2 cursor-pointer ${
                    label === "Study" ? "bg-blue-500" : ""
                  }`}
                  onClick={() => setLabel("Study")}
                >
                  <FiTag />
                  Study
                  {label === "Study" ? <BsCheck /> : ""}
                </li>
                <li className="flex flex-row items-center gap-3 text-black px-2 py-2 bg-gray-200 w-44 rounded-md">
                  <FiTag />
                  <input
                    type="text"
                    value={label !== "Study" ? label : ""}
                    className="bg-transparent border-b-2 w-20 outline-none border-b-gray-500"
                    onChange={(e) => setLabel(e.target.value)}
                  />
                  {label !== "Study" ? <BsCheck /> : ""}
                </li>
              </ul>
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              onClick={createTodo}
              className="btn bg-blue-500 text-white border-none hover:bg-blue-500"
            >
              Create
            </label>
            <label
              htmlFor="my_modal_6"
              className="btn bg-red-500 text-white border-none hover:bg-red-500"
            >
              Close!
            </label>
          </div>
        </div>
      </div>
      <label
        htmlFor="my_modal_6"
        className="fixed bottom-10 right-10 text-5xl text-blue-500 cursor-pointer"
      >
        <AiFillPlusCircle />
      </label>
    </>
  );
};

export default TodoList;

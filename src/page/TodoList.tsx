import { useState } from "react";
import CardTodo from "../components/CardTodo";
import Navbar from "../components/Navbar";
import { AiFillCalendar, AiFillPlusCircle } from "react-icons/ai";
import { FiTag } from "react-icons/fi";

const TodoList = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20 lg:px-10 px-6 bg-white min-h-screen text-black flex flex-row flex-wrap justify-between lg:justify-start gap-4 lg:gap-10">
        <CardTodo />
        <CardTodo />
        <CardTodo />
        <CardTodo />
        <CardTodo />
        <CardTodo />
        <CardTodo />
        <CardTodo />
        <CardTodo />
      </div>
      <label
        htmlFor="my_modal_6"
        className="fixed bottom-10 right-10 text-5xl text-blue-500 cursor-pointer"
      >
        <AiFillPlusCircle />
      </label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white flex flex-col gap-2">
          <div>
            <ul className="flex flex-row gap-5 ">
              <li className="bg-red-200 w-5 h-5 cursor-pointer"></li>
              <li className="bg-blue-200 w-5 h-5 cursor-pointer"></li>
              <li className="bg-yellow-200 w-5 h-5 cursor-pointer"></li>
              <li className="bg-green-200 w-5 h-5 cursor-pointer"></li>
            </ul>
          </div>
          <input
            type="text"
            placeholder="title"
            className="bg-gray-200 rounded-md px-3"
          />
          <textarea
            name=""
            placeholder="your activity"
            className="bg-gray-200 rounded-md px-3"
          ></textarea>
          <div className="grid grid-cols-2">
            <div>
              <ul>
                <li className="flex flex-row items-center gap-3 text-black">
                  <FiTag />
                  Study
                </li>
                <li className="flex flex-row items-center gap-3 text-black">
                  <FiTag />
                  <input
                    type="text"
                    className="bg-white border-b-2 w-20 outline-none"
                  />
                </li>
              </ul>
            </div>
            <div>
              <input
                type="date"
                className="rounded px-2 bg-blue-400 text-black outline-none"
              />
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;

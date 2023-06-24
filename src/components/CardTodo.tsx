import React from "react";
import { FiTag } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

const CardTodo = () => {
  return (
    <>
      <div className="w-40 h-48 px-2 py-2 bg-red-200 rounded-md">
        <div className="flex flex-row justify-between">
          <p>3 days left</p>
          <p className="cursor-pointer w-2 text-center">
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
              <BsThreeDotsVertical/>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow flex gap-2 bg-white rounded-box w-32"
              >
                <li className="bg-red-200 rounded-lg">
                  <a>Item 1</a>
                </li>
                <li className="bg-red-200 rounded-lg">
                  <a>Item 2</a>
                </li>
              </ul>
            </div>{" "}
          </p>
        </div>

        <hr className="border-black my-3" />
        <h2 className="font-bold">title</h2>
        <p>Lorem ipsum dolor sit amet consectetur,</p>
        <div className="flex flex-row gap-2 justify-end items-center mt-3">
          <p>
            <FiTag />
          </p>
          <p>study</p>
        </div>
      </div>
    </>
  );
};

export default CardTodo;

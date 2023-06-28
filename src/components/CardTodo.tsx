import {  FC, } from "react";
import { FiTag } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { todoListInterface } from "../utils/interface/TodoListInterface";

const CardTodo: FC<todoListInterface> = ({
  title,
  text,
  label,
  bgColor,
  createdAt,
  DeleteTodo,
}) => {
  return (
    <>
      <div
        className={`w-40 h-48 px-2 relative py-2 rounded-md bg-${bgColor}-200`}
      >
        <div className="flex flex-row justify-between">
          <p>{createdAt}</p>
          <p className="cursor-pointer w-2 text-center">
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <BsThreeDotsVertical />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow flex gap-2 bg-white rounded-box w-32"
              >
                <li className={`bg-${bgColor}-200 rounded-lg`}>
                  <a onClick={DeleteTodo}>Delete</a>
                </li>
              </ul>
            </div>{" "}
          </p>
        </div>
        <hr className="border-black my-3" />
        <h2 className="font-semibold text-md break-words">{title}</h2>
        <p className="text-sm break-words">{text}</p>
        <div className="flex absolute right-2 bottom-2 flex-row gap-2 justify-end items-center mt-3">
          <p>
            {label ? <FiTag /> : "  " }
            
          </p>
          <p>{label}</p>
        </div>
      </div>
    </>
  );
};

export default CardTodo;

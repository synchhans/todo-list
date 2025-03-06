import React from "react";
import { FaPencil } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { GoIssueClosed } from "react-icons/go";
import { TaskItemProps } from "../types/taskItem.types";


const TaskItem: React.FC<TaskItemProps> = ({
  title,
  createdAt,
  onToggleComplete,
  onDelete,
  isCompleted,
  onEdit
}) => {
  return (
    <div className="flex justify-between items-center bg-[#D0D0D0] pt-3 pb-2 px-4  rounded-lg my-2">
      <div>
        <div className="flex gap-1 items-center">
          <span className={`${isCompleted ? "line-through" : ""}`}>
            {title}
          </span>
          <button onClick={onEdit} className="cursor-pointer">
            <FaPencil className="w-3 h-3" />
          </button>
        </div>
        <small className="block mt-2 text-xs">{createdAt}</small>
      </div>
      <div className="flex space-x-1">
        <button onClick={onDelete} className="cursor-pointer">
          <IoCloseCircleOutline className="w-6 h-6" />
        </button>
        <button onClick={onToggleComplete} className="cursor-pointer">
          {isCompleted ? (
            <GoIssueClosed className="w-5 h-5" />
          ) : (
            <FaRegCircle className="w-5 h-5 bg-white rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

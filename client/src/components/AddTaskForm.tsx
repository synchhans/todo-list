import React, { useState, useEffect, useRef } from "react";
import { AddTaskFormProps } from "../types/addTaskForm.types";

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onSubmit,
  onCancel,
  initialTitle,
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTitle(initialTitle || "");
  }, [initialTitle]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [initialTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== "") {
      onSubmit(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="title" className="text-left text-sm block">
        Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        ref={inputRef}
        className="border-[0.5px] border-black rounded-md p-2 mb-4 min-w-full h-10 max-w-sm"
      />

      <div className="flex justify-center space-x-2">
        <button
          type="submit"
          className={`${
            initialTitle ? "bg-[#FFB46F]" : "bg-[#6FCBFF]"
          } text-[#0F0F0F] text-sm rounded-md flex items-center justify-center w-24 h-8 cursor-pointer`}
        >
          {initialTitle ? "Update Task" : "Add Task"}
        </button>

        {initialTitle && (
          <button
            onClick={onCancel}
            className="bg-[#FF6F6F] text-sm rounded-md flex items-center justify-center w-24 h-8 cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddTaskForm;

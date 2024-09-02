/* eslint-disable react/function-component-definition */
import React, { memo, useState } from "react";

interface TodoFormProps {
  onAddTask: (task: string) => void;
}
const TodoForm: React.FC<TodoFormProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTask.trim() === "") return;
    onAddTask(newTask);
    setNewTask("");
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask}
        name="todo"
        onChange={handleInputChange}
        id="todo"
        className="todo-input"
        placeholder="Add todo item"
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
};

export default memo(TodoForm);

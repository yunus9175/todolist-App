/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

interface TodoItemProps {
  task: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onSave: (id: number, newText: string) => void;
  isEditing: boolean;
  editingText: string;
}
// eslint-disable-next-line react/function-component-definition
const TodoItem: React.FC<TodoItemProps> = ({
  onSave,
  task,
  onToggle,
  onRemove,
  onEdit,
  isEditing,
  editingText,
}) => {
  const [currentText, setCurrentText] = useState<string>(task?.text);

  useEffect(() => {
    if (isEditing) {
      setCurrentText(editingText);
    }
  }, [isEditing, editingText]);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Update task with currentText
    onSave(task?.id, currentText);
  };
  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <form onSubmit={handleSave} className="edit-form">
          <input
            type="text"
            name="item"
            id="item"
            className="todo-input"
            value={currentText}
            onChange={handleTextChange}
          />
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      ) : (
        // eslint-disable-next-line @typescript-eslint/indent
        <>
          <span onClick={() => onToggle(task.id)}>{task.text}</span>
          <FiEdit
            className="icon edit-icon"
            onClick={() => !task.completed && onEdit(task.id, task.text)}
            title="Edit Task"
          />
          <FiTrash
            className="icon delete-icon"
            onClick={() => !task.completed && onRemove(task.id)}
            title="Delete Task"
          />
        </>
      )}
    </li>
  );
};

export default memo(TodoItem);

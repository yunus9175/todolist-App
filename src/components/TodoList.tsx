/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/function-component-definition */
import React, { useCallback, useState } from "react";
import TodoForm from "./TodoForm";
import "./TodoList.css";
import TodoItem from "./TodoItem";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTask] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const addTask = useCallback(
    (text: string) => {
      setTask([
        {
          id: Date.now(),
          text,
          completed: false,
        },
        ...tasks,
      ]);
    },
    // eslint-disable-next-line @typescript-eslint/comma-dangle
    [tasks]
  );

  const onSave = useCallback(
    (id: number, newText: string) => {
      setTask(
        tasks.map(
          (task) =>
            // eslint-disable-next-line @typescript-eslint/comma-dangle, implicit-arrow-linebreak
            task.id === id ? { ...task, text: newText } : task
          // eslint-disable-next-line function-paren-newline
        )
      );
      setEditingTaskId(null);
    },
    [tasks]
  );
  const toggleTask = useCallback(
    (id: number) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      setTask(
        tasks.map(
          (task) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            task.id === id ? { ...task, completed: !task.completed } : task
          // eslint-disable-next-line function-paren-newline, @typescript-eslint/comma-dangle
        )
      ),
    // eslint-disable-next-line @typescript-eslint/comma-dangle
    [tasks]
  );

  const removeTask = useCallback(
    (id: number) => setTask(tasks.filter((task) => task.id !== id)),
    // eslint-disable-next-line @typescript-eslint/comma-dangle
    [tasks]
  );
  const startEditing = useCallback((id: number, text: string) => {
    setEditingTaskId(id);
    setEditingText(text);
  }, []);
  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <TodoForm onAddTask={addTask} />
      <ul style={{ padding: 0 }}>
        {tasks?.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onSave={onSave}
            onToggle={toggleTask}
            onRemove={removeTask}
            onEdit={startEditing}
            isEditing={editingTaskId === task.id}
            editingText={editingText}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

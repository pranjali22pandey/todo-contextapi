import React, { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  const addTodo = () => {
    if (!todo || todo.length < 4) {
      showToast("Todo cannot be empty or less than 3 characters", "warning");
      return;
    }

    setTodoList((prevList) => [
      ...prevList,
      { id: Date.now(), todo, isCompleted: false, isEditing: false },
    ]);
    setTodo("");
  };

  const removeTodo = (id) => {
    setTodoList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodoList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const toggleEditing = (id) => {
    setTodoList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const updateTodo = (id, updatedTodo) => {
    setTodoList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, todo: updatedTodo, isEditing: false } : item
      )
    );
  };

  const showToast = (message, status) => {
    console.log(`${status.toUpperCase()}: ${message}`);
  };

  const value = {
    todoList,
    todo,
    setTodo,
    addTodo,
    removeTodo,
    toggleCompletion,
    toggleEditing,
    updateTodo,
  };

  return (
    <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;

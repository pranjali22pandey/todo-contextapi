import React from "react";
import { useTodo } from "./TodoContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const {
    todoList,
    todo,
    setTodo,
    addTodo,
    removeTodo,
    toggleCompletion,
    toggleEditing,
    updateTodo,
  } = useTodo();
  
  const [editedTodo, setEditedTodo] = React.useState("");

  const handleAddTodo = () => {
    if (!todo || todo.length < 4) {
      toast.warning("Todo cannot be empty or less than 3 characters", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    addTodo();

    setTodo("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleEditInputChange = (event) => {
    setEditedTodo(event.target.value);
  };

  const handleUpdateTodo = (itemId) => {
    if (!editedTodo || editedTodo.length < 4) {
      toast.warning("Todo cannot be empty or less than 3 characters", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    updateTodo(itemId, editedTodo);
    setEditedTodo("");
  };

  return (
    <div className="container my-5">
      <h1>Add Todo's</h1>
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <br />
      {todoList.length !== 0 ? (
        <div className="card my-2 border-dark bg-light">
          <div className="card-body">
            {todoList.map((item) => (
              <div key={item.id} className="d-flex justify-content-between align-items-center">
                {item.isEditing ? (
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      value={editedTodo}
                      onChange={handleEditInputChange}
                    />
                    <div>
                      <button className="btn btn-danger btn-sm mx-1" onClick={() => toggleEditing(item.id)}>
                        Cancel
                      </button>
                      <button className="btn btn-success btn-sm" onClick={() => handleUpdateTodo(item.id)}>
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span
                      className={`mr-2 ${
                        item.isCompleted ? "text-decoration-line-through" : ""
                      }`}
                    >
                      {item.todo}
                    </span>
                    <div>
                      <button
                        className={`btn ${
                          item.isCompleted ? "btn-warning" : "btn-success"
                        } btn-sm mx-1`}
                        onClick={() => toggleCompletion(item.id)}
                      >
                        {item.isCompleted ? "Undo" : "Complete"}
                      </button>
                      <button className="btn btn-primary btn-sm mx-1" onClick={() => toggleEditing(item.id)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => removeTodo(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No tasks found.</p>
      )}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;

